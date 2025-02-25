import { Annotation } from "@langchain/langgraph";
import { PassThrough } from 'stream';

export const GraphStateAnnotation = Annotation.Root({

    output: Annotation<PassThrough>() // 输出
})