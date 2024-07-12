/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:23:57
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-12 13:29:34
 * @Description: 
 */
import fs from 'fs';
import path from 'path';
import lessToJs from 'less-vars-to-js';

export default () => {
  const themePath = path.join(__dirname, '../src/styles/global.less');

  return {
    ...lessToJs(fs.readFileSync(themePath, 'utf8')),
    '@public-path': `"${process.env.PUBLIC_PATH || '/'}"`,
  };
};
