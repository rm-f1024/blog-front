const fs = require('fs')
const path = require('path');

// 从环境变量中获取
const { NODE_ENV = 'production', RTE = 'test' } = process.env; 

//封装 resolve
const resolve = (p) => path.join(__dirname, p); 

/**
 * 读取文件
 * 文件格式内容为
 * TEST=ABC
 * @param {路径} p 路径
 * @return [[TEST:ABC]]
 */
const readEnv = (p) => {
    fs
    .readFileSync(resolve(p))
    .toString()
    .trim()
    .split('\n')
    .filter((l) => l.indexOf('=') !== -1)
    .map((v) => v.split('='));
}

// 读取./config/development/{RTE}中的文件，
// 
fs.writeFileSync(
  resolve(`./.env.${NODE_ENV}.local`),
  readEnv(`./config/${NODE_ENV}/${RTE}`)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n'),
);

