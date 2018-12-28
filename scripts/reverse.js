/*
  This is the builder script that generates the rules/*.md from README.md.
  Run using `npm run reverse`.
*/
// Load modules
const { readFileSync, writeFileSync } = require('fs-extra');

try {
  const readme = readFileSync('./README.md', 'utf-8');
  // create files
  readme.split('### ')
    .map(rule => {
      if (!rule.startsWith('#')) {
        let title = rule.split('\n')[0]
          .replace('/', '-')
          .replace(' ', '');
        let content = rule.split('**[⬆ 返回顶部]')[0];
        content = content.split('## **')[0];
        writeFileSync('./rules/' + title + '.md', '### ' + content);
      }
    });
} catch (e) {
  console.log(e);
}
