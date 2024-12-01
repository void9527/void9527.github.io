---
outline: deep
---

# 问题

## any、unknown、never、void、null、undefined 的区别

::: details

**1. `any`**

- **用途**: 表示任意类型。使用 `any` 类型的变量可以赋值为任何类型的值。
- **特性**: 关闭了类型检查，使用 `any` 会失去 TypeScript 的类型安全优势。
- **示例**:

  ```typescript
  let anything: any = 42;
  anything = "Hello";
  anything = true;
  ```

**2. `unknown`**

- **用途**: 表示未知类型。与 `any` 类似，但更安全，因为在使用 `unknown` 类型的值之前必须进行类型检查。
- **特性**: 需要类型断言或类型检查后才能使用。
- **示例**:

  ```typescript
  let notSure: unknown = 4;
  if (typeof notSure === "number") {
    let num: number = notSure; // 类型检查后可以安全使用
  }
  ```

**3. `never`**

- **用途**: 表示永远不会发生的类型。通常用于函数中表示不会返回值（如抛出异常或无限循环）。
- **特性**: 是所有类型的子类型，不能被任何类型赋值。
- **示例**:

  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

**4. `void`**

- **用途**: 表示没有任何类型。通常用于函数返回值，表示函数没有返回值。
- **特性**: 与 `undefined` 类似，但更常用于函数返回类型。
- **示例**:

  ```typescript
  function logMessage(message: string): void {
    console.log(message);
  }
  ```

**5. `null`**

- **用途**: 表示空值。可以赋值给 `null` 类型的变量。
- **特性**: 在严格模式下，`null` 不是其他类型的子类型。
- **示例**:

  ```typescript
  let empty: null = null;
  ```

**6. `undefined`**

- **用途**: 表示未定义的值。通常用于变量未初始化或函数没有返回值时。
- **特性**: 在严格模式下，`undefined` 不是其他类型的子类型。
- **示例**:

  ```typescript
  let notAssigned: undefined = undefined;
  ```

**总结**

- **`any`**: 关闭类型检查，允许任何类型。
- **`unknown`**: 未知类型，需要类型检查后使用。
- **`never`**: 永远不会发生的类型，通常用于异常或无限循环。
- **`void`**: 没有返回值的函数类型。
- **`null`**: 表示空值。
- **`undefined`**: 表示未定义的值。
:::

## interface 和 type 的区别

::: details

**1. 定义方式**

- **`interface`**: 专门用于定义对象的结构，可以通过 `interface` 关键字来定义。
  
  ```typescript
  interface User {
    name: string;
    age: number;
  }
  ```

- **`type`**: 可以定义任何类型，包括基本类型、联合类型、交叉类型等。使用 `type` 关键字来定义。

  ```typescript
  type User = {
    name: string;
    age: number;
  };
  ```

**2. 扩展和合并**

- **`interface`**: 支持声明合并，可以通过多次声明同一个接口名来合并属性。

  ```typescript
  interface User {
    name: string;
  }

  interface User {
    age: number;
  }

  // 合并后 User 包含 name 和 age
  ```

- **`type`**: 不支持声明合并，但可以通过交叉类型（`&`）来扩展。

  ```typescript
  type Name = { name: string };
  type Age = { age: number };

  type User = Name & Age; // 交叉类型
  ```

**3. 使用场景**

- **`interface`**: 更适合用于定义对象的形状，特别是在需要扩展和合并的场景下。
- **`type`**: 更灵活，可以用于定义联合类型、交叉类型、基本类型别名等。

**4. 其他特性**

- **`interface`**: 可以被类实现（`implements`），用于定义类的结构。
- **`type`**: 可以定义联合类型和交叉类型，提供更复杂的类型组合。

**总结**

- **`interface`**: 适合用于定义对象的结构，支持声明合并和类实现。
- **`type`**: 更灵活，适合定义复杂类型组合，如联合类型和交叉类型。

:::

## interface 给 Function、Array、Class 做类型声明

::: details

**1. Function 类型声明**

- **定义方式**: 使用 `interface` 来定义函数的参数和返回值类型。

  ```typescript
  interface GreetFunction {
    (name: string): string;
  }

  const greet: GreetFunction = (name) => `Hello, ${name}`;
  ```

**2. Array 类型声明**

- **定义方式**: 使用 `interface` 来定义数组的元素类型。

  ```typescript
  interface StringArray {
    [index: number]: string;
  }

  const myArray: StringArray = ["Hello", "World"];
  ```

**3. Class 类型声明**

- **定义方式**: 使用 `interface` 来定义类的结构，包括属性和方法。

  ```typescript
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
      this.currentTime = d;
    }
  }
  ```

