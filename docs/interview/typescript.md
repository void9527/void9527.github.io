---
outline: deep
---

## ts类型校验

:::details
TypeScript是一种静态类型的编程语言，提供了类型系统来增强JavaScript的功能。类型校验是TypeScript的核心特性之一，旨在在编译时捕获错误，提升代码的可维护性和可读性。以下是TypeScript类型校验的一些关键点：

1. 基本数据类型

    TypeScript支持多种基本数据类型，包括：

    - **number**：表示数字类型。
    - **string**：表示字符串类型。
    - **boolean**：表示布尔类型。
    - **null**和**undefined**：分别表示空值和未定义。
    - **any**：表示任意类型，关闭类型检查。
    - **void**：表示没有返回值的函数类型。

2. 接口（Interface）

    接口用于定义对象的结构，可以指定对象的属性和方法。接口可以被类实现，也可以用于类型检查。

    - 示例：

    ```typescript
    interface User {
        name: string;
        age: number;
    }

    const user: User = {
        name: 'Alice',
        age: 30,
    };
    ```

3. 类型别名（Type Alias）

    类型别名用于给类型定义一个新名称，可以用于基本类型、联合类型、元组等。

    - 示例：

    ```typescript
    type StringOrNumber = string | number;

    const value: StringOrNumber = 'Hello';
    ```

4. 联合类型（Union Types）

    联合类型允许一个变量可以是多种类型之一，使用`|`符号表示。

    - 示例：

    ```typescript
    function printId(id: number | string) {
        console.log(`Your ID is: ${id}`);
    } 
    ```

5. 泛型（Generics）

    泛型允许在定义函数、类或接口时不指定具体类型，而是使用类型参数，提供更灵活的类型检查。

    - 示例：

    ```typescript
    function identity<T>(arg: T): T {
        return arg;
    }

    const output = identity<string>('Hello');
    ```

6. 类型推导

    TypeScript能够根据变量的初始值自动推导类型，减少了手动指定类型的工作量。

    - 示例：

    ```typescript
    let count = 10; // TypeScript推导count为number类型
    ```

7. 类型保护

    类型保护是指在运行时检查变量的类型，以确保在使用变量之前进行类型安全的操作。

    - 示例：

    ```typescript
    function logValue(value: string | number) {
        if (typeof value === 'string') {
            console.log(`String value: ${value}`);
        } else {
            console.log(`Number value: ${value}`);
        }
    }
    ```

8. 类型断言

    类型断言用于告诉编译器某个值的具体类型，使用`as`关键字或尖括号语法。

    - 示例：

    ```typescript
    let someValue: any = 'Hello';
    let strLength: number = (someValue as string).length;
    ```

- TypeScript的类型校验通过静态类型检查、接口、类型别名、联合类型、泛型等特性，提供了强大的类型系统，帮助开发者在编写代码时捕获潜在的错误，提升代码的可维护性和可读性。通过合理使用类型系统，开发者可以构建更健壮的应用程序。

:::

## type与interface的区别和特点

:::details
在TypeScript中，`type`和`interface`都是用于定义类型的工具，但它们在使用方式和功能上有一些区别。以下是它们的主要区别和特点：

1. 定义方式

    - **interface**：
    - 用于定义对象的结构，包括属性和方法。
    - 可以通过`extends`关键字进行继承，支持多重继承。
    - 示例：

        ```typescript
        interface Person {
            name: string;
            age: number;
        }

        interface Employee extends Person {
            employeeId: number;
        }
        ```

    - **type**：
    - 用于定义任意类型，包括基本类型、联合类型、元组等。
    - 可以使用`&`符号进行交叉类型定义。
    - 示例：

        ```typescript
        type StringOrNumber = string | number;

        type User = {
            name: string;
            age: number;
        } & {
            email: string;
        };
        ```

2. 扩展与合并

    - **interface**：
    - 支持声明合并（declaration merging），同名的接口会自动合并。
    - 示例：

        ```typescript
        interface User {
            name: string;
        }

        interface User {
            age: number;
        }

        const user: User = {
            name: 'Alice',
            age: 30,
        };
        ```

    - **type**：
    - 不支持声明合并，若定义同名的类型会导致错误。
    - 示例：

        ```typescript
        type User = {
            name: string;
        };

        // 下面的定义会导致错误
        // type User = {
        //   age: number;
        // };
        ```

