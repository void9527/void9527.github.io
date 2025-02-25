---
outline: deep
---


## Truthy、Falsy与true、false的区别

:::details

- truthy和true还是不一样的,隐含有true属性的变量不可以认为它是true,它不是boolean类型!

> 像很多语言一样,javascript也支持boolean数据类型(有true和false两个值),不过特别的是,javascript中的任何对象都还隐含一个boolean值,这便是大家所说的truthy和falsy原则。我们可以很方便的使用这个隐含的属性,特别是在变量比较上(if条件句)。掌握好这些特别的规则有助于调试我们的前端代码。

- 以下的值都隐含有false属性:
  - false
  - 0(零)
  - "" (空串)
  - null
  - undefined
  - NaN（Not-a-Number）注意,这是个number类型！用来表示变量不是number的number类型,有些拗口
  
```js
if ( [] ) { 
// 这里的代码将会执行 
} if ( [] == true ) { 
// 这里的代码不会执行 
} if ( [] == false ) { 
// 这里的代码将会执行 
}
```

:::

## 错误捕捉的方式

:::details
JavaScript中可以使用try...catch语句来捕捉错误，try块中放置可能抛出错误的代码，catch块中处理错误。

- 使用try块包裹可能出错的代码，可以防止程序崩溃。
- catch块可以捕获错误并执行相应的处理逻辑，如记录错误信息或提示用户。
- 还可以使用finally块来执行无论是否发生错误都需要执行的代码，如清理资源。

:::

## reflect有几个参数

:::details
Reflect对象的方法通常接受两个或三个参数，具体取决于方法。

- Reflect.apply(target, thisArgument, argumentsList)用于调用函数。
- Reflect.get(target, propertyKey, receiver)用于获取对象属性。
- Reflect.set(target, propertyKey, value, receiver)用于设置对象属性。

:::

## 内存泄露怎么解决

:::details
内存泄露可以通过及时释放不再使用的对象、避免全局变量、使用WeakMap和WeakSet等方式来解决。

- 定期检查和清理不再使用的对象，确保它们可以被垃圾回收。
- 避免使用全局变量，尽量将变量的作用域限制在必要的范围内。
- 使用WeakMap和WeakSet可以防止内存泄露，因为它们对对象的引用是弱引用，允许垃圾回收。

:::

## new 的实现原理

:::details
`new`操作符会创建一个新对象，设置其原型为构造函数的prototype，并执行构造函数，最后返回新对象。

- `new`操作符的第一步是创建一个空对象。
- 然后将新对象���原型指向构造函数的prototype。
- 接着执行构造函数，并将`this`指向新对象。
- 最后返回新对象，或者如果构造函数返回的是对象，则返回该对象。

:::

## apply bind和call的区别

:::details
`apply`和`call`都用于改变函数的上下文，`apply`接受一个数组作为参数，而`call`接受多个参数。`bind`返回一个新的函数，绑定了特定的上下文。

- `apply`适用于需要传入参数数组的情况，特别是在参数数量不确定时。
- `call`适用于已知参数数量的情况，可以直接传入参数。
- `bind`创建一个新函数，允许在稍后调用时指定`this`的值和初始参数。

:::

## bind中返回的函数中做什么

:::details
`bind`返回的函数可以在调用时传入参数，这些参数会被预先绑定到原函数的参数上。

- 通过`bind`，可以创建一个新的函数，固定某些参数，简化后续调用。
- 这种方式常用于事件处理和回调函数中，确保`this`指向正确。
- 还可以在返回的函数中添加额外的参数，进一步增强灵活性。

:::

## 原型与原型链

:::details
原型是对象的一个属性，指向另一个对象，原型链是由多个对象的原型组成的链条，用于实现继承。

- 每个JavaScript对象都有一个原型，可通过`__proto__`访问。
- 原型链允许对象访问其原型及其原型的原型，形成一个链条。
- 这种机制使得JavaScript能够实现继承和共享属性/方法。

