### 避免类型检查 (part1)

JavaScript 是无类型的， 这意味着你的函数能接受任何类型的参数。 但是有时又会被这种自由咬伤，
于是又尝试在你的函数中做类型检查。 有很多种方式来避免这个， 第一个要考虑的是一致的 API 。

**不好的：**
```js
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.peddle(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**好的：**
```js
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```
