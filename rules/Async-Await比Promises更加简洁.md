### Async/Await比Promises更加简洁

Promises 是回调的一个非常简洁的替代品， 但是 ES2017/ES8 带来的 async 和 await 提供了一个
更加简洁的解决方案。 你需要的只是一个前缀为 `async` 关键字的函数， 接下来就可以不需要 `then`
函数链来编写逻辑了。 如果你能使用 ES2017/ES8 的高级功能的话， 今天就使用它吧！

**不好的：**
```js
require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((response) => {
    return require('fs-promise').writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch((err) => {
    console.error(err);
  });

```

**好的：**
```js
async function getCleanCodeArticle() {
  try {
    const response = await require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
    await require('fs-promise').writeFile('article.html', response);
    console.log('File written');
  } catch(err) {
    console.error(err);
  }
}
```
