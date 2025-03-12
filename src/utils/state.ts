import { Annotation } from '@langchain/langgraph';
import { Output } from './output';
import { FieldAnnotation } from '../http-server/annotation';

/**
 * 输入状态
 */
export const InputState = Annotation.Root({
  headers: Annotation<any>(), // 请求头
  params: Annotation<any>(), // 请求参数
  query: Annotation<any>(), // 查询参数
  body: Annotation<any>(), // 请求体
});

/**
 * 输出状态
 */
export const OutputState = Annotation.Root({

  output: Annotation<Output>(), // 输出
});
