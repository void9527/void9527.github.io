---
outline: deep
---

## 通用

### Vue 有了响应式，为什么还要 diff？

::: details
在 Vue 中，响应式系统和 diff 算法是两个不同的概念，它们各自解决不同的问题。尽管 Vue 提供了响应式数据管理，但仍然需要 diff 算法来优化 DOM 更新。以下是原因和解释：

1. 响应式系统的工作原理
   - Vue 的响应式系统基于 `Object.defineProperty`（在 Vue 2 中）或 `Proxy`（在 Vue 3 中）实现。当数据发生变化时，Vue 会自动通知依赖于这些数据的组件进行更新。
   - 响应式系统确保数据变化时，视图能够自动更新，但并不直接处理 DOM 的高效更新。
  
2. DOM 更新的复杂性

   - DOM 操作是相对昂贵的，直接操作 DOM 会导致性能问题。尤其是在复杂的应用中，频繁的 DOM 更新会影响用户体验。
   - 当数据变化时，Vue 需要确定哪些部分的 DOM 需要更新，而不是重新渲染整个组件。

3. Diff 算法的作用

   - **高效更新**: Diff 算法用于比较新旧虚拟 DOM 树，找出需要更新的部分。通过最小化 DOM 操作，Diff 算法可以显著提高性能。
   - **最小化重绘**: 通过只更新变化的部分，Vue 可以减少重绘和重排的次数，从而提高渲染效率。
   - **虚拟 DOM**: Vue 使用虚拟 DOM 来表示 UI 的状态，Diff 算法在虚拟 DOM 之间进行比较，确保只对实际 DOM 进行必要的更新。

4. 结合响应式和 Diff

   - 响应式系统负责数据的变化通知，而 Diff 算法负责高效地更新 DOM。两者结合，使得 Vue 能够在数据变化时，快速且高效地反映到用户界面上。

- 尽管 Vue 提供了响应式数据管理，但仍然需要 Diff 算法来优化 DOM 更新。响应式系统确保数据变化时视图自动更新，而 Diff 算法通过比较虚拟 DOM，找出需要更新的部分，从而提高性能，减少不必要的 DOM 操作。两者的结合使得 Vue 在性能和用户体验上都表现出色。
:::

## Vue 3 相比 Vue 2 有哪些主要改进？

::: details
Vue 3 引入了许多重要的改进和新特性，以下是一些主要的改进：

1. **Composition API**:
   - Vue 3 引入了 Composition API，允许开发者以更灵活的方式组织和复用逻辑。通过 `setup()` 函数，开发者可以将相关的逻辑组合在一起，避免了 Vue 2 中选项式 API 的局限性。

2. **更好的 TypeScript 支持**:
   - Vue 3 对 TypeScript 的支持得到了显著增强，提供了更好的类型推导和类型检查，使得使用 TypeScript 开发 Vue 应用更加顺畅。

3. **性能优化**:
   - Vue 3 在多个方面进行了性能优化，包括使用 Proxy 替代 Object.defineProperty 实现响应式，减少了内存占用和性能开销。整体包体积更小，加载速度更快。

4. **Fragment 支持**:
   - Vue 3 允许组件返回多个根节点，支持 Fragment，减少了不必要的 DOM 节点，提高了渲染效率。

5. **Teleport 组件**:
   - Teleport 组件允许将子组件渲染到 DOM 中的任意位置，适用于模态框、通知等场景，提升了布局的灵活性。

6. **Suspense 组件**:
   - Suspense 组件用于处理异步组件的加载状态，允许开发者在加载异步组件时提供一个加载状态的占位符，提升用户体验。

7. **更好的响应式系统**:
   - Vue 3 的响应式系统基于 Proxy 实现，支持更多数据类型的响应式管理，性能更高，减少了不必要的渲染和更新。

8. **优化的虚拟 DOM**:
   - 虚拟 DOM 的实现进行了优化，减少了不必要的渲染和更新，提高了性能。

9. **自定义指令的改进**:
   - Vue 3 中自定义指令的定义方式与 Vue 2 有所不同，提供了更灵活的 API。

