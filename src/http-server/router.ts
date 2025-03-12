import express from 'express';
import { Routes } from '../routes';
import { Output } from '../utils/output';
import { conf } from '../utils/conf';
import fs from 'fs/promises';
import { join } from 'path';

// 路由器
export class ApiRoutes {
  // 获取 API 信息
  static async getApiInfo(req: express.Request, res: express.Response) {
    try {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      const app = await conf.get('app');
      res.status(200).json({
        ...app,
        api: Routes,
      });
    } catch (error: any) {
      res.status(500).json({
        error: '服务器内部错误',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  // 处理请求
  static async handleChatRequest(req: express.Request, res: express.Response) {
    console.log('当前请求URL:', req?.url);
    const stream = ['true', '1'].includes(
      req?.query?.stream?.toString()?.toLowerCase() ?? 'true'
    );
    console.log('是否以流方式响应:', req?.query?.stream, stream);
    const contentType = stream
      ? 'text/event-stream; charset=utf-8'
      : 'application/json; charset=utf-8';
    res.setHeader('Content-Type', contentType);
    const output = new Output(stream);
    output.pipe(res);
    try {
      const handler = Routes.filter((it) => {
        // 检查请求方法是否匹配
        if (it?.method !== req?.method?.toLowerCase()) {
          return false;
        }

        // 解析请求的 URL，移除查询字符串
        const reqPath = req?.url?.split('?')[0];

        // 将路由路径和请求路径按 / 分割
        const routeParts = it?.path?.split('/') || [];
        const urlParts = reqPath?.split('/') || [];

        // 长度不同则不匹配
        if (routeParts.length !== urlParts.length) {
          return false;
        }

        // 逐段比较，支持参数匹配（:param）
        return routeParts.every((part, index) => {
          if (part.startsWith(':')) {
            return true; // 参数部分始终匹配
          }
          return part === urlParts[index];
        });
      })?.[0]?.graph;

      if (!handler) {
        throw new Error('没有找到对应的处理器...');
      }

      const thread_id =
        req?.headers?.['authorization']?.[0] ?? new Date().getTime().toString();

      const args = {
        ...(req?.headers ?? {}),
        ...(req?.params ?? {}),
        ...(req?.query ?? {}),
        ...(req?.body ?? {}),

        output,
      };

      const config = {
        configurable: {
          thread_id: thread_id,
        },
        streamMode: 'updates' as const,
        recursionLimit: 50,
      };

      const graph = handler();
      await graph?.invoke(args, config);

      
    } catch (error) {
      console.error('chatbot 错误:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      output.end();
    }
  }
}
