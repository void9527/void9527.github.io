---
outline: 1, 2
---

## 操作符

### keyof 获取对象类型所有属性名称

```ts
type Point = { x: number; y: number };

type P = keyof Point;
// "x" | "y"
```

### typeof 获取变量的类型

```ts
function foo() {
  return {
    a: 1,
    b: 2,
  };
}

type TFoo = typeof foo;
//  TFoo = () => {   a: number   b: number }
```

### extends 判断类型是否兼容

```ts
type T1 = 1 extends number ? true : false; // true
```

- 接口继承

```ts
interface A {
  a: number;
}

interface B extends A {
  b: string;
}
// { a: number; b: string }
```

- 泛型继承

```ts
type T1<T> = T extends string ? true : false;
// T1<string> = true
// T1<number> = false 
```

## 类型工具

### ReturnType

> 获取函数返回值类型

```ts
function foo() {
  return {
    a: 1,
    b: 2,
  };
}

type TFooReturn = ReturnType<typeof foo>;
//  TFooReturn = {   a: number   b: number }
```