3. 适用场景
   - **interface**：
     - 更适合用于定义对象的结构和类的类型。
     - 由于支持继承和合并，适合用于大型项目中的类型定义。

   - **type**：
     - 更灵活，适合用于定义复杂类型，合类型、交叉类型等。
     - 适合用于简单的类型定义和类型别名。

4. 其他区别
   - **类型推导**：`type`可以用于定义函数类型、元组等，而`interface`主要用于对象类型。
   - **性能**：在某些情况下，`interface`的性能可能更优，因为TypeScript在编译时对接口的处理进行了优化。

- `type`和`interface`各有优缺点，选择使用哪一个取决于具体的需求和场景。一般来说，若需要定义对象的结构和支持继承，使用`interface`；若需要定义复杂类型或简单的类型别名，使用`type`。在实际开发中，合理结合使用这两者可以提高代码的可读性和可维护性。

:::

## d.ts 文件的作用

:::details
在TypeScript中，`.d.ts`文件是声明文件，用于为JavaScript代码提供类型信息。它们的主要作用包括：

1. 类型声明
   - **提供类型信息**：`.d.ts`文件用于为现有的JavaScript库或模块提供类型声明，使得TypeScript能够理解这些库的结构和类型。
   - **示例**：

     ```typescript
     // myLibrary.d.ts
     declare module 'myLibrary' {
       export function myFunction(param: string): number;
     }
     ```

2. 兼容性
   - **与JavaScript库兼容**：通过使用`.d.ts`文件，TypeScript可以与现有的JavaScript库无缝集成，允许开发者在使用这些库时获得类型检查和自动补全的功能。
   - **示例**：使用第三方库时，通常会有相应的类型声明文件，开发者可以直接使用这些库而无需修改其源代码。

3. 提高代码可读性
   - **增强代码文档**：`.d.ts`文件提供了清晰的类型信息，帮助开发者理解函数、类和模块的用法，提高代码的可读性和可维护性。
   - **示例**：在大型项目中，使用类型声明可以使得团队成员更容易理解代码的结构和预期的输入输出。

4. 支持类型推导
   - **类型推导**：通过在`.d.ts`文件中定义类型，TypeScript能够在使用这些类型时进行推导，减少了手动指定类型的工作量。
   - **示例**：当使用一个库时，TypeScript会根据`.d.ts`文件中的声明自动推导出类型。

5. 代码分离
   - **分离类型与实现**：`.d.ts`文件允许将类型声明与实际实现分离，使得代码结构更加清晰。开发者可以在不查看实现的情况下了解类型信息。
   - **示例**：在大型项目中，类型声明文件可以单独维护，便于管理和更新。

6. 适用于全局类型
   - **全局类型声明**：`.d.ts`文件可以用于声明全局变量和类型，使得在整个项目中都可以访问这些类型。
   - **示例**：

     ```typescript
     // global.d.ts
     declare var myGlobalVar: string;
     ```

- `.d.ts`文件在TypeScript中扮演着重要的角色，通过提供类型声明、增强代码可读性、支持类型推导等功能，使得TypeScript能够更好地与JavaScript代码和库集成，提高开发效率和代码质量。

:::

## 泛型的理解与应用场景

:::details
泛型是TypeScript的一项强大特性，允许开发者在定义函数、类或接口时不指定具体类型，而是使用类型参数。泛型提供了更灵活的类型检查，能够在编写代码时捕获潜在的类型错误。以下是对泛型的理解及其应用场景的详细说明。

1. 泛型的理解
   - **类型参数**：泛型使用类型参数（通常用`<T>`表示）来表示可以接受的类型。开发者在调用泛型函数或类时，可以传入具体的类型。
   - **类型安全**：泛型提供了类型安全，确保在使用时类型的一致性，避免了使用`any`类型带来的潜在错误。
   - **灵活性**：泛型使得函数和类可以处理多种类型，提升了代码的复用性。

