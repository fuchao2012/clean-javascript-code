### 接口隔离原则 (ISP)

JavaScript 没有接口， 所以这个原则不想其它语言那么严格。 不过， 对于 JavaScript 这种缺少类
型的语言来说， 它依然是重要并且有意义的。

接口隔离原则说的是 “客户端不应该强制依赖他们不需要的接口。” 在 JavaScript 这种弱类型语言中，
接口是隐式的契约。

在 JavaScript 中能比较好的说明这个原则的是一个类需要一个巨大的配置对象。 不需要客户端去设置大
量的选项是有益的， 因为多数情况下他们不需要全部的设置。 让它们变成可选的有助于防止出现一个“胖接
口”。

**不好的：**
```js
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.animationModule.setup();
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  animationModule() {} // Most of the time, we won't need to animate when traversing.
  // ...
});

```

**好的：**
```js
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  options: {
    animationModule() {}
  }
});
```
