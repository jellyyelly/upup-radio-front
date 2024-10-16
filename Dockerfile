# Step 1: Node.js를 사용하여 svelte 앱을 빌드
FROM node:20-alpine3.19 AS build

# 앱 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# npm 의존성 설치
RUN npm install

# 소스 파일 복사
COPY . .

# svelte 앱 빌드
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]
