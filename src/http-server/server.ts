import express from 'express';
import { MiddlewareConfig } from './config';
import { ApiRoutes } from './router';
import { RouteAnnotation } from './annotation';
import { Routes } from '../routes';

export class Server {
  private app: express.Application;
  private port: number;
  private routes: RouteAnnotation[];

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;
    this.routes = Routes || [];
    this.initialize();
  }

  // 初始化服务器
  private initialize() {
    // 配置中间件
    MiddlewareConfig.configureMiddlewares(this.app);

    // 路由信息
    this.registerRoutesInfo();
    // 注册路由
    this.registerRoutes();

    // 错误处理中间件
    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error('全局错误:', err);
        res.status(500).json({
          error: '服务器内部错误',
          details:
            process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
      }
    );
  }

  // 注册路由信息
  private registerRoutesInfo() {
    const router = express.Router();
    router['get']('/info', async (req, res, next) => {
      try {
        await ApiRoutes.getApiInfo(req, res);
      } catch (error) {
        next(error);
      }
    });
    this.app.use('/', router);
  }

  // 注册路由
  private registerRoutes() {
    this.routes.forEach((route: RouteAnnotation) => {
      const router = express.Router();
      router[route.method](route.path, async (req, res, next) => {
        try {
          await ApiRoutes.handleChatRequest(req, res);
        } catch (error) {
          next(error);
        }
      });
      this.app.use('/', router);
    });
  }

  // 启动服务器
  public start() {
    this.app.listen(this.port, () => {
      console.log(`服务器启动成功: http://localhost:${this.port}`);
    });
  }
}
