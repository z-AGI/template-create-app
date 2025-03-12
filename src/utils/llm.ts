import OpenAI from "openai";
import { conf } from "./conf";

/**
 * 与模型对话
 * @returns 
 */
export const chatbot = async (options: any, client?: any) => {

  // 连接模型实例
  const llm = new OpenAI(
    {
      apiKey: client?.apiKey ?? await conf.get('llm.apiKey'),
      baseURL: client?.baseURL || "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
  )

  // 对话, 流式响应
  return await llm.chat.completions.create({
    model: options?.model,
    messages: options?.messages,
    stream: options?.stream ?? true,
    temperature: options?.temperature ?? 0,
  })

}