### 依赖反转原则 (DIP)

这个原则阐述了两个重要的事情：

1. 高级模块不应该依赖于低级模块， 两者都应该依赖与抽象；
2. 抽象不应当依赖于具体实现， 具体实现应当依赖于抽象。

这个一开始会很难理解， 但是如果你使用过 Angular.js ， 你应该已经看到过通过依赖注入来实现的这
个原则， 虽然他们不是相同的概念， 依赖反转原则让高级模块远离低级模块的细节和创建， 可以通过 DI
来实现。 这样做的巨大益处是降低模块间的耦合。 耦合是一个非常糟糕的开发模式， 因为会导致代码难于
重构。

如上所述， JavaScript 没有接口， 所以被依赖的抽象是隐式契约。 也就是说， 一个对象/类的方法和
属性直接暴露给另外一个对象/类。 在下面的例子中， 任何一个 Request 模块的隐式契约 `InventoryTracker`
将有一个 `requestItems` 方法。

**不好的：**
```js
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryTracker {
  constructor(items) {
    this.items = items;

    // 不好的： 我们已经创建了一个对请求的具体实现的依赖， 我们只有一个 requestItems 方法依
    // 赖一个请求方法 'request'
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();
```

**好的：**
```js
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// 通过外部创建依赖项并将它们注入， 我们可以轻松的用一个崭新的使用 WebSockets 的请求模块进行
// 替换。
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterV2());
inventoryTracker.requestItems();
```