10. **更好的路由和状态管理支持**:
    - Vue 3 与 Vue Router 4 和 Vuex 4 的结合带来了更好的支持，允许在 `setup()` 中使用路由和状态管理功能。

- Vue 3 相比 Vue 2 在 Composition API、TypeScript 支持、性能优化、Fragment 支持、Teleport 和 Suspense 组件、响应式系统、虚拟 DOM、自定义指令、路由和状态管理等方面进行了显著改进。这些改进使得 Vue 3 更加灵活、高效和易于维护。
:::

## Vue 3 的 Composition API 是什么？对比 Vue 2 有什么优势？

::: details
Composition API 是 Vue 3 引入的一种新的 API 设计模式，旨在提高代码的可复用性和可维护性。与 Vue 2 中的选项式 API 不同，Composition API 允许开发者将相关的逻辑组合在一起，而不是分散在不同的选项中（如 `data`、`methods`、`computed` 等）。

- 主要特点

  1. **功能组合**:
     - 开发者可以在 `setup()` 函数中定义响应式数据、计算属性和方法，将相关逻辑组合在一起，形成更清晰的结构。

  2. **更好的逻辑复用**:
     - 通过使用组合函数（composable functions），开发者可以更方便地复用逻辑，尤其是在多个组件之间共享逻辑时。

  3. **类型推导**:
     - Composition API 与 TypeScript 的兼容性更好，能够提供更好的类型推导和类型检查，提升开发体验。

  4. **更清晰的上下文**:
     - 在 `setup()` 中，`this` 不再指向组件实例，而是可以直接使用传入的参数和返回的值，减少了对 `this` 的依赖。

  5. **响应式引用**:
     - 使用 `ref` 和 `reactive` 来创建响应式数据，使得状态管理更加灵活和直观。

- 对比 Vue 2 的优势

   1. **更好的组织结构**:
      - 在 Vue 2 中，组件的逻辑往往分散在多个选项中，导致代码难以维护。Composition API 允许将相关逻辑集中在一起，提升了代码的可读性和可维护性。

   2. **增强的逻辑复用**:
      - Vue 2 中的混入（mixins）虽然可以实现逻辑复用，但可能导致命名冲突和难以追踪的依赖关系。Composition API 通过组合函数提供了更清晰的逻辑复用方式。

   3. **更强的类型支持**:
      - Vue 3 的 Composition API 提供了更好的 TypeScript 支持，使得开发者在使用 TypeScript 时能够获得更好的类型推导和检查。

   4. **更灵活的响应式管理**:
      - Composition API 允许开发者更灵活地管理响应式数据，支持更复杂的状态管理场景。

- Vue 3 的 Composition API 是一种新的 API 设计模式，旨在提高代码的可复用性和可维护性。与 Vue 2 的选项式 API 相比，Composition API 提供了更好的组织结构、增强的逻辑复用、强大的类型支持和灵活的响应式管理，使得开发者能够更高效地构建和维护 Vue 应用。
:::

## Vue 3中setup()函数起什么作用？

::: details
`setup()`函数是Vue 3中Composition API的核心部分，负责初始化组件的逻辑。它在组件实例创建之前被调用，主要作用包括：

1. **组件初始化**:
   - `setup()`函数用于初始化组件的状态和逻辑。可以在此处定义响应式数据、计算属性和方法。

2. **响应式数据**:
   - 在`setup()`中，可以使用`ref`和`reactive`来定义响应式数据，确保数据变化时视图自动更新。
   - 示例：

     ```javascript
     import { ref } from 'vue';

     export default {
       setup() {
         const count = ref(0);
         return { count };
       }
     };
     ```

3. **生命周期钩子**:
   - 可以在`setup()`中使用生命周期钩子（如`onMounted`、`onUnmounted`等），处理组件的生命周期事件。
   - 示例：

     ```javascript
     import { onMounted } from 'vue';

     export default {
       setup() {
         onMounted(() => {
           console.log('组件已挂载');
         });
       }
     };
     ```