:::

## 作用域和作用域链

:::details
作用域是变量的可访问范围，作用域链是由多个作用域组成的链条，用于查找变量。

- 作用域分为全局作用域和局部作用域，局部作用域可以嵌套。
- 当访问变量时，JavaScript会从当前作用域开始查找，直到找到为止。
- 如果在所有作用域中都找不到变量，则会抛出错误。

:::

## 垃圾回收机制的方法

:::details
JavaScript使用标记清除和引用计数等垃圾回收机制来自动管理内存。

- 标记清除：垃圾回收器会标记所有可达的对象，然后清除未被标记的对象。
- 引用计数：通过跟踪对象的引用数量来判断对象是否可以被回收。
- 现代JavaScript引擎通常使用标记清除作为主要的垃圾回收策略。

:::

## 引用计数的弊端

:::details
引用计数的弊端在于无法处理循环引用的情况，导致内存泄露。

- 当两个对象相互引用时，即使它们不再被使用，引用计数也不会降为零。
- 这会导致内存无法被回收，造成内存泄露。
- 现代JavaScript引擎通常结合使用标记清除来解决这个问题。

:::

## 闭包

:::details
闭包是指一个函数可以访问其外部作用域的变量，即使外部函数已经返回。

- 闭包允许函数保持对其外部变量的引用，形成一个持久的作用域。
- 这在实现私有变量和封装时非常有用。
- 闭包也可以用于创建工厂函数和回调函数。

:::

## array set weakSet的区别

:::details
Array是有序的集合，Set是无序的唯一值集合，WeakSet只允许对象作为成员，并且对其不保持强引用。

- Array支持索引访问，适合存储有序数据。
- Set用于存储唯一值，避免重复，支持快速查找。
- WeakSet的成员是弱引用，允许垃圾回收，适合存储临时对象。

:::

## map weakMap的区别

:::details
Map是键值对集合，WeakMap的键必须是对象，并且对其不保持强引用，防止内存泄露。

- Map支持任意类型的键，适合存储复杂数据结构。
- WeakMap的键是弱引用，适合存储与DOM元素相关的数据，避免内存泄露。
- WeakMap不支持遍历，适合用于私有数据存储。

:::

## 异步

### Promise 报错如何拦截

:::details
在JavaScript中，Promise是用于处理异步操作的对象。Promise的错误处理可以通过`catch`方法来实现，或者在`async/await`语法使用`try...catch`来捕获错误。

- **使用`catch`方法**：
  - 当Promise被拒绝（rejected）时，可以使用`catch`方法来处理错误。
  - `catch`方法会接收一个回调函数，该函数会在Promise被拒绝时执行。
  - 示例：

    ```javascript
    const promise = new Promise((resolve, reject) => {
      // 模拟异步操作
      setTimeout(() => {
        reject(new Error('Something went wrong!'));
      }, 1000);
    });

    promise
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error caught:', error.message);
      });
    ```

- **使用`async/await`和`try...catch`**：
  - 在使用`async/await`语法时，可以将Promise放在`try`块中，并在`catch`块中捕获错误。
  - 这种方式使得异步代码的错误处理更加直观。
  - 示例：

    ```javascript
    const asyncFunction = async () => {
      try {
        const result = await promise;
        console.log(result);
      } catch (error) {
        console.error('Error caught:', error.message);
      }
    };

    asyncFunction();
    ```

- **全局错误处理**：
  - 对于未处理的Promise拒绝，可以使用`window.onunhandledrejection`事件来捕获。
  - 这可以帮助开发者捕获所有未处理���Promise错误，进行统一处理。
  - 示例：

    ```javascript
    window.onunhandledrejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    };
    ```

- **总结**：通过`catch`方法、`async/await`结合`try...catch`，以及全局错误处理，可以有效地拦截和处理Promise中的错误，提升代码的健壮性。

:::

### 代码使用太多try不优雅怎么办

