### 使用getters和setters

JavaScript 没有接口或类型， 所以坚持这个模式是非常困难的， 因为我们没有 `public` 和 `private`
关键字。 正因为如此， 使用 getters 和 setters 来访问对象上的数据比简单的在一个对象上查找属性
要好得多。 “为什么？” 你可能会问， 好吧， 原因请看下面的列表：

* 当你想在获取一个对象属性的背后做更多的事情时， 你不需要在代码库中查找和修改每一处访问；
* 使用 `set` 可以让添加验证变得容易；
* 封装内部实现；``
* 使用 getting 和 setting 时， 容易添加日志和错误处理；
* 继承这个类， 你可以重写默认功能；
* 你可以延迟加载对象的属性， 比如说从服务器获取。

**不好的：**
```js
class BankAccount {
  constructor() {
    this.balance = 1000;
  }
}

const bankAccount = new BankAccount();

// Buy shoes...
bankAccount.balance -= 100;
```

**好的：**
```js
class BankAccount {
  constructor(balance = 1000) {
    this._balance = balance;
  }

  // It doesn't have to be prefixed with `get` or `set` to be a getter/setter
  set balance(amount) {
    if (verifyIfAmountCanBeSetted(amount)) {
      this._balance = amount;
    }
  }

  get balance() {
    return this._balance;
  }

  verifyIfAmountCanBeSetted(val) {
    // ...
  }
}

const bankAccount = new BankAccount();

// Buy shoes...
bankAccount.balance -= shoesPrice;

// Get balance
let balance = bankAccount.balance;

```
