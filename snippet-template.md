### 规则名称

精简描述

**不好的：**
```js
const yyyymmdstr = moment().format('YYYY/MM/DD');
```

**好的：**
```js
const currentDate = moment().format('YYYY/MM/DD');
```