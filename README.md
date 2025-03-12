# 小测生成/判分 AI 智能体

> [技术设计方案]()

## 🌈 功能介绍

- 生成知识问题
- 生成判分标准
- AI 自动判分

### 打包镜像

```bash
docker build -t quiz:latest .
```

### 运行容器

```bash
docker run --restart=always -itd -v `pwd`/config.yaml:/app/config.yaml -v`pwd`/package.json:/app/package.json -v `pwd`/src/:/app/src/ -v `pwd`/test/:/app/test/ -v `pwd`/logs/:/app/logs/ --network ai-agent --hostname quiz quiz:latest
```

### 下架

```bash
docker ps | grep 'quiz' | awk '{print $1}' | xargs docker rm -f
```

### 删除镜像

```bash
docker images | grep 'quiz' | awk '{print $3}' | xargs docker rmi -f
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