2. 泛型的基本用法
   - **泛型函数**：定义一个接受泛型参数的函数。

     ```typescript
     function identity<T>(arg: T): T {
       return arg;
     }

     const output1 = identity<string>('Hello');
     const output2 = identity<number>(42);
     ```

   - **泛型接口**：定义一个泛型接口，描述具有泛型属性的对象。

     ```typescript
     interface GenericIdentityFn<T> {
       (arg: T): T;
     }

     const myIdentity: GenericIdentityFn<number> = identity;
     ```

   - **泛型类**：定义一个泛型类，允许在实例化时指定类型。

     ```typescript
     class GenericBox<T> {
       private value: T;

       constructor(value: T) {
         this.value = value;
       }

       getValue(): T {
         return this.value;
       }
     }

     const box = new GenericBox<string>('Hello');
     ```

3. 应用场景

    - **数据结构**：泛型在实现数据结构（如栈、队列、链表等）时非常有用，可以使得这些数据结构能够处理多种类型的数据。

    ```typescript
    class Stack<T> {
        private items: T[] = [];

        push(item: T) {
        this.items.push(item);
        }

        pop(): T | undefined {
        return this.items.pop();
        }
    }
    ```

    - **API请求**：在处理API请求时，泛型可以用于定义请求和响应的类型，确保数据的一致性。

    ```typescript
    async function fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return response.json();
    }

    interface User {
        id: number;
        name: string;
    }

    fetchData<User>('https://api.example.com/user/1').then(user => {
        console.log(user.name);
    });
    ```

    - **表单处理**：在表单处理时，泛型可以用于定义表单数据的类型，确保表单的输入输出类型安全。

    ```typescript
    function handleFormSubmit<T>(data: T): void {
        console.log(data);
    }

    handleFormSubmit<{ name: string; age: number }>({ name: 'Alice', age: 30 });
    ```

    - **高阶函数**：泛型可以用于定义高阶函数，使得函数能够接受和返回不同类型的函数。

    ```typescript
    function createLogger<T>(prefix: string) {
        return (value: T) => {
        console.log(`${prefix}: ${value}`);
        };
    }

    const numberLogger = createLogger<number>('Number');
    numberLogger(42);
    ```

- 泛型是TypeScript中非常重要的特性，提供了灵活性和类型安全。通过合理使用泛型，开发者可以编写出更具可复用性和可维护性的代码，适用于多种场景，如数据结构、API请求、表单处理等。理解和应用泛型将大大提升TypeScript项目的质量和开发效率。

:::

## 高级类型的理解与应用

:::details
TypeScript中的高级类型是指一些复杂的类型构造，允许开发者创建更灵活和强大的类型系统。高级类型使用TypeScript能够处理更复杂的类型关系，提升代码的可读性和可维护性。以下是对高级类型的理解及其主要类型的详细说明。

1. 交叉类型（Intersection Types）

    - **定义**：交叉类型允许将多个类型合并为一个类型，表示一个对象同时具有多个类型的特性。
    - **示例**：

    ```typescript
    interface Person {
        name: string;
    }

    interface Employee {
        employeeId: number;
    }

    type EmployeePerson = Person & Employee;

    const employee: EmployeePerson = {
        name: 'Alice',
        employeeId: 123,
    };
    ```

2. 联合类型（Union Types）

   - **定义**：联合类型允许一个变量可以是多种类型之一，使用`|`符号表示。
   - **示例**：

     ```typescript
     function printId(id: number | string) {
       console.log(`Your ID is: ${id}`);
     }

     printId(101);
     printId('202');
     ```

3. 类型保护（Type Guards）

    - **定义**：类型保护是指在运行时检查变量的类型，以确保在使用变量之前进行类型安全的操作。
    - **示例**：

    ```typescript
    function logValue(value: string | number) {
        if (typeof value === 'string') {
        console.log(`String value: ${value}`);
        } else {
        console.log(`Number value: ${value}`);
        }
    }
    ```

4. 映射类型（Mapped Types）

    - **定义**：映射类型允许根据已有类型创建新类型，通常用于对对象的属性进行变换。
    - **示例**：

    ```typescript
    type Person = {
        name: string;
        age: number;
    };

    type ReadonlyPerson = {
        readonly [K in keyof Person]: Person[K];
    };

    const person: ReadonlyPerson = {
        name: 'Alice',
        age: 30,
    };

    // person.age = 31; // 错误：不能修改只读属性
    ```

