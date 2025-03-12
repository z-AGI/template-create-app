import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

/**
 * 中间件配置
 */
export class MiddlewareConfig {
  static configureMiddlewares(app: express.Application) {
    // 配置 body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // 配置 CORS
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
  }
}