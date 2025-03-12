import { join } from "path";
import sqlite3 from "sqlite3";
import { MongoClient } from 'mongodb';
import { conf } from "./conf";

export const getSqlite3 = (): Promise<sqlite3.Database> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(join(process.cwd(), "quiz.db"), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
} 

// MongoDB连接URL
// const url = 'mongodb://root:P%40ssw0rd@localhost:27017';

// 连接MongoDB数据库
export const getMongoDB = async (db: string) => {
  try {
    const client = new MongoClient(await conf.get('database.mongo'));
    await client.connect();
    return client.db(db);
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    throw error;
  }
}