4. **逻辑复用**:
   - `setup()`函数允许将相关的逻辑组合在一起，便于在多个组件之间共享逻辑，提高代码的可复用性。

5. **更清晰的上下文**:
   - 在`setup()`中，`this`不再指向组件实例，而是可以直接使用传入的参数和返回的值，减少了对`this`的依赖。

6. **类型推导**:
   - 在使用TypeScript时，`setup()`函数可以提供更好的类型推导和类型检查，提升开发体验。

- `setup()`函数在Vue 3中起着至关重要的作用，负责组件的初始化、响应式数据的定义、生命周期钩子的使用、逻辑复用和上下文管理。它使得组件的逻辑更加清晰和可维护，是Composition API的核心组成部分。
:::

## Vue 3中ref和reactive的区别？

::: details
`ref`和`reactive`都是Vue 3中用于创建响应式数据的API，但它们的使用场景和实现方式有所不同。

- **ref**：
  - 用于创建基本数据类型（如字符串、数字、布尔值等）的响应式引用。
  - 返回一个对象，包含一个`value`属性，实际值存储在`value`中。
  - 适合用于单个值的响应式管理。
  - 示例：

    ```javascript
    import { ref } from 'vue';
    const count = ref(0);
    count.value++; // 更新值
    ```

- **reactive**：
  - 用于创建对象和数组的响应式状态。
  - 返回一个代理对象，直接操作该对象的属性即可。
  - 适合用于复杂数据结构的响应式管理。
  - 示例：

    ```javascript
    import { reactive } from 'vue';
    const state = reactive({ count: 0 });
    state.count++; // 更新值
    ```

- **总结**：`ref`适合基本数据类型，`reactive`适合对象和数组，二者可以结合使用以满足不同的需求。
:::

## Vue 3中的watch和watchEffect有何不同？

::: details
`watch`和`watchEffect`都是Vue 3中用于响应式数据变化的API，但它们的使用方式和适用场景有所不同。

- **watch**：
  - 用于观察特定的响应式数据源，当数据源变化时执行回调函数。
  - 需要显式指定要观察的数据源，可以是单个值或多个值。
  - 适合用于处理异步操作或复杂逻辑。
  - 示例：

    ```javascript
    import { watch } from 'vue';
    const count = ref(0);
    watch(count, (newValue, oldValue) => {
      console.log(`Count changed from ${oldValue} to ${newValue}`);
    });
    ```

- **watchEffect**：
  - 自动追踪其内部使用的所有响应式数据源，当任何一个数据源变化时，自动重新执行。
  - 不需要显式指定要观察的数据源，适合用于简单的副作用处理。
  - 示例：

    ```javascript
    import { watchEffect } from 'vue';
    const count = ref(0);
    watchEffect(() => {
      console.log(`Count is: ${count.value}`);
    });
    ```

- **总结**：`watch`适合用于观察特定数据源，`watchEffect`适合用于处理简单的副作用，二者可以根据具体需求选择使用。
:::

## Vue 3中的Suspense组件是如何工作的？

::: details
Suspense组件是Vue 3中引入的一个新特性，用于处理异步组件的加载状态。

- **异步组件**：Suspense允许开发者在加载异步组件时提供一个加载状态的占位符，提升用户体验。
- **使用方式**：在Suspense组件中，可以定义`default`插槽和`fallback`插槽，`default`插槽用于渲染异步组件，`fallback`插槽用于渲染加载状态。
- **示例**：

  ```vue
  <template>
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </template>
  ```

- **加载状态**：当异步组件正在加载时，`fallback`插槽中的内容会被渲染，加载完成后，`default`插槽中的内容会被渲染。
- **支持多个异步组件**：Suspense可以嵌套使用，支持多个异步组件的加载状态管理。
:::

## Vue 3中的Teleport组件有什么作用？

::: details
Teleport组件是Vue 3中引入的一个新特性，用于将子组件渲染到DOM中的任意位置。

- **功能**：Teleport允许开发者将组件的渲染位置与其在组件树中的位置分离，适用于模态框、通知、工具提示等场景。
- **使用方式**：通过`to`属性指定要渲染的目标DOM元素的选择器。
- **示例**：

  ```vue
  <template>
    <Teleport to="#modal">
      <ModalComponent />
    </Teleport>
  </template>
  ```

