---
outline: deep
---
# 面试题

## 浏览器

### V8引擎的原理

:::details
V8引擎是Google开发的开源JavaScript引擎，主要用于Chrome浏览器和Node.js。它通过将JavaScript代码编译为机器码来提高执行速度，并使用即时编译（JIT）技术来优化性能。

- V8引擎将JavaScript代码转换为机器码，以便更快地执行。
- 它使用了多种优化技术，如内联缓存和逃逸分析，以提高性能。
- V8还支持垃圾回收机制，自动管理内存，减少内存泄露的风险。

:::

### 也没有了解过热点代码

:::details
热点代码是指在程序执行过程中频繁被调用的代码段。V8引擎会优先优化这些代码，以提高整体性能。

- 热点代码通常是性能瓶颈，优化这些代码可以显著提高应用的响应速度。
- V8引擎会监测代码的执行频率，并对热点代码进行优化处理。
- 通过即时编译，V8能够在运行时对热点代码进行优化，提升执行效率。

:::

## 网络

### http1.0与http2.0的区别

:::details
HTTP/1.0是无状态的，每个请求都需要建立新的连接，而HTTP/2.0支持多路复用，可以在一个连接上同时处理多个请求，从而减少延迟。

- HTTP/1.0每次请求都需要重新建立TCP连接，增加了延迟。
- HTTP/2.0通过多路复用技术，允许多个请求共享同一个连接，减少了连接建立的开销。
- HTTP/2.0还支持头部压缩，进一步减少了数据传输的大小，提高了传输效率。

:::

### http三次握手四次挥手的过程

:::details
三次握手：客户端发送SYN，服务器回应SYN-ACK，客户端再发送ACK。四次挥手：客户端发送FIN，服务器回应ACK，服务器发送FIN，客户端再回应ACK。

- 三次握手的目的是为了建立可靠的TCP连接，确保双方都准备好进行数据传输。
- 四次挥手的过程用于安全地关闭连接，确保所有数据都已传输完毕。
- 这种机制保证了数据的完整性和可靠性。

:::

## javaScript

### Truthy、Falsy与true、false的区别

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

### 错误捕捉的方式

### reflect有几个参数

:::details
Reflect对象的方法通常接受两个或三个参数，具体取决于方法。

- Reflect.apply(target, thisArgument, argumentsList)用于调用函数。
- Reflect.get(target, propertyKey, receiver)用于获取对象属性。
- Reflect.set(target, propertyKey, value, receiver)用于设置对象属性。

:::
:::details
JavaScript中可以使用try...catch语句来捕捉错误，try块中放置可能抛出错误的代码，catch块中处理错误。

- 使用try块包裹可能出错的代码，可以防止程序崩溃。
- catch块可以捕获错误并执行相应的处理逻辑，如记录错误信息或提示用户。
- 还可以使用finally块来执行无论是否发生错误都需要执行的代码，如清理资源。

:::

### 内存泄露怎么解决

:::details
内存泄露可以通过及时释放不再使用的对象、避免全局变量、使用WeakMap和WeakSet等方式来解决。

- 定期检查和清理不再使用的对象，确保它们可以被垃圾回收。
- 避免使用全局变量，尽量将变量的作用域限制在必要的范围内。
- 使用WeakMap和WeakSet可以防止内存泄露，因为它们对对象的引用是弱引用，允许垃圾回收。

:::

### new 的实现原理

:::details
`new`操作符会创建一个新对象，设置其原型为构造函数的prototype，并执行构造函数，最后返回新对象。

- `new`操作符的第一步是创建一个空对象。
- 然后将新对象的原型指向构造函数的prototype。
- 接着执行构造函数，并将`this`指向新对象。
- 最后返回新对象，或者如果构造函数返回的是对象，则返回该对象。

:::

### apply bind和call的区别

:::details
`apply`和`call`都用于改变函数的上下文，`apply`接受一个数组作为参数，而`call`接受多个参数。`bind`返回一个新的函数，绑定了特定的上下文。

- `apply`适用于需要传入参数数组的情况，特别是在参数数量不确定时。
- `call`适用于已知参数数量的情况，可以直接传入参数。
- `bind`创建一个新函数，允许在稍后调用时指定`this`的值和初始参数。

