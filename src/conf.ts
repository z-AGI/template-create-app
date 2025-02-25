import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml';

export const conf = yaml.load(await fs.promises.readFile(path.join(process.cwd(), 'config.yaml'), 'utf8')) as any