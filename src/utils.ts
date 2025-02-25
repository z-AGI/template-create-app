/**
 * http请求解析器
 */
export const HttpRequestParser = {

    protocol: (request: any) => {
        return request.protocol || 'http' as const;
    },

    method: (request: any) => {
        return request.method || 'GET' as const;
    },

    url: (request: any) => {
        return request.url?.split('?')?.[0] || '/';
    },

    headers: (request: any) => {
        return request.headers || {}
    },

    query: (request: any) => {
        // 获取完整URL
        const fullUrl = `${request.protocol || 'http'}://${request.headers.host || 'localhost'}${request.url}`;

        try {
            // 解析URL参数
            const url = new URL(fullUrl);
            const params: Record<string, string | string[]> = {};

            // 将URLSearchParams转换为对象
            url.searchParams.forEach((value, key) => {
                if (params[key]) {
                    // 如果已存在该键，转换为数组
                    if (Array.isArray(params[key])) {
                        (params[key] as string[]).push(value);
                    } else {
                        params[key] = [params[key] as string, value];
                    }
                } else {
                    params[key] = value;
                }
            });

            return params;
        } catch (error) {
            // URL解析失败时返回空对象
            console.error('解析URL参数失败:', error);
            return {};
        }
    },

    body: async (request: any, asJson = true) => {
        // 检查是否已经解析过请求体
        if (request._parsedBody) {
            return request._parsedBody;
        }

        // 获取请求体数据
        let requestBody: Buffer[] = [];
        await new Promise((resolve) => {
            request.on('data', (chunk: Buffer) => {
                requestBody.push(chunk);
            });
            request.on('end', () => {
                resolve(null);
            });
        });

        // 将 Buffer 数组合并为一个 Buffer 并解析
        const parsedBody = asJson ?
            Buffer.concat(requestBody).toJSON() :
            Buffer.concat(requestBody).toString('utf8');

        // 缓存解析结果
        request._parsedBody = parsedBody;

        return parsedBody;
    }
}