- **灵活性**：Teleport可以将组件渲染到页面的任何位置，而不受父组件的限制，提升了布局的灵活性。
- **性能**：Teleport不会影响组件的生命周期和响应式特性，仍然可以正常使用Vue的特性。
:::

## Vue 3如何优化性能？

::: details
Vue 3在多个方面进行了性能优化，以提升应用的响应速度和用户体验。

- **Proxy实现响应式**：使用Proxy替代Object.defineProperty，提升了响应式系统的性能，支持更多数据类型。
- **编译优化**：Vue 3的模板编译器进行了优化，生成的渲染函数更高效，减少了运行时开销。
- **Tree-shaking**：Vue 3支持Tree-shaking，允许开发者只引入所需的功能，减小包体积。
- **更小的包体积**：Vue 3的整体包体积更小，加载速度更快，适合现代Web应用。
- **异步组件**：支持异步组件加载，按需加载组件，减少初始加载时间。
- **Fragment支持**：允许组件有多个根节点，减少不必要的DOM节点，提高渲染效率。
- **优化的虚拟DOM**：虚拟DOM的实现进行了优化，减少了不必要的渲染和更新，提高了性能。
:::

## Vue 3的provide和inject是如何工作的？

::: details
`provide`和`inject`是Vue 3中用于实现依赖注入的API，允许在组件树中共享数据。

- **provide**：
  - 在父组件中使用`provide`来提供数据，允许子组件访问这些数据。
  - 可以提供任意类型的数据，包括对象、数组和函数。
  - 示例：

    ```javascript
    import { provide } from 'vue';
    export default {
      setup() {
        const value = 'Hello, World!';
        provide('myValue', value);
      }
    };
    ```

- **inject**：
  - 在子组件中使用`inject`来访问父组件提供的数据。
  - 可以指定要注入的键名，获取对应的值。
  - 示例：

    ```javascript
    import { inject } from 'vue';
    export default {
      setup() {
        const myValue = inject('myValue');
        console.log(myValue); // 输出: Hello, World!
      }
    };
    ```

- **作用域**：`provide`和`inject`的作用域是组件树，子组件可以访问祖先组件提供的数据，但不能访问同级或子级组件提供的数据。
- **动态更新**：如果提供的数据是响应式的，子组件会自动响应数据的变化。
:::

## Vue 3如何处理组件的异步加载？

::: details
Vue 3通过异步组件的机制来处理组件的异步加载，提升了应用的性能和用户体验。

- **定义异步组件**：可以使用`defineAsyncComponent`函数来定义异步组件。
- **示例**：

  ```javascript
  import { defineAsyncComponent } from 'vue';
  const AsyncComponent = defineAsyncComponent(() =>
    import('./MyComponent.vue')
  );
  ```

- **加载状态**：可以在异步组件加载时提供一个加载状态的占位符，提升用户体验。
- **错误处理**：可以为异步组件定义错误处理逻辑，处理加载失败的情况。
- **示例**：

  ```javascript
  const AsyncComponent = defineAsyncComponent({
    loader: () => import('./MyComponent.vue'),
    loadingComponent: LoadingSpinner,
    errorComponent: ErrorComponent,
    delay: 200,
    timeout: 3000,
  });
  ```

- **按需加载**：异步组件可以按需加载，减少初始加载时间，提高应用的响应速度。
:::

## Vue 3中的响应式系统是如何工作的？

::: details
Vue 3的响应式系统基于Proxy实现，提供了更高效和灵活的响应式数据管理。

- **Proxy拦截**：使用Proxy可以直接拦截对象的操作（如get、set、delete等），实现响应式。
- **依赖收集**：当访问响应式数据时，Vue会自动收集依赖，确保在数据变化时通知相关的组件更新。
- **懒执行**：响应式系统采用懒执行策略，只有在数据变化时才会触发更新，减少不必要的渲染。
- **支持更多数据类型**：Proxy支持对象、数组、Map、Set等多种数据类型的响应式管理。
- **嵌套响应式**：支持嵌套对象的响应式，确保深层次的数据变化也能被追踪。
- **性能优化**：相较于Vue 2的Object.defineProperty，Proxy的性能更高，减少了getter和setter的开销。
:::