:::

## 类型的全局声明与局部声明

::: details

**全局声明**

- **用途**: 全局声明用于在整个项目中共享类型定义。通常在 `.d.ts` 文件中进行全局声明。
- **示例**:

  ```typescript
  // global.d.ts
  declare global {
    interface Window {
      myCustomProperty: string;
    }
  }
  ```

**局部声明**

- **用途**: 局部声明用于在特定模块或文件中定义类型，限制其作用范围。
- **示例**:

  ```typescript
  // local.ts
  interface LocalType {
    property: number;
  }

  const localVariable: LocalType = { property: 42 };
  ```

**总结**

- **全局声明**: 适用于需要在多个模块中共享的类型定义。
- **局部声明**: 适用于仅在特定模块中使用的类型定义，避免污染全局命名空间。

:::

## declare、declare global 的区别

::: details

**1. `declare`**

- **用途**: 用于声明一个变量、函数、类或模块的类型信息，而不提供具体实现。通常用于为外部库或模块提供类型定义。
- **示例**:

  ```typescript
  declare function myFunction(param: string): void;
  ```

**2. `declare global`**

- **用途**: 用于在全局范围内声明类型信息，通常在 `.d.ts` 文件中使用，以便在整个项目中共享类型定义。
- **示例**:

  ```typescript
  declare global {
    interface Window {
      myCustomProperty: string;
    }
  }
  ```

**总结**

- **`declare`**: 用于声明局部或模块内的类型信息。
- **`declare global`**: 用于声明全局范围的类型信息，适用于需要在多个模块中共享的类型定义。

:::

## TS 类中成员的 public、private、protected、readonly 修饰符的区别

::: details

**1. `public`**

- **用途**: 默认修饰符，表示成员可以在任何地方访问。
- **示例**:

  ```typescript
  class Animal {
    public name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const dog = new Animal("Dog");
  console.log(dog.name); // 访问 public 成员
  ```

**2. `private`**

- **用途**: 表示成员只能在类内部访问，不能在类的外部访问。
- **示例**:

  ```typescript
  class Animal {
    private age: number;
    constructor(age: number) {
      this.age = age;
    }
  }

  const cat = new Animal(3);
  // console.log(cat.age); // 错误: 'age' 是私有的
  ```

**3. `protected`**

- **用途**: 表示成员可以在类内部及其子类中访问，但不能在类的外部访问。
- **示例**:

  ```typescript
  class Animal {
    protected sound: string;
    constructor(sound: string) {
      this.sound = sound;
    }
  }

  class Dog extends Animal {
    public makeSound() {
      console.log(this.sound); // 访问 protected 成员
    }
  }

  const dog = new Dog("Bark");
  dog.makeSound();
  // console.log(dog.sound); // 错误: 'sound' 是受保护的
  ```

**4. `readonly`**

- **用途**: 表示成员只能在初始化时或在构造函数中赋值，之后不能修改。
- **示例**:

  ```typescript
  class Animal {
    readonly species: string;
    constructor(species: string) {
      this.species = species;
    }
  }

  const bird = new Animal("Bird");
  // bird.species = "Eagle"; // 错误: 'species' 是只读的
  ```

**总结**

- **`public`**: 成员可以在任何地方访问。
- **`private`**: 成员只能在类内部访问。
- **`protected`**: 成员可以在类内部及其子类中访问。
- **`readonly`**: 成员只能在初始化时赋值，之后不能修改。

:::

## keyof 与 typeof 的作用

::: details

**1. `keyof`**

- **用途**: `keyof` 操作符用于获取某个类型的所有键，并将这些键组成一个联合类型。
- **示例**:

  ```typescript
  interface Person {
    name: string;
    age: number;
  }

  type PersonKeys = keyof Person; // "name" | "age"
  ```

  在这个例子中，`PersonKeys` 是一个联合类型，包含 `Person` 接口的所有键。

**2. `typeof`**

- **用途**: `typeof` 操作符用于获取一个变量或表达式的类型。常用于类型推断和类型声明。
- **示例**:

  ```typescript
  let myString = "Hello, World!";
  type MyStringType = typeof myString; // string

  const myObject = { x: 10, y: 20 };
  type MyObjectType = typeof myObject; // { x: number; y: number; }
  ```

  在这个例子中，`typeof myString` 返回 `string` 类型，而 `typeof myObject` 返回对象的类型结构。

**总结**

- **`keyof`**: 用于获取类型的所有键，返回一个联合类型。
- **`typeof`**: 用于获取变量或表达式的类型，常用于类型推断。

:::