5. 条件类型（Conditional Types）

    - **定义**：条件类型根据条件表达式的结果选择类型，使用`T extends U ? X : Y`的语法。
    - **示例**：

    ```typescript
    type IsString<T> = T extends string ? 'Yes' : 'No';

    type Test1 = IsString<string>; // 'Yes'
    type Test2 = IsString<number>; // 'No'
    ```

6. 索引类型（Index Types）

    - **定义**：索引类型允许通过键访问对象的类型，使用`T[K]`的语法。
    - **示例**：

    ```typescript
    interface Person {
        name: string;
        age: number;
    }

    type PersonKeys = keyof Person; // 'name' | 'age'
    type PersonValues = Person[PersonKeys]; // string | number
    ```

7. 函数类型

    - **定义**：函数类型允许定义函数的参数和返回值类型。
    - **示例**：

    ```typescript
    type Add = (a: number, b: number) => number;

    const add: Add = (x, y) => x + y;
    ```

8. 元组类型（Tuple Types）

    - **定义**：元组类型允许定义固定长度和类型的数组。
    - **示例**：

    ```typescript
    type Point = [number, number];

    const point: Point = [10, 20];
    ```

- TypeScript中的高级类型提供了强大的类型系统，允许开发者创建灵活且类型安全的代码。通过合理使用交叉类型、联合类型、映射类型、条件类型等高级类型，开发者可以构建更复杂和可维护的应用程序。理解和应用这些高级类型将大大提升TypeScript项目的质量和开发效率。

:::

## TypeScript 中命名空间与模块的理解与区别

:::details
在TypeScript中，命名空间和模块都是用于组织代码和管理作用域的机制，但它们在使用方式和目的上有所不同。以下是对命名空间和模块的理解及其主要区别的详细说明。

1. 命名空间（Namespace）
   - **定义**：命名空间是TypeScript中用于将相关的代码组织在一起的方式，通常用于将变量、函数、类等封装在一个命名的作用域中，以避免全局命名冲突。
   - **使用方式**：命名空间使用`namespace`关键字定义，通常在同一个文件中使用。
   - **示例**：

     ```typescript
     namespace Geometry {
       export class Circle {
         constructor(public radius: number) {}
         area() {
           return Math.PI * this.radius ** 2;
         }
       }

       export class Square {
         constructor(public side: number) {}
         area() {
           return this.side ** 2;
         }
       }
     }

     const circle = new Geometry.Circle(5);
     console.log(circle.area());
     ```

2. 模块（Module）
   - **定义**：模块是TypeScript中用于将代码分割成独立文件的机制，允许开发者将代码组织在不同的文件中，并通过导入和导出功能进行交互。
   - **使用方式**：模块使用`export`和`import`关键字定义，通常在不同的文件中使用。
   - **示例**：

     ```typescript
     // circle.ts
     export class Circle {
       constructor(public radius: number) {}
       area() {
         return Math.PI * this.radius ** 2;
       }
     }

     // square.ts
     export class Square {
       constructor(public side: number) {}
       area() {
         return this.side ** 2;
       }
     }

     // main.ts
     import { Circle } from './circle';
     import { Square } from './square';

     const circle = new Circle(5);
     const square = new Square(4);
     console.log(circle.area());
     console.log(square.area());
     ```

3. 主要区别
   - **作用域**：
     - **命名空间**：主要用于在同一文件中组织代码，避免全局命名冲突。
     - **模块**：用于将代码分割成多个文件，支持模块化开发。

   - **导入导出**：
     - **命名空间**：使用`export`关键字导出成员，但不需要使用`import`来引入命名空间。
     - **模块**：使用`export`导出成员，使用`import`导入其他模块的成员。

   - **编译方式**：
     - **命名空间**：在编译时，命名空间的所有成员会被合并到一个全局对象中。
     - **模块**：每个模块在编译时会生成一个独立的JavaScript文件，模块之间的依赖关系通过导入导出进行管理。

   - **使用场景**：
     - **命名空间**：适用于较小的项目或库，方便在同一文件中组织代码。
     - **模块**：适用于大型项目，支持模块化开发，便于代码的维护和重用。

- 命名空间和模块都是TypeScript中用于组织代码的重要机制。命名空间适合在同一文件中管理相关代码，而模块则适合将代码分割成多个文件以实现模块化开发。理解这两者的区别和使用场景，将有助于开发者更好地组织和管理TypeScript项目的代码。

:::

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
