import { getObjectProperty, toCamelCaseObject } from "./utils";
import fs from 'fs';
import { join } from "path";
import * as yaml from 'js-yaml'

export const conf = {

    /**
     * 载入
     * @returns 
     */
    async load() {
        const path = join(process.cwd(), 'config.yaml')
        const data = fs.readFileSync(path, 'utf8')
        const config = yaml.load(data)
        return config
    },

    /**
     * 获取
     * @param key 
     * @returns 
     */
    async get(key : string) {
        const config = await this.load()
        return toCamelCaseObject(getObjectProperty(config, key))
    }

}