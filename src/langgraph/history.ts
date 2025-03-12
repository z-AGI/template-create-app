import { randomUUID } from 'crypto';
import { getMongoDB } from '../utils/db';
import { Type } from './types';
import { ObjectId } from 'mongodb';

/**
 * 近20次生成的题目
 * @param type
 * @param require
 * @returns
 */
export const latest = async (type: Type, require: string) => {
  try {
    const database = await getMongoDB('quiz');
    const records = await database
      .collection('question')
      .find({
        type: type,
        require: require,
      })
      .sort({ _id: -1 })
      .limit(20)
      .toArray();
    console.log(`查询到近20条记录 =>`, records)
    return records;
  } catch (err) {
    console.error('查询失败:', err);
    return [];
  }
};

/**
 * 保持新增的题目
 * @param data
 * @returns
 */
export const insert = async (data: any) => {
  try {
    const database = await getMongoDB('quiz');
    const result = await database.collection('question').insertOne({
      ...data,
    });
    return result.acknowledged;
  } catch (err) {
    console.error('保存历史记录失败:', err);
    return false;
  }
};

export const findById = async (id: string) => {
  try {
    const database = await getMongoDB('quiz');
    const record = await database.collection('question').findOne({
      id: id
    });
    console.log(`查询到记录 =>`, record)
    return record;
  } catch (err) {
    console.error('查询失败:', err);
    return null;
  }
};

export const update = async (data: any) => {
  try {
    const database = await getMongoDB('quiz');
    const result = await database.collection('question').updateOne(
      { id: data?.id },
      {
        $set: data,
      }
    );
    return result.acknowledged;
  } catch (err) {
    console.error('更新历史记录失败:', err);
    return false;
  }
};
