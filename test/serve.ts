import express, { Request, Response } from 'express';
import { graph } from '../src/graph';
import { config } from './config';
import { PassThrough } from 'stream';
import { conf } from '../src/conf';

const app = express();

/**
 * 应用描述
 */
app.get('/info', async (req: Request, res: Response) => {
    // 设置响应头
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive')

    const app = await conf?.['app'] ?? {}

    res.end(JSON.stringify(app))
})

/**
 * 应用入口
 */
app.post('/invoke', async (req: Request, res: Response) => {

    // 设置响应头
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive')

    // 定义输出流
    const output = new PassThrough()
    // 将output接到response管道
    output.pipe(res)

    // 接收body
    req.on('data', async (chunk: Buffer) => {

        // 接收参数
        const params = {
            ...JSON.parse(chunk.toString()),
            output
        }

        // 调用智能体
        await graph.invoke(params, config)

        // 结束输出流
        output.end()

    });

    // 异常处理
    req.on('error', (err: Error) => {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    });
});

// 端口统一3000
const port: number = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});