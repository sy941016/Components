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
