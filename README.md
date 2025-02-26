# 【标题】

> 【技术方案设计链接】

## 🌈 功能介绍

【请完善功能介绍】

### 创建 docker 网络

```bash
docker network create --driver bridge ai
```

### 打包镜像

```bash
docker build -t [name]:latest .
```

### 运行容器

```bash
docker run -itd -v `pwd`/config.yaml:/app/config.yaml --network ai --hostname [name] [name]:latest
```

### 下架

```bash
docker ps | grep '[name]' | awk '{print $1}' | xargs docker rm -f
```

### 删除镜像

```bash
docker images | grep '[name]' | awk '{print $3}' | xargs docker rmi -f
```

## ‼️ 开发说明

### ✨ 安装依赖

#### 使用 npm

```bash
npm install
```

#### 使用 yarn

```bash
yarn
```

### 🍖 本地测试

#### 使用 npm

```bash
npm run dev
```

#### 使用 yarn

```bash
yarn dev
```

### 👑 启动服务

#### 使用 npm

```bash
npm run start
```

#### 使用 yarn

```bash
yarn start
```

### 🤡 测试接口

#### 使用 npm

```bash
npm run test
```

#### 使用 yarn

```bash
yarn test
```

## ‼️ 使用说明

### 📝 编译

#### 使用 npm

```bash
npm run build
```

#### 使用 yarn

```bash
yarn build
```

### 🗂️ 打包

#### 使用 npm

```bash
npm run package
```

#### 使用 yarn

```bash
yarn package
```

## FQA

### 解决 Docker 被墙问题

#### 当前问题

```bash
docker pull node:18-alpine
Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

#### 解决方式

1. 编辑`daemon.json`文件

```bash
vim /etc/docker/daemon.json
```

2. 写入并保存如下内容

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://pee6w651.mirror.aliyuncs.com"
  ],
  "insecure-registries":[
    "10.0.0.12:5000"
  ]
}
```

3. 重载配置并重启`docker`

```bash
systemctl daemon-reload
systemctl restart docker
```

4. 配置`docker`自启动

```bash
systemctl enable docker
```
