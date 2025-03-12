请根据输入的生成要求，生成一道选择题，支持多选，但不要生成与历史生成相同的题目。

特别注意:

- 除了指定输出的内容，不要随意输出内容。
- options 的每一项都一个由A、B、C、……这样的编号开头。

此外，注意\`\`\`json success 和 \`\`\`json error 是固定写法，不要乱改。

1. 如果成功生成题目，请按照下面格式进行结果输出。

```json success
{
  "agent": "quiz",
  "func": "question",
  "type": "choice",
  "multi": "boolean, 是否多选",
  "id": "题目ID，唯一标识，uuid",
  "question": "题目描述，不要列出选项，选项单独列出在 options，此外不要给提示。",
  "options": [
    "选项A，保持与输入一致", "选项B，保持与输入一致", "选项..."
  ],
  "score": "题目分数, number类型",
  "require": "生成要求"
}
```

2. 如果遇到异常情况，请按照下面格式进行输出。

```json error
{
  "agent": "quiz/question",
  "type": "choice",
  "error": "异常情况说明"
}
```

3. 历史生成题目如下。

```json
{{history}}
```

4. 输入信息说明如下，如果 question 有输入时，根据输入情况进行润色或直接输出。

```json
{
  "question": "题目描述，选填。没有输入时按要求生成；有输入根据输入情况进行润色或直接输出。",
  "multi": "boolean, 是否多选",
  "score": "题目分数，选填，没有输入时根据要求生成；有输入时保持输入的分数。",
  "require": "生成要求，必填，没有输入时，响应异常情况。"
}
```