:::

### bind中返回的函数中做什么

:::details
`bind`返回的函数可以在调用时传入参数，这些参数会被预先绑定到原函数的参数上。

- 通过`bind`，可以创建一个新的函数，固定某些参数，简化后续调用。
- 这种方式常用于事件处理和回调函数中，确保`this`指向正确。
- 还可以在返回的函数中添加额外的参数，进一步增强灵活性。

:::

### 原型与原型链

:::details
原型是对象的一个属性，指向另一个对象，原型链是由多个对象的原型组成的链条，用于实现继承。

- 每个JavaScript对象都有一个原型，可以通过`__proto__`访问。
- 原型链允许对象访问其原型及其原型的原型，形成一个链条。
- 这种机制使得JavaScript能够实现继承和共享属性/方法。

:::

### 作用域和作用域链

:::details
作用域是变量的可访问范围，作用域链是由多个作用域组成的链条，用于查找变量。

- 作用域分为全局作用域和局部作用域，局部作用域可以嵌套。
- 当访问变量时，JavaScript会从当前作用域开始查找，直到找到为止。
- 如果在所有作用域中都找不到变量，则会抛出错误。

:::

### 垃圾回收机制的方法

:::details
JavaScript使用标记清除和引用计数等垃圾回收机制来自动管理内存。

- 标记清除：垃圾回收器会标记所有可达的对象，然后清除未被标记的对象。
- 引用计数：通过跟踪对象的引用数量来判断对象是否可以被回收。
- 现代JavaScript引擎通常使用标记清除作为主要的垃圾回收策略。

:::

### 引用计数的弊端

:::details
引用计数的弊端在于无法处理循环引用的情况，导致内存泄露。

- 当两个对象相互引用时，即使它们不再被使用，引用计数也不会降为零。
- 这会导致内存无法被回收，造成内存泄露。
- 现代JavaScript引擎通常结合使用标记清除来解决这个问题。

:::

### 闭包

:::details
闭包是指一个函数可以访问其外部作用域的变量，即使外部函数已经返回。

- 闭包允许函数保持对其外部变量的引用，形成一个持久的作用域。
- 这在实现私有变量和封装时非常有用。
- 闭包也可以用于创建工厂函数和回调函数。

:::

### array set weakSet的区别

:::details
Array是有序的集合，Set是无序的唯一值集合，WeakSet只允许对象作为成员，并且对其不保持强引用。

- Array支持索引访问，适合存储有序数据。
- Set用于存储唯一值，避免重复，支持快速查找。
- WeakSet的成员是弱引用，允许垃圾回收，适合存储临时对象。

:::

### map weakMap的区别

:::details
Map是键值对集合，WeakMap的键必须是对象，并且对其不保持强引用，防止内存泄露。

- Map支持任意类型的键，适合存储复杂数据结构。
- WeakMap的键是弱引用，适合存储与DOM元素相关的数据，避免内存泄露。
- WeakMap不支持遍历，适合用于私有数据存储。

:::

## vue

### 滥用vuex会引起哪些问题

:::details
滥用Vuex可能导致状态管理复杂、组件间耦合度高、调试困难等问题。

- 过度使用Vuex会使得状态管理变得复杂，增加维护成本。
- 组件之间的耦合度提高，导致代码难以重用和测试。
- 调试时难以追踪状态变化，增加了开发的复杂性。

:::

### vue-router的实现原理

:::details
Vue Router通过动态路由匹配和组件渲染来实现单页面应用的路由管理。

- 它使用Vue的响应式系统来管理路由状态。
- 路由配置可以通过嵌套路由实现复杂的页面结构。
- Vue Router支持路由守卫，允许在路由切换前进行权限验证。

:::

### vue2与vue3的响应式原理

:::details
Vue2使用Object.defineProperty实现响应式，Vue3使用Proxy实现更灵活的响应式。

- Vue2的响应式系统在数据变化时会触发getter和setter，性能较低。
- Vue3的Proxy可以直接拦截对象的操作，性能更高，支持更多数据类型。
- Vue3的响应式系统支持更复杂的场景，如数组和对象的嵌套。

:::

### v-model的原理

:::details
v-model通过双向数据绑定实现视图与数据的同步，底层使用了watcher和getter/setter。