## Vue 3中的自定义指令是如何定义的？

::: details
在Vue 3中，自定义指令的定义方式与Vue 2有所不同，提供了更灵活的API。

- **定义自定义指令**：使用`app.directive`方法来定义自定义指令。
- **示例**：

  ```javascript
  const app = createApp({});
  app.directive('focus', {
    mounted(el) {
      el.focus();
    }
  });
  ```

- **指令钩子**：自定义指令可以使用多个钩子函数，如`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`、`unmounted`等。
- **使用自定义指令**：在模板中使用自定义指令时，使用`v-指令名`的方式。
- **示例**：

  ```html
  <input v-focus />
  ```

- **参数和修饰符**：自定义指令可以接收参数和修饰符，增强指令的灵活性。
:::

## Vue 3中的路由和Vue Router 4有哪些变化？

::: details
Vue 3与Vue Router 4的结合带来了多项重要变化和改进。

- **Composition API支持**：Vue Router 4支持Composition API，允许在`setup()`中使用路由功能。
- **动态路由匹配**：支持动态路由匹配，允许在路由配置中使用参数。
- **嵌套路由**：增强了嵌套路由的支持，允许更灵活的路由结构。
- **路由守卫**：提供了更强大的路由守卫功能，支持全局守卫、路由独享守卫和组件内守卫。
- **路由懒加载**：支持路由懒加载，按需加载路由组件，提升应用性能。
- **示例**：

  ```javascript
  const routes = [
    {
      path: '/user/:id',
      component: User,
      beforeEnter: (to, from, next) => {
        // 路由守卫逻辑
        next();
      }
    }
  ];
  ```

- **更好的TypeScript支持**：Vue Router 4对TypeScript的支持更好，提供了更好的类型推导和类型检查。
:::

## Vue 3如何与Vuex 4一起使用？

::: details
Vue 3与Vuex 4的结合使得状态管理更加高效和灵活。

- **安装Vuex**：首先需要安装Vuex 4，并在Vue 3应用中进行配置。
- **创建Store**：使用`createStore`函数创建Vuex Store。
- **示例**：

  ```javascript
  import { createStore } from 'vuex';
  const store = createStore({
    state: {
      count: 0
    },
    mutations: {
      increment(state) {
        state.count++;
      }
    }
  });
  ```

- **在应用中使用Store**：通过`app.use(store)`将Store注入到Vue应用中。
- **访问Store**：在组件中使用`useStore`钩子访问Store，获取状态和提交变更。
- **示例**：

  ```javascript
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore();
      const increment = () => {
        store.commit('increment');
      };
      return { increment };
    }
  };
  ```

- **支持Composition API**：Vuex 4与Composition API兼容，允许在`setup()`中使用Store，提升了逻辑复用性。
:::

## Vue 3的插槽（Slots）和Vue 2有何不同？

::: details
Vue 3对插槽的实现进行了改进，提供了更灵活和强大的插槽功能。

- **命名插槽**：支持命名插槽，允许在父组件中指定插槽的名称，增强了插槽的灵活性。
- **作用域插槽**：支持作用域插槽，允许子组件向父组件传递数据，父组件可以根据传递的数据渲染内容。
- **示例**：

  ```vue
  <template>
    <ChildComponent v-slot:default="{ message }">
      <p>{{ message }}</p>
    </ChildComponent>
  </template>
  ```

- **多个插槽**：支持多个插槽，允许组件定义多个插槽，提升了组件的可复用性。
- **简化语法**：插槽的语法更加简洁，使用`v-slot`指令可以更方便地定义和使用插槽。
- **插槽内容的动态更新**：插槽内容可以根据父组件的状态动态更新，提升了组件的响应性。
:::

## Vue 3中的过渡和动画效果是如何实现的？