:::details
在使用`async/await`时，频繁使用`try...catch`可能会导致代码变得冗长和不优雅。以下是一些优化建议，可以帮助减少`try...catch`的使用频率，并提高代码的可读性。

- **封装错误处理**：
  - 可以将错误处理逻辑封装到一个单独的函数中，这样在调用异步函数时只需处理一次错误。
  - 示例：

    ```javascript
    const handleAsync = async (asyncFunc) => {
      try {
        return await asyncFunc();
      } catch (error) {
        console.error('Error caught:', error.message);
      }
    };

    const fetchData = async () => {
      return await handleAsync(async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
      });
    };
    ```

- **使用中间件模式**：
  - 在某些情况下，可以使用中间件模式来处理错误���尤其是在处理多个异步操作时。
  - 示例：

    ```javascript
    const asyncMiddleware = async (req, res, next) => {
      try {
        await next();
      } catch (error) {
        console.error('Error caught:', error.message);
        res.status(500).send('Internal Server Error');
      }
    };

    const fetchData = async () => {
      await asyncMiddleware({}, {}, async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
      });
    };
    ```

- **使用Promise.all**：
  - 如果有多个异步操作，可以使用`Promise.all`来并行处理，并在外层捕获错误。
  - 示例：

    ```javascript
    const fetchMultipleData = async () => {
      try {
        const [data1, data2] = await Promise.all([
          fetch('https://api.example.com/data1').then(res => res.json()),
          fetch('https://api.example.com/data2').then(res => res.json()),
        ]);
        console.log(data1, data2);
      } catch (error) {
        console.error('Error caught:', error.message);
      }
    };
    ```

- **使用自定义错误类**：
  - 创建自定义错误类，以便在捕获错误时提供更多上下文信息。
  - 示例：

    ```javascript
    class CustomError extends Error {
      constructor(message) {
        super(message);
        this.name = 'CustomError';
      }
    }
 
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new CustomError('Failed to fetch data');
        }
        return await response.json();
      } catch (error) {
        console.error('Error caught:', error.message);
      }
    };
    ```

- **总结**：通过封装错误处理、使用中间件模式、并行处理多个异步操作、创建自定义错误类等方式，可以减少`try...catch`的使用频率，提高代码的可读性和优雅性。

:::

## ES6 提出的块级作用域解决了什么问题，结合 JS 调用栈

:::details
ES6 引入的块级作用域主要通过 `let` 和 `const` 关键字来实现，解决了以下几个问题：

1. **变量提升问题**:
   - 在 ES5 中，使用 `var` 声明的变量会被提升到函数的顶部，导致在块级作用域内的变量在块外也可访问。这可能导致意外的行为和难以调试的错误。
   - 例如：

     ```javascript
     if (true) {
         var x = 10;
     }
     console.log(x); // 输出 10
     ```

   - 使用 `let` 和 `const` 声明的变量只在其块级作用域内有效，避免了这种提升问题。

     ```javascript
     if (true) {
         let y = 20;
     }
     console.log(y); // ReferenceError: y is not defined
     ```

2. **循环中的作用域问题**:
   - 在使用 `var` 声明循环变量时，所有的循环迭代共享同一个变量，导致在异步操作中可能出现意外的结果。
   - 例如：

     ```javascript
     for (var i = 0; i < 3; i++) {
         setTimeout(() => {
             console.log(i); // 输出 3，循环结束后 i 的值
         }, 100);
     }
     ```

   - 使用 `let` 声明循环变量时，每次迭代都会创建一个新的作用域，解决了这个问题。

     ```javascript
     for (let j = 0; j < 3; j++) {
         setTimeout(() => {
             console.log(j); // 输出 0, 1, 2
         }, 100);
     }
     ```

3. **避免全局变量污染**:
   - 在 ES5 中，使用 `var` 声明的变量如果在全局作用域中声明，可能会导致全局变量的污染。块级作用域可以帮助限制变量的作用范围，减少全局命名冲突的风险。

