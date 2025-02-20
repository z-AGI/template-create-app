import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { GraphStateAnnotation } from "./state";

export const graph = new StateGraph(GraphStateAnnotation)
    // 添加节点和边
    .compile({
        checkpointer: new MemorySaver(),
    })
