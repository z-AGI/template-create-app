import { graph } from "../src/graph";

const params = {
    input: '苹果有什么有害物质？'
};

const config = {
    configurable: { thread_id: "test" },
    streamMode: "updates" as const,
    recursionLimit: 50
};

const events = []

const results = (await graph.invoke(params, config)) as any

for (const result of results) {
    const key = Object.keys(result)?.[0]
    let event: any = Object.values(result)?.[0]
    event['__node__'] = key
    events.push(event)
}

console.log(events)


