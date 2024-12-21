---
outline: deep
---

## 交叉类型 & 转 联合类型

:::details

```ts
// 定义两个接口
type A = { a: string };
type B = { b: number };

// 交叉类型
type Intersection = A & B;

// 将交叉类型转换为联合类型
type Union = keyof Intersection extends infer K ? K extends keyof A ? A : B : never;

// 测试
const test: Union = { b: 1 }; // 可以是 { a: 'string' } 或 { b: number }
```

:::

## 联合类型转换交叉类型

:::details

```ts
// 定义两个类型
type A = { a: string };
type B = { b: number };

// 联合类型
type Union = A | B;

// 将联合类型转换为交叉类型
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// 测试
type Intersection = UnionToIntersection<Union>;

// 验证
const test: Intersection = { a: 'hello', b: 42 }; // 必须同时包含 a 和 b
```

:::

## 柯里化函数泛型定义

:::details

```ts
type Curried<T extends any[], R> = T extends []
  ? () => R
  : T extends [infer F, ...infer Rest]
  ? (arg: F) => Curried<Rest, R>
  : never;

// 测试
declare function curry<T extends any[], R>(fn: (...args: T) => R): Curried<T, R>;
```

:::

## 指定约束类型

:::details

```ts
type BadNumber<T, U> = T extends U ? never : T

function noNumberType<T>(num: BadNumber<T, number>): void {
  console.log(num)
}

noNumberType('12')
```

:::
