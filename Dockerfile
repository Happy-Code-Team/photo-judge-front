# Dockerfile

# --- 阶段 1: 构建 Vue 应用 ---
# 使用 Node.js 镜像来构建你的 Vue 项目
FROM node:18.20.0-slim AS builder

WORKDIR /app

# 拷贝 package.json 和 package-lock.json (或 yarn.lock) 以利用 Docker 缓存
COPY package.json ./
# 如果你使用 yarn，拷贝 yarn.lock
# COPY yarn.lock ./

# 安装依赖
RUN npm install
# 或者 RUN yarn install

# 拷贝项目所有文件
COPY . .

# 构建 Vue 应用
# 根据你的项目具体构建命令调整，Vite 项目通常是 npm run build
RUN npm run build

# --- 阶段 2: 构建 Nginx 服务器镜像 ---
# 使用轻量级的 Nginx 镜像来部署静态文件
FROM nginx:alpine

# 拷贝第一阶段构建好的静态文件到 Nginx 默认的 HTML 目录
# Vite 默认的构建输出目录是 dist
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 监听的端口
EXPOSE 80

# 启动 Nginx (Nginx 镜像默认会启动 Nginx)
CMD ["nginx", "-g", "daemon off;"]