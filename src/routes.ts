import { RouteAnnotation } from "./http-server/annotation";
import { generate as question } from "./langgraph/graph/question";

/**
 * 路由定义
 */
export const Routes: RouteAnnotation[] = [
  {
    "graph": question,
    "name": "question",
    "description": "生成题目",
    "path": "/question/:type",
    "method": "post",
    "headers": [
      {
        "name": "Content-Type",
        "title": "请求格式",
        "defaultValue": "application/json",
      }
    ],
    "params": [
      {
        "title": "题型",
        "name": "type",
        "type": "enum",
        "required": true,
        "description": "支持类型，选择题：choice, 问答题：qa, 编程题：code。",
        "defaultValue": "",
        "enums": [
          {
            "name": "choice",
            "description": "选择题，支持单选、多选"
          },
          {
            "name": "qa",
            "description": "问答题"
          },
          {
            "name": "code",
            "description": "编程题"
          }
        ]
      },
    ],
    "query": [
      {
        "title": "是否以流方式响应",
        "name": "stream",
        "type": "boolean",
        "required": false,
        "description": "默认以流方式响应。",
        "defaultValue": "true",
      },
    ],
    "body": [
      {
        "name": "question",
        "title": "题目描述",
        "type": "string",
        "required": false,
        "description": "允许为空或非完整的题目描述。",
        "defaultValue": ""
      },
      {
        "name": "score",
        "title": "题目分数",
        "type": "number",
        "required": true,
        "description": "默认：10",
        "defaultValue": "10"
      },
      {
        "name": "require",
        "title": "生成要求",
        "type": "string",
        "required": true,
        "description": "生成题目的具体要求和约束。",
        "defaultValue": ""
      }
    ]
  },

]

