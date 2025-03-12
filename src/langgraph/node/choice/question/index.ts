import { Annotation } from '@langchain/langgraph';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { OutputState } from '../../../../utils/state';
import { Prompt } from '../../../../utils/prompt';
import { chatbot } from '../../../../utils/llm';
import { insert, latest } from '../../../history';
import { Type } from '../../../types';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块所在的目录路径
const __dirname = dirname(__filename);

/**
 * 状态
 */
export const GenerateChoiceQuestion = Annotation.Root({
  type: Annotation<Type>(),
  question: Annotation<string>(), // 题目描述
  score: Annotation<number>(), // 题目分数
  require: Annotation<string>(), // 生成要求

  ...OutputState.spec,
});

/**
 * 生成
 * @param state
 * @returns
 */
export const generateChoiceQuestion = async (
  state: typeof GenerateChoiceQuestion.State
) => {
  const { type, question, score, require, output } = state;

  let data = '';
  let json = {
    type
  }

  try {
    const system = await Prompt.system(__dirname, {
      history: await latest(type, require),
    });
    const user = await Prompt.user(__dirname, {
      question,
      score,
      require,
    });
    const messages = [system, user];

    const result: any = await chatbot({
      messages,
      model: 'qwen-plus',
      stream: true,
    });

    for await (const chunk of result) {
      let content = chunk.choices[0]?.delta?.content || '';
      data += content;
      output.write(content);
      process.stdout.write(content);
    }
    console.log();

    data = data
      ?.replace(/^```json (.*?)+\n/g, '')
      ?.replace(/```$/g, '')
      ?.trim();

    try {
      json = {
        ...json, 
        ...JSON.parse(data)
      }
      await insert(json);
      output.json(json)
    } catch (err) {
      console.error('解析错误：', err);
    }
    
  } catch (error) {
    console.error('生成异常：', error);
  }

  return {
    ...state,
    ...json
  };
};