::: details
Vue 3中的过渡和动画效果通过`<transition>`组件实现，提供了丰富的过渡效果。

- **使用`<transition>`组件**：在需要添加过渡效果的元素外层包裹`<transition>`组件。
- **示例**：

  ```vue
  <template>
    <transition name="fade">
      <div v-if="show">Hello World</div>
    </transition>
  </template>
  ```

- **过渡类名**：通过`name`属性指定过渡的类名，Vue会自动添加和移除相应的类名。
- **CSS过渡**：可以使用CSS过渡和动画来实现过渡效果，支持多种过渡效果。
- **JavaScript过渡**：支持使用JavaScript钩子函数来控制过渡效果，提供更灵活的动画控制。
- **示例**：

  ```javascript
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div v-if="show">Hello World</div>
  </transition>
  ```

- **过渡效果的动态控制**：可以根据组件的状态动态控制过渡效果，提升用户体验。
:::

## Vue 3的服务器端渲染（SSR）是如何工作的？

::: details
Vue 3的服务器端渲染（SSR）通过`createSSRApp`和`renderToString`等API实现，提供了更高效的SSR支持。

- **创建SSR应用**：使用`createSSRApp`创建一个SSR应用实例。
- **示例**：

  ```javascript
  import { createSSRApp } from 'vue';
  const app = createSSRApp(App);
  ```

- **渲染到字符串**：使用`renderToString`将应用渲染为HTML字符串，适合在服务器端生成页面。
- **示例**：

  ```javascript
  import { renderToString } from '@vue/server-renderer';
  const html = await renderToString(app);
  ```

- **支持路由和状态管理**：SSR支持Vue Router和Vuex，允许在服务器端处理路由和状态管理。
- **提升SEO**：通过SSR生成的HTML可以被搜索引擎抓取，提升了SEO效果。
- **性能优化**：SSR可以减少客户端的初始加载时间，提升用户体验。
:::

## Vue 3中的虚拟DOM是如何工作的？

::: details
Vue 3的虚拟DOM通过创建一个轻量级的JavaScript对象树来实现，提升了渲染性能。

- **虚拟DOM的概念**：虚拟DOM是对真实DOM的抽象表示，允许在内存中进行操作，减少直接操作真实DOM的开销。
- **Diff算法**：Vue 3使用高效的Diff算法来比较虚拟DOM的变化，找出需要更新部分，减少不必要的DOM操作。
- **更新策略**：在数据变化时，Vue会重新渲染虚拟DOM，并与之前的虚拟DOM进行比较，生成最小的更新操作。
- **性能优化**：通过虚拟DOM，Vue 3能够在高频率更新的场景下保持良好的性能，提升用户体验。
- **支持组件化**：虚拟DOM的实现支持组件化开发，允许开发者以组件的方式构建应用，提高了代码的可维护性。
:::

## Vue 3如何处理全局状态？

::: details
Vue 3通过Vuex或Composition API中的`provide`和`inject`来处理全局状态。

- **使用Vuex**：Vuex是Vue的官方状态管理库，适合处理复杂的全局状态。
  - 创建Store，定义状态、变更和动作。
  - 在组件中使用`useStore`钩子访问和修改全局状态。
- **使用Composition API**：通过`provide`和`inject`实现简单的全局状态管理。
  - 在根组件中使用`provide`提供全局状态。
  - 在子组件中使用`inject`访问全局状态。
- **示例**：

  ```javascript
  // 根组件
  import { provide, reactive } from 'vue';
  const state = reactive({ count: 0 });
  provide('globalState', state);
  
  // 子组件
  import { inject } from 'vue';
  const globalState = inject('globalState');
  ```

- **灵活性**：根据应用的复杂性选择合适的全局状态管理方案，提升代码的可维护性和可读性。
:::

## Vue 3的生命周期钩子有哪些变化？

::: details
Vue 3的生命周期钩子在名称和使用方式上有所变化，提供了更灵活的API。

