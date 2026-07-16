#!/bin/bash
REGISTRY_URL="10.0.138.53:5050"
IMAGE_NAME="${REGISTRY_URL}/root/devops-board/backend:latest"
BACKEND_CONTAINER="board-backend"
DB_CONTAINER="board-db"

# 💡 [보안 최적화] EC2 로컬의 격리된 공간에 존재하는 .env 파일을 로드합니다.
ENV_FILE="/home/ec2-user/secure-env/.env"

if [ -f "$ENV_FILE" ]; then
  export $(cat "$ENV_FILE" | grep -v '^#' | xargs)
else
  echo "❌ 로컬 안전 경로에 .env 파일이 존재하지 않습니다! 배포를 중단합니다."
  exit 1
fi

echo "====================================="
echo "🚀 배포 시작: $(date)"
echo "====================================="

# 1. 도커 네트워크가 없을 경우 자동 생성
if [ ! $(docker network ls | grep board-network) ]; then
  echo "🌐 board-network 도커 네트워크 생성 중..."
  docker network create board-network
fi

# 2. 데이터베이스 DB 컨테이너 기동
if [ ! $(docker ps -q -f name=$DB_CONTAINER) ]; then
  echo "🗄️ MySQL DB 컨테이너 ($DB_CONTAINER) 상태 확인 중..."
  
  if [ $(docker ps -a -q -f name=$DB_CONTAINER) ]; then
    echo "🧹 기존 정지된 DB 컨테이너 삭제..."
    docker rm -f $DB_CONTAINER
  fi

  echo "🟢 MySQL DB 컨테이너 실행 시작..."
  docker run -d \
    --name $DB_CONTAINER \
    --network board-network \
    --restart always \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE=$DB_DATABASE \
    -p 3306:3306 \
    -v /home/ec2-user/mysql-data:/var/lib/mysql \
    mysql:8.0

  echo "⏳ DB 엔진 초기 구동 대기 중 (15초)..."
  sleep 15
fi

# 3. 로컬 .env에서 읽어온 정보로 안전하게 깃랩 로그인
echo "🔑 깃랩 레지스트리 자동 로그인 중..."
if [ ! -z "$GITLAB_USER" ] && [ ! -z "$GITLAB_PASS" ]; then
  echo "$GITLAB_PASS" | docker login -u "$GITLAB_USER" --password-stdin "$REGISTRY_URL"
else
  echo "⚠️ 로컬 .env 파일에 로그인 자격 증명이 누락되었습니다."
fi

# 4. 최신 백엔드 이미지 가져오기
echo "📥 최신 도커 이미지 Pull 받는 중..."
docker pull $IMAGE_NAME

# 5. 기존 백엔드 컨테이너 중지 및 삭제
if [ $(docker ps -a -q -f name=$BACKEND_CONTAINER) ]; then
  echo "🧹 기존 백엔드 컨테이너 ($BACKEND_CONTAINER) 중지 및 삭제 중..."
  docker stop $BACKEND_CONTAINER
  docker rm -f $BACKEND_CONTAINER
fi

# 6. 새 백엔드 컨테이너 실행 (로컬 격리 구역의 env-file을 다이렉트로 지정)
echo "🟢 새 백엔드 컨테이너 실행 중..."
docker run -d \
  --name $BACKEND_CONTAINER \
  --network board-network \
  --restart always \
  --env-file "$ENV_FILE" \
  -p 3000:3000 \
  $IMAGE_NAME

# 7. 미사용 구형 이미지 찌꺼기 청소
echo "🧹 구형 도커 이미지 찌꺼기 청소..."
docker image prune -f

echo "====================================="
echo "🎉 배포 성공 완료!"
echo "====================================="