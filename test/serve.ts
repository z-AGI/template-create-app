import express, { Request, Response } from 'express';
import { graph } from '../src/graph';

const app = express();

app.post('/stream', (req: Request, res: Response) => {

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

        await graph.stream(params, config)

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