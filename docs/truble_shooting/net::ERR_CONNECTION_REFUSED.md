# 🛠️ [Troubleshooting] net::ERR_CONNECTION_REFUSED 에러 해결

## 🚨 1. 장애 증상 (Issue Description)
* **상황:** 깃랩 러너로 웹서버를 배포하고 브라우저로 웹서버 접속 시 net::ERR_CONNECTION_REFUSED 에러 발생
* **현상/에러 메시지:** 
  
  `index-DBUiudn7.js:11  GET http://localhost:3000/board net::ERR_CONNECTION_REFUSED ...`
  
---

## 🔍 2. 원인 분석 및 가설 (Root Cause Analysis)

* ### 백엔드 cors origin 주소 미변경
  로컬에서 테스트하고나서 실제로 배포할 때 8080포트로 개방하였지만, 로컬환경에서 하던 5173포트 그대로 배포를 함

---

## 🛠️ 해결 과정 (Resolution Steps)
  1. 백엔드 메인 파일에 cors 설정에 8080포트를 허용하도록 수정 -> `ERR_CONNECTION_REFUSED` 재 발생
  2. cors를 localhost가 아닌 실제 주소를 사용하도록 수정 (gitlab-ci.yml 파일에 환경변수 주입) -> `ERR_CONNECTION_REFUSED` 재 발생
  3. 깃랩 설정 파일에 환경변수 주입하도록 리팩토링 하면서 .env 파일의 내용을 지우고 주입을 진행했는데, 그때 디비 환경변수명을 잘못 써서, 웹서버가 DB를 계속 연결하느라 서버가 작동하지 않았음(휴먼에러) -> 수정 후 재시도 -> `CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.` 에러 발생 
  4. 백엔드 코드에서 cors를 실제 주소를 넣어두긴 했지만, 정작 gitlab-ci.yml 파일에 프론트엔드 환경변수를 주입할때, 수정하지 않아 해당 현상이 발생 -> gitlab-ci.yml 파일 수정
---

## ✅ 3. 검증 및 결과 (Verification)
```
Mac에서 웹사이트 접속
http://gitlab.sehjang.kro.kr:8080 -> 접속 성공 !!
```

---

## 💡 4. 오늘의 교훈 (Retrospective)
* CORS는 브라우저의 방어벽이다. 터미널(curl)은 보안 검사가 없어서 데이터가 잘 나오지만, 브라우저(크롬)는 사용자를 보호하기 위해 주소가 다르면 패킷을 자동으로 차단을 한다.

* 사소한 휴먼에러가 전체 인프라를 오작동 시킬 수 있다는 것을 그리고 그것을 해결하는데에는 엄청난 시간이 소요된다는 것을 깨달았다.