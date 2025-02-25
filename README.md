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