- **新钩子**：Vue 3引入了一些新的生命周期钩子，如`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`等。
- **使用方式**：在`setup()`函数中使用这些钩子，提供了更清晰的上下文管理。
- **示例**：

  ```javascript
  import { onMounted, onUnmounted } from 'vue';
  export default {
    setup() {
      onMounted(() => {
        console.log('Component is mounted');
      });
      onUnmounted(() => {
        console.log('Component is unmounted');
      });
    }
  };
  ```

- **灵活性**：通过在`setup()`中使用生命周期钩子，开发者可以更灵活地管理组件的生命周期，提升代码的可读性和可维护性。
:::

## Vue 3如何与TypeScript一起使用？

::: details
Vue 3对TypeScript的支持进行了增强，提供了更好的类型推导和类型检查。

- **类型定义**：Vue 3的核心库和Vue Router、Vuex等插件都提供了完整的类型定义，方便开发者使用TypeScript。
- **组件类型**：可以使用`defineComponent`来定义组件，提供类型推导。
- **示例**：

  ```typescript
  import { defineComponent } from 'vue';
  export default defineComponent({
    setup() {
      const count = ref(0);
      return { count };
    }
  });
  ```

- **Props和Emit**：可以为组件的props和emit事件定义类型，提升代码的可读性和可维护性。
- **示例**：

  ```typescript
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      message: {
        type: String,
        required: true
      }
    },
    emits: {
      click: null
    }
  });
  ```

- **类型推导**：TypeScript能够自动推导响应式数据的类型，减少了手动定义类型的工作量。
- **增强的开发体验**：通过TypeScript的类型检查，开发者可以在编写代码时获得更好的提示和错误检查，提升开发效率。
:::

## v-memo 的使用场景及原理

:::details
`v-memo` 是 Vue 3 中的一个指令，用于优化组件的性能，特别是在处理大量数据或复杂计算时。它的主要作用是缓存组件的渲染结果，避免不必要的重新渲染，从而提升应用的性能。以下是 `v-memo` 的使用场景和原理的详细说明。

- 使用场景

  1. **复杂计算**：
     - 当组件中有复杂的计算逻辑，且这些计算依赖于某些数据时，可以使用 `v-memo` 来缓存计算结果，避免在数据未变化时重复计算。
     - 示例：

         ```vue
         <template>
         <div>
             <h1 v-memo="computedValue">{{ computedValue }}</h1>
         </div>
         </template>

         <script>
         export default {
         data() {
             return {
             count: 0,
             };
         },
         computed: {
             computedValue() {
             // 复杂计算
             return this.count * 1000;
             },
         },
         };
         </script>
         ```

  2. **列表渲染**：
     - 在渲染长列表时，使用 `v-memo` 可以缓存每个列表项的渲染结果，避免在列表数据未变化时重新渲染所有项。
     - 示例：

         ```vue
         <template>
         <ul>
             <li v-for="item in items" :key="item.id" v-memo="item">{{ item.name }}</li>
         </ul>
         </template>
         ```

  3. **条件渲染**：
     - 在条件渲染的场景中，使用 `v-memo` 可以缓存条件渲染的结果，避免在条件未变化时重新渲染。
     - 示例：

         ```vue
         <template>
         <div>
             <p v-if="isVisible" v-memo="content">{{ content }}</p>
         </div>
         </template>

         ```

- 原理
  - **缓存机制**：
     `v-memo` 通过在内部维护一个缓存来存储组件的渲染结果。当组件的依赖数据未变化时，`v-memo` 会直接返回缓存的结果，而不是重新渲染组件。

  - **依赖追踪**：
     `v-memo` 会追踪组件的依赖数据，当依赖数据发生变化时，缓存会失效，组件会重新渲染以更新显示的内容。

  - **性能提升**：
     通过减少不必要的渲染，`v-memo` 可以显著提升组件的性能，尤其是在处理大量数据或复杂计算时，减少了 CPU 和内存的消耗。

- `v-memo` 是 Vue 3 中用于优化组件性能的指令，适用于复杂计算、列表渲染和条件渲染等场景。它通过缓存渲染结果和追踪依赖数据的变化，避免不必要的重新渲染，从而提升应用的性能。合理使用 `v-memo` 可以显著改善用户体验，尤其是在数据量较大或计算复杂的情况下。

