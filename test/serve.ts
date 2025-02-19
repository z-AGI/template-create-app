import express, { Request, Response } from 'express';
import { graph } from '../src/graph';

const app = express();

app.post('/stream', (req: Request, res: Response) => {

    // 设置响应头
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    req.on('data', async (chunk: Buffer) => {
        const params = {
            ...JSON.parse(chunk.toString()),
            response: res
        }

        const config = {
            configurable: { thread_id: "test" },
            streamMode: "updates" as const,
            recursionLimit: 50
        };

        await graph.invoke(params, config)

        res.end()

    });

    req.on('error', (err: Error) => {
        // 处理错误
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    });
});

const port: number = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});