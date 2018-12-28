### 避免类型检查 (part2)

如果你使用原始的字符串、 整数和数组， 并且你不能使用多态， 但是你依然感觉到有类型检查的需要，
你应该考虑使用 TypeScript 。 它是一个常规 JavaScript 的优秀的替代品， 因为它在标准的 JavaScript
语法之上为你提供静态类型。 对常规 JavaScript 做人工类型检查的问题是需要大量的冗词来仿造类型安
全而不缺失可读性。 保持你的 JavaScript 简洁， 编写良好的测试， 并有良好的代码审阅， 否则使用
TypeScript （就像我说的， 它是一个伟大的替代品）来完成这些。

**不好的：**
```js
function combine(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number' ||
      typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 + val2;
  }

  throw new Error('Must be of type String or Number');
}
```

**好的：**
```js
function combine(val1, val2) {
  return val1 + val2;
}
```
