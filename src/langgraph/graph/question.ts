import { Annotation, MemorySaver, StateGraph } from '@langchain/langgraph';
import { InputState, OutputState } from '../../utils/state';
import { _type, Type } from '../types';
import {
  generateQaQuestion,
  GenerateQaQuestion,
} from '../node/qa/question';
import {
  generateCodeQuestion,
  GenerateCoderQuestion,
} from '../node/code/question';
import {
  generateChoiceQuestion,
  GenerateChoiceQuestion,
} from '../node/choice/question'

/**
 * 状态
 */
export const Graph = Annotation.Root({

  ...InputState.spec,
  ...OutputState.spec,

  ...GenerateQaQuestion.spec,
  ...GenerateCoderQuestion.spec,
  ...GenerateChoiceQuestion.spec,
});

const selector = async (state: typeof Graph.State) => {
  const { type } = state;

  const target = `generate${
    type.charAt(0).toUpperCase() + type.slice(1)
  }Question`;

  console.log(`生成题型：${target}\n`);

  if (_type.includes(type)) {
    return target;
  }

  throw new Error('系统不支持该业务类型');
};

/**
 * 生成题目
 * @returns
 */
export const generate = () => {
  return new StateGraph(Graph)
    .addNode('generateQaQuestion', generateQaQuestion)
    .addNode('generateCodeQuestion', generateCodeQuestion)
    .addNode('generateChoiceQuestion', generateChoiceQuestion)
    .addConditionalEdges('__start__', selector)
    .addEdge('generateQaQuestion', '__end__')
    .addEdge('generateCodeQuestion', '__end__')
    .addEdge('generateChoiceQuestion', '__end__')
    .compile({
      checkpointer: new MemorySaver(),
    });
};