- v-model在表单元素上使用时，自动绑定输入值和数据模型。
- 当用户输入时，数据模型会更新，反之亦然。
- 这种机制简化了表单处理，提升了开发效率。

:::

### this的指向（vue2/vue3）

:::details
在Vue2中，`this`指向Vue实例；在Vue3中，使用Composition API时，`this`的指向更灵活，通常不再依赖于`this`。

- Vue2中，`this`用于访问组件的属性和方法。
- Vue3中，Composition API通过setup函数提供了更清晰的上下文管理。
- 这种变化使得代码更易于理解和维护。

:::

## react

### 说一下fiber的特点

:::details
Fiber是React的协调算法，允许中断和恢复渲染过程，提高了应用的响应性和性能。

- Fiber通过将渲染任务分割成小块，允许React在渲染过程中进行优先级调度。
- 这种机制使得React能够在高优先级任务（如用户输入）和低优先级任务（如更新）之间进行切换。
- Fiber还支持时间切片，进一步提升了用户体验。

:::

## 代码规范

### api的二次封装怎么实现

:::details
API的二次封装可以通过创建一个新的函数或类，封装原有API的调用逻辑，提供更简洁的接口。

- 通过封装，可以隐藏复杂的实现细节，简化调用方式。
- 封装还可以添加错误处理和数据转换等功能，提高代码的可维护性。
- 这种方式使得API的使用更加一致和易于理解。

:::

## TypeScript

### ts类型校验

:::details
TypeScript通过静态类型检查来确保代码的类型安全，支持基本类型、接口、泛型等。

- TypeScript允许开发者在编写代码时定义变量的类型，减少运行时错误。
- 接口和类型别名可以用于定义复杂的数据结构，提高代码的可读性。
- 泛型使得函数和类可以处理多种类型，增强了代码的灵活性。

:::

## 性能

### 怎么判断首页有没有白屏

:::details
可以通过监测页面的加载时间和DOMContentLoaded事件，判断是否存在白屏现象。

- 白屏现象通常指用户在页面加载时看到的空白状态，影响用户体验。
- 通过监测`window.performance` API，可以获取页面加载的详细信息。
- 还可以使用`DOMContentLoaded`事件来判断页面是否已完成初步渲染。

:::

### 防抖节流的区别和使用场景

:::details
防抖是指在事件触发后延迟执行，适用于输入框搜索等场景；节流是指限制事件的执行频率，适用于滚动、resize等场景。

- 防抖：在用户停止输入后再执行操作，避免频繁触发。
- 节流：在一定时间内只允许执行一次操作，减少资源消耗。
- 选择合适的策略可以提升应用性能和用户体验。

:::

### 响应式变成的优缺点

:::details
响应式编程的优点是简化数据管理和提高代码可读性，缺点是可能导致性能问题和调试困难。

- 优点：数据变化时自动更新视图，减少手动操作，提高开发效率。
- 缺点：复杂的响应式系统可能导致性能下降，尤其是在大数据量时。
- 调试时，响应式数据流可能难以追踪，增加了开发的复杂性。

:::

## 服务端

### cros跨域cookie和session失效解决方案

::: details
:::code-group

```js [适用于 express koa egg]
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))
```

```js [前端]
this.$http.get('getlogin',{ credentials: true }).then(res => {
    console.log(res)
})

this.$http.post('postlogin',{userInfo: $('.form-signin').serialize()},{
   credentials: true 
}).then(res => {
    console.log(res)
    if(res.body.status != 200) {
        console.log('登录失败')
    }else {
        console.log('登录成功')
    }
})
```

```js [原生]
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.xxx.com/api');
xhr.withCredentials = true;
xhr.onload = onLoadHandler;
xhr.send()
```

```js [Jquery]
$.ajax({
    url: "http://localhost:8080/orders",
    type: "GET",
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    success: function (data) {
        render(data);
    }
 });
```

```js [axios]
const service = axios.create({
  //设置默认请求头，使post请求发送的是formData格式数据
  // axios的header默认的Content-Type好像是'application/json;charset=UTF-8'可以用这种方式修改
  headers: {  
    "Content-Type": "application/x-www-form-urlencoded"
  },
  withCredentials: true // 允许携带cookie
})
```

:::
