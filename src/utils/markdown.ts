import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

// 将markdown文本解析为AST结构
export const parse = (text: string) => {
  const processor = unified()
    .use(remarkParse) // 使用remark-parse解析markdown
    .use(remarkGfm)   // 支持GFM(GitHub Flavored Markdown)扩展语法
    
  // 解析markdown文本
  const ast = processor.parse(text)

  return ast
}

// 获取AST中的所有heading节点
export function getHeadings(ast: any) {
  const headings: any[] = []
  
  // 遍历AST
  function visit(node: any) {
    if (node.type === 'heading') {
      headings.push(node)
    }
    
    if (node.children) {
      node.children.forEach(visit)
    }
  }
  
  visit(ast)
  return headings
}
