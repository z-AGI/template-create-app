
// 定义请求体的类型
interface RequestBody {
    input: string;
    retrieved: {
        pageContent: string;
    }[];
}

try {

    const response = await fetch('http://localhost:3000/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "input": "苹果是否有害物质？论证下，不少于2000字"
        })
    });

    if (!response.ok) {
        throw new Error(`请求失败，状态码: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error('响应体没有可读流');
    }

    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            console.log('数据接收完成');
            break;
        }
        const chunk = decoder.decode(value);
        console.log('接收到的数据块:', chunk);
    }
} catch (error) {
    console.error('请求过程中出现错误:', error);
}

export { };