:::

## 执行顺序

### Vue 3中attribute setup与onMounted的执行顺序，以及他们的特点

:::details
在 Vue 3 中，`setup` 函数和 `onMounted` 钩子的执行顺序以及它们的特点如下：

1. 执行顺序
   1. **setup 函数**:
      - 当组件实例被创建时，`setup` 函数会在组件的生命周期中最早被调用。它在组件的 props 被解析后立即执行。
      - `setup` 函数的返回值会被用作组件的响应式数据和方法。

   2. **onMounted 钩子**:
      - `onMounted` 钩子在组件挂载到 DOM 后被调用。它是在 `setup` 函数执行完毕并且组件的 DOM 元素被插入到文档中后执行的。
      - 这意味着在 `onMounted` 中可以安全地访问和操作 DOM 元素。

2. 特点
   1. **setup 函数**:
      - **目的**: 用于初始化组件的状态、计算属性和方法。
      - **返回值**: 可以返回一个对象，包含组件的响应式数据和方法，供模板使用。
      - **访问**: 在 `setup` 中可以访问 props、context 和其他组合 API（如 `ref`、`reactive` 等）。
      - **执行时机**: 在组件创建时执行，适合进行数据初始化和逻辑设置。

      示例：

      ```javascript
      import { ref } from 'vue';

      export default {
        setup(props) {
          const count = ref(0);
          return { count };
        }
      };
      ```

   2. **onMounted 钩子**:
      - **目的**: 用于在组件挂载后执行特定的逻辑，如 DOM 操作、数据获取等。
      - **访问**: 可以访问组件的响应式数据和方法，但不能直接返回值供模板使用。
      - **执行时机**: 在组件挂载到 DOM 后执行，适合进行需要 DOM 元素的操作。

      示例：

      ```javascript
      import { onMounted } from 'vue';

      export default {
        setup() {
          onMounted(() => {
            console.log('组件已挂载');
          });
        }
      };
      ```

- 在 Vue 3 中，`setup` 函数在组件创建时最早执行，用于初始化状态和逻辑，而 `onMounted` 钩子在组件挂载后执行，适合进行 DOM 操作和其他需要在组件渲染后执行的逻辑。两者在组件生命周期中扮演着不同的角色，协同工作以实现组件的功能。

:::

### Vue 3中attribute setup 与其他生命周期函数的执行顺序

:::details
在 Vue 3 中，`setup` 函数与其他生命周期函数的执行顺序如下：

1. **setup 函数**:
   - `setup` 函数在组件实例创建时最早被调用。它在组件的 props 被解析后立即执行。
   - 适合进行数据初始化、计算属性和方法的定义。

2. **beforeCreate**:
   - 在组件实例被创建之前调用，此时无法访问 `data`、`computed` 和 `methods`。

3. **created**:
   - 在组件实例创建后调用，此时可以访问 `data`、`computed` 和 `methods`，但 DOM 还未挂载。

4. **beforeMount**:
   - 在组件挂载之前调用，此时 DOM 还未插入到文档中。

5. **onMounted**:
   - 在组件挂载到 DOM 后调用。适合进行 DOM 操作、数据获取等需要在组件渲染后执行的逻辑。

6. **beforeUpdate**:
   - 在组件更新之前调用，适合在数据变化前进行一些准备工作。

7. **updated**:
   - 在组件更新后调用，此时可以访问更新后的 DOM。

8. **beforeUnmount**:
   - 在组件卸载之前调用，适合进行清理操作，如移除事件监听器、清除定时器等。

9. **onUnmounted**:
   - 在组件卸载后调用，适合进行资源释放和清理。

10. **errorCaptured**:
    - 在子组件发生错误时调用，适合进行错误处理。

- 在 Vue 3 中，`setup` 函数在组件创建时最早执行，随后是其他生命周期函数，如 `created`、`beforeMount`、`onMounted` 等。每个生命周期函数在组件的不同阶段执行，允许开发者在适当的时机添加逻辑，以实现组件的功能和管理状态。

:::
