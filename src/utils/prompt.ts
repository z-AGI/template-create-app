import fs from 'fs/promises';
import { ChatCompletionMessageParam } from 'openai/resources';
import { join } from 'path';

/**
 * 提示词
 */
export const Prompt = {

  async get(role: 'system' | 'user', file: string, params: any): Promise<ChatCompletionMessageParam> {
    try {
      const text = await fs.readFile(file, 'utf8')

      const content = text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        // 如果参数值是对象，转换为JSON字符串
        const value = params[key];
        // console.log(match, key, value)
        if (typeof value === 'object' && value !== null) {
          return JSON.stringify(value, null, 2);
        }
        return value ?? match;
      });

      return {
        role,
        content,
      }
    } catch (error) {
      console.error(`获取${role}提示词失败:`, error);
      throw {
        role,
        content: []
      }
    }
  },

  async system(prefix: string, params: any) {
    return this.get('system', join(prefix, 'system.md'), params)
  },

  async user(prefix: string, params: any) {
    return this.get('user', join(prefix, 'user.md'), params)
  }

};
