#!/bin/bash
# 💡 깃랩 서버의 사설 IP (혹은 도메인)를 적어줍니다.
REGISTRY_URL="10.0.138.53:5050"
IMAGE_NAME="${REGISTRY_URL}/root/devops-board/backend:latest"
CONTAINER_NAME="board-backend"

echo "====================================="
echo "🚀 배포 시작: $(date)"
echo "====================================="

# 1. 깃랩 컨테이너 레지스트리 로그인 (러너가 쓰던 자격증명 정보나 배포 토큰 등을 활용하여 로그인 권한 확보가 미리 필요할 수 있습니다)
# (이미 EC2 내부 도커가 로그인된 상태라면 이 단계는 생략해도 무방합니다)

# 2. 최신 이미지 가져오기
echo "📥 최신 도커 이미지 Pull 받는 중..."
docker pull $IMAGE_NAME

# 3. 기존에 실행 중이던 컨테이너가 있다면 안전하게 중지 및 삭제
if [ $(docker ps -a -q -f name=$CONTAINER_NAME) ]; then
  echo "🧹 기존 컨테이너 ($CONTAINER_NAME) 중지 및 삭제 중..."
  docker stop $CONTAINER_NAME
  docker rm -f $CONTAINER_NAME
fi

# 4. 새 컨테이너 실행
echo "🟢 새 백엔드 컨테이너 실행 중..."
docker run -d \
  --name $CONTAINER_NAME \
  --network board-network \
  --restart always \
  -e DB_HOST=board-db \
  -e DB_PORT=3306 \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=password \
  -e DB_DATABASE=board \
  -p 3000:3000 \
  $IMAGE_NAME

# 5. 미사용 구형 이미지 찌꺼기 청소
echo "🧹 구형 도커 이미지 찌꺼기 청소..."
docker image prune -f

echo "====================================="
echo "🎉 배포 성공 완료!"
echo "====================================="