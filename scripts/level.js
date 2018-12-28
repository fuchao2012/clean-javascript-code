const fs = require('fs-extra');
const chalk = require('chalk');
const util = require('./util');

if (util.isTravisCI() && /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
  console.log(`${chalk.green('NOBUILD')} Tagging terminated, parent commit is a Travis build!`);
  process.exit(0);
}
const rulePaths = './rules';

console.time('Tagger');
let output = '';
let missingTags = 0;
let rules = util.readSnippets(rulePaths);
let tagDbData = util.readRules();
let tagDbStats = Object.entries(tagDbData).reduce((acc, val) => {
  val[1].forEach(v => (acc.hasOwnProperty(v) ? acc[v]++ : (acc[v] = 1)));
  return acc;
}, {});
try {
  for (let snippet of Object.entries(rules)) {
    if (tagDbData.hasOwnProperty(snippet[0].slice(0, -3)) && tagDbData[snippet[0].slice(0, -3)].join(',').trim()) {
      output += `${snippet[0].slice(0, -3)}:${tagDbData[snippet[0].slice(0, -3)]
        .join(',')
        .trim()}\n`;
    } else {
      output += `${snippet[0].slice(0, -3)}:uncategorized\n`;
      missingTags++;
      console.log(`${chalk.yellow('Tagged uncategorized:')} ${snippet[0].slice(0, -3)}`);
    }
  }
  fs.writeFileSync('rule_database', output);
} catch (err) {
  console.log(`${chalk.red('ERROR!')} During rule_database generation: ${err}`);
  process.exit(1);
}
// // Log statistics for the rule_database file
// console.log(`\n${chalk.bgWhite(chalk.black('=== TAG STATS ==='))}`);
// for (let tagData of Object.entries(tagDbStats)
//   .filter(v => v[0] !== 'undefined')
//   .sort((a, b) => a[0].localeCompare(b[0]))) {
//   console.log(`${chalk.green(tagData[0])}: ${tagData[1]} snippets`);
// }
// console.log(
//   `${chalk.blue('New untagged snippets (will be tagged as \'uncategorized\'):')} ${missingTags}\n`
// );
// // Log a success message
// console.log(`${chalk.green('SUCCESS!')} rule_database file updated!`);
// // Log the time taken
// console.timeEnd('Tagger');
