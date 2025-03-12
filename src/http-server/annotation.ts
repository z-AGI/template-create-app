import { StateGraph } from "@langchain/langgraph";

/**
 * 字段注解
 */
export interface FieldAnnotation {
  name: string;
  title?: string;
  type?: 'string' | 'number' | 'boolean' | 'enum' | 'array' | 'object' | 'file';
  description?: string;
  defaultValue?: string;
  enums?: {
    name: string;
    description: string;
  }[];
  required?: boolean;
  children?: SubFieldAnnotation | FieldAnnotation[];
}

/**
 * 子字段注解
 */
export interface SubFieldAnnotation {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'enum' | 'file';
  items?: FieldAnnotation[];
}

/**
 * 路由注解
 */
export interface RouteAnnotation {
  graph: Function; // 路由所属的状态图
  name: string; // 路由名称
  description?: string; // 路由描述
  method: 'get' | 'post' | 'put' | 'delete'; // 请求方法
  path: string; // 路由地址
  headers?: FieldAnnotation[];
  params?: FieldAnnotation[];
  query?: FieldAnnotation[];
  body?: FieldAnnotation[];
  response?: FieldAnnotation[];
}
