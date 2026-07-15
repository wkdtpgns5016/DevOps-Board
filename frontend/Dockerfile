FROM nginx:alpine

# Nginx의 기본 설정 파일을 지우고, 방금 만든 커스텀 설정을 복사해 넣습니다.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 React 결과물을 넣어줍니다.
COPY ./dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]