4. **更清晰的代码结构**:
   - 块级作用域使得代码的结构更加清晰，变量的作用范围更加明确，便于理解和维护。

结合 JS 调用栈

- **调用栈**: JavaScript 的调用栈用于管理函数调用的执行顺序。当一个函数被调用时，它会被推入栈中，执行完成后从栈中弹出。
- **作用域链**: 每个函数都有自己的作用域，变量的查找是通过作用域链进行的。块级作用域的引入使得在调用栈中，变量的查找更加明确，避免了因变量提升和共享作用域导致的混淆。

- ES6 引入的块级作用域通过 `let` 和 `const` 解决了变量提升、循环作用域、全局变量污染等问题，使得代码更加清晰和可维护。结合 JS 调用栈，块级作用域的引入使得变量的查找和管理更加高效，减少了潜在的错误。

:::
## Date.now() 与 performance.now()
:::details
performance.now() 与 Date.now() 是 JavaScript 中用于获取时间戳的两个方法，但它们在精度、用途和底层实现上有显著区别：

1. 时间起点
   - Date.now()
     - 返回自 1970 年 1 月 1 日 00:00:00 UTC（UNIX 纪元） 以来的毫秒数，表示绝对时间点。
   - performance.now()
     - 返回从 页面导航开始（即 performance.timing.navigationStart）或 Performance API 初始化 到当前时刻的时间，单位为毫秒（但精度更高）。在 Web Worker 中，起点是 Worker 初始化的时间。
2. 精度
   - Date.now()
     - 精度为 毫秒级（整数），受系统时钟调整（如用户修改时间）影响。
   - performance.now()
     - 精度通常为 微秒级（浮点数），且基于单调递增时钟，不受系统时间调整或时钟漂移影响，确保时间差值准确。
3. 用途
   - Date.now()
     - 适用于记录事件发生的绝对时间点（如日志时间戳）。
   - performance.now()
     - 专为高精度测量时间间隔设计（如函数执行耗时、动画帧率），适合性能分析和需要稳定增量的场景。
4. 浏览器支持
   - Date.now()
     - 支持广泛（ECMAScript 5+）。
   - performance.now()
     - 需较新浏览器（如 IE10+、现代浏览器），在 Web Worker 中可用，但精度可能因浏览器策略（如防安全漏洞）受限。
5. 返回值示例
    ```javascript
      console.log(Date.now());        // 输出类似 1625097600000（整数，毫秒）
      console.log(performance.now()); // 输出类似 1234.567（浮点数，微秒级）
    ```
6. 抗干扰性
   - Date.now() 受系统时间变化影响，若时钟回拨可能导致负时间差。

   - performance.now() 单调递增，确保时间差始终非负。

> 何时选择？

  - 用 Date.now()：
    - 需要记录事件发生的绝对时间（如日志、数据存储）。
  - 用 performance.now()：
    - 需要精确测量代码性能、动画循环耗时等短期时间间隔，且要求结果不受系统时间干扰。
> 示例对比

```javascript
// 使用 Date.now() 可能受系统时间影响
const dateStart = Date.now();
doTask();
const dateEnd = Date.now();
console.log(`Date 耗时：${dateEnd - dateStart}ms`); // 可能不准（如系统时间被调整）

// 使用 performance.now() 更可靠
const perfStart = performance.now();
doTask();
const perfEnd = performance.now();
console.log(`Performance 耗时：${perfEnd - perfStart}ms`); // 高精度且稳定
```
| 总结      | Date.now()  | 	performance.now() |
|---------|-------------|--------------------|
| 时间起点	   | UNIX 纪元     | 	页面导航/Worker 初始化   |
| 精度      | 	毫秒（整数）	    | 微秒（浮点数，可能受浏览器限制）   |
| 抗系统时间干扰 | ❌ 受系统时间调整影响 | ✅ 单调递增，不受影响        |
| 典型用途	   | 记录绝对时间      | 	测量高精度时间间隔         |

