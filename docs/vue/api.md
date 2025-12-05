---
outline: deep
---

# Vue3 官方 API 参考

## 响应式核心 API

### reactive()

接受一个对象 (不论是否嵌套) 并创建一个响应式代理。

```js
import { reactive } from 'vue'

const obj = reactive({ count: 0 })
obj.count++
```

### ref()

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`。

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

### computed()

接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。

```js
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

// 可写的计算属性
const writableComputed = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
```

### readonly()

接受一个对象 (不论是否是响应式的) 或是一个 ref，返回一个原值的只读代理。

```js
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

copy.count++ // 警告!
```

### watchEffect()

侦听响应式数据的变化并自动执行副作用函数。**立即执行**一次，然后在其依赖项发生变化时重新执行。

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

// 立即执行一次，然后在 count 变化时重新执行
watchEffect(() => {
  console.log('count 是:', count.value)
})
// -> 立即输出 "count 是: 0"

count.value++
// -> 输出 "count 是: 1"

// 停止侦听器
const stop = watchEffect(() => {
  /* ... */
})

// 当不再需要此侦听器时
stop()
```

**特点：**
- ✅ **自动依赖收集**：自动追踪回调函数中使用的响应式数据
- ✅ **立即执行**：创建时立即执行一次
- ❌ **无法获取旧值**：只能访问当前值

### watch()

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。**默认不立即执行**，只在数据变化时执行。

```js
import { ref, watch } from 'vue'

const count = ref(0)

// 侦听单个来源 - 默认不立即执行
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`)
})

count.value++
// -> 输出 "count 从 0 变为 1"

// 侦听多个来源
const firstName = ref('')
const lastName = ref('')

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(`名字从 "${oldFirst} ${oldLast}" 变为 "${newFirst} ${newLast}"`)
})

// 设置 immediate: true - 立即执行一次
watch(count, (newValue, oldValue) => {
  console.log(`count 现在是: ${newValue}, 之前是: ${oldValue}`)
}, { immediate: true })
// -> 立即输出 "count 现在是: 1, 之前是: undefined"
```

**特点：**
- ✅ **显式依赖声明**：明确指定要侦听的数据源
- ✅ **可获取新旧值**：回调函数提供新值和旧值
- ⚙️ **可配置是否立即执行**：通过 `immediate` 选项控制
- ⚙️ **深度侦听**：通过 `deep` 选项控制

## `watchEffect` vs `watch` 详细对比

| 特性 | `watchEffect` | `watch` | `watch + immediate: true` |
|------|---------------|---------|---------------------------|
| **依赖收集** | 自动收集 | 手动指定 | 手动指定 |
| **立即执行** | ✅ 总是立即执行 | ❌ 默认不执行 | ✅ 立即执行 |
| **获取旧值** | ❌ 无法获取 | ✅ 可以获取 | ✅ 可以获取 |
| **首次执行时的旧值** | - | - | `undefined` |
| **语法简洁性** | 更简洁 | 更明确 | 更明确 |

### 使用场景对比

**使用 `watchEffect` 当：**
```js
import { ref, watchEffect } from 'vue'

const url = ref('https://api.example.com/users/1')
const data = ref(null)

// 自动依赖收集，代码简洁
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
// 立即执行，获取初始数据
```

**使用 `watch` 当：**
```js
import { ref, watch } from 'vue'

const searchTerm = ref('')
const searchResults = ref([])

// 需要对比新旧值，避免不必要的请求
watch(searchTerm, (newTerm, oldTerm) => {
  if (newTerm !== oldTerm && newTerm.length > 2) {
    searchResults.value = performSearch(newTerm)
  }
})
```

**使用 `watch + immediate: true` 当：**
```js
import { ref, watch } from 'vue'

const userId = ref(1)
const userProfile = ref(null)

// 需要立即执行 + 获取新旧值进行对比
watch(userId, async (newId, oldId) => {
  console.log(`用户ID从 ${oldId} 变为 ${newId}`)
  userProfile.value = await fetchUserProfile(newId)
}, { immediate: true })
// -> 立即输出 "用户ID从 undefined 变为 1"
```

### 性能考虑

```js
import { ref, watch, watchEffect } from 'vue'

const a = ref(1)
const b = ref(2) 
const c = ref(3)

// watchEffect: 自动依赖收集，可能收集不必要的依赖
watchEffect(() => {
  if (a.value > 0) {
    console.log(b.value) // b 被收集为依赖
  }
  // 即使 a.value <= 0，b 的变化仍会触发此函数
})

// watch: 精确控制依赖
watch([a, b], ([newA, newB]) => {
  if (newA > 0) {
    console.log(newB)
  }
  // 只有 a 或 b 变化时才触发
})
```

## 响应式工具函数

### isRef()

检查某个值是否为 ref。

```js
import { ref, isRef } from 'vue'

const count = ref(0)
console.log(isRef(count)) // true
console.log(isRef(0)) // false
```

### unref()

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

```js
import { ref, unref } from 'vue'

const count = ref(1)
console.log(unref(count)) // 1
console.log(unref(1)) // 1
```

### toRef()

基于响应式对象的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步。

```js
import { reactive, toRef } from 'vue'

const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

### toRefs()

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。

```js
import { reactive, toRefs } from 'vue'

const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
// stateAsRefs 的类型：{ foo: Ref<number>, bar: Ref<number> }

// 这个 ref 和源属性已经"链接上了"
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

### isReactive()

检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理。

```js
import { reactive, isReactive } from 'vue'

const state = reactive({ count: 0 })
console.log(isReactive(state)) // true
```

### isReadonly()

检查传入的值是否为只读对象。

```js
import { reactive, readonly, isReadonly } from 'vue'

const state = reactive({ count: 0 })
const readonlyState = readonly(state)

console.log(isReadonly(readonlyState)) // true
console.log(isReadonly(state)) // false
```

### isProxy()

检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理。

```js
import { reactive, readonly, isProxy } from 'vue'

const state = reactive({ count: 0 })
const readonlyState = readonly(state)

console.log(isProxy(state)) // true
console.log(isProxy(readonlyState)) // true
```

## 响应式进阶 API

### shallowRef()

`ref()` 的浅层作用形式。

```js
import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }

// 手动触发
triggerRef(state)
```

### triggerRef()

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

```js
import { shallowRef, triggerRef } from 'vue'

const shallow = shallowRef({
  greet: 'Hello, world'
})

// 第一次运行时记录一次 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不会触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 记录 "Hello, universe"
triggerRef(shallow)
```

### customRef()

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

```js
import { customRef } from 'vue'

function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

// 在组件中使用
const debouncedText = useDebouncedRef('hello')
```

### shallowReactive()

`reactive()` 的浅层作用形式。

```js
import { shallowReactive } from 'vue'

const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++
```

### shallowReadonly()

`readonly()` 的浅层作用形式。

```js
import { shallowReadonly } from 'vue'

const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以更改的
state.nested.bar++
```

### toRaw()

根据一个 Vue 创建的代理返回其原始对象。

```js
import { reactive, toRaw } from 'vue'

const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

### markRaw()

将一个对象标记为不可被转为代理。返回该对象本身。

```js
import { markRaw, reactive } from 'vue'

const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

### effectScope()

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)。

```js
import { effectScope, ref, computed } from 'vue'

const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)
  
  watch(doubled, () => console.log(doubled.value))
  
  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()
```

### getCurrentScope()

如果有的话，返回当前活跃的 effect 作用域。

```js
import { getCurrentScope } from 'vue'

const scope = getCurrentScope()
```

### onScopeDispose()

在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

```js
import { onScopeDispose } from 'vue'

onScopeDispose(() => {
  console.log('scope disposed')
})
```

## 生命周期钩子

### onMounted()

注册一个回调函数，在组件挂载完成后执行。

```js
import { onMounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})
```

### onUpdated()

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

```js
import { onUpdated } from 'vue'

onUpdated(() => {
  // 访问更新后的 DOM
})
```

### onUnmounted()

注册一个回调函数，在组件实例被卸载之后调用。

```js
import { onUnmounted } from 'vue'

onUnmounted(() => {
  console.log('组件已卸载')
})
```

### onBeforeMount()

注册一个钩子，在组件被挂载之前被调用。

```js
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  console.log('组件即将挂载')
})
```

### onBeforeUpdate()

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

```js
import { onBeforeUpdate } from 'vue'

onBeforeUpdate(() => {
  console.log('组件即将更新')
})
```

### onBeforeUnmount()

注册一个钩子，在组件实例被卸载之前调用。

```js
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('组件即将卸载')
})
```

### onErrorCaptured()

注册一个钩子，在捕获了后代组件传递的错误时调用。

```js
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.log('捕获错误:', err)
  return false // 阻止错误继续传播
})
```

## 依赖注入

### provide()

提供一个值，可以被后代组件注入。

```js
import { provide, ref } from 'vue'

// 提供静态值
provide('message', 'hello')

// 提供响应式的值
const count = ref(0)
provide('count', count)
```

### inject()

注入一个由祖先组件或整个应用 (通过 `app.provide()`) 提供的值。

```js
import { inject } from 'vue'

// 注入不含默认值的静态值
const message = inject('message')

// 注入含默认值的值
const count = inject('count', 0)

// 注入工厂函数
const fn = inject('function', () => {})
```

## 组合式函数辅助

### useSlots()

返回 slots 对象。

```js
import { useSlots } from 'vue'

export default {
  setup() {
    const slots = useSlots()
    
    return () => (
      <div>
        {slots.default?.()}
        {slots.footer?.()}
      </div>
    )
  }
}
```

### useAttrs()

返回 attrs 对象。

```js
import { useAttrs } from 'vue'

export default {
  setup() {
    const attrs = useAttrs()
    
    return () => <div {...attrs}>Content</div>
  }
}
```

### useId()

用于生成应用内唯一的元素 ID。

```js
import { useId } from 'vue'

export default {
  setup() {
    const id = useId()
    
    return { id }
  }
}
```

### useCssModule()

在单文件组件的 `<script setup>` 中访问 CSS 模块。

```vue
<template>
  <p :class="$style.red">Hello</p>
</template>

<script setup>
import { useCssModule } from 'vue'

// 默认, 返回 <style module> 的 class
const style = useCssModule()

// 具名, 返回 <style module="classes"> 的 class  
const classes = useCssModule('classes')
</script>

<style module>
.red {
  color: red;
}
</style>
```

## 高级功能

### nextTick()

等待下一次 DOM 更新刷新的工具方法。

```js
import { nextTick } from 'vue'

// 在状态改变后等待 DOM 更新
count.value++
await nextTick()
// 现在 DOM 已经更新了
```

### defineComponent()

在定义 Vue 组件时提供类型推导的辅助函数。

```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  // 类型推导已启用
  props: {
    message: String
  },
  setup(props) {
    props.message // 类型为 string
  }
})
```

### defineAsyncComponent()

定义一个异步组件，它在运行时是懒加载的。

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)

// 带选项
const AsyncCompWithOptions = defineAsyncComponent({
  loader: () => import('./Foo.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

## 响应式 API 最佳实践

### 使用 `ref()` vs `reactive()`

```js
import { ref, reactive } from 'vue'

// 推荐：基本数据类型使用 ref
const count = ref(0)
const message = ref('hello')

// 推荐：对象使用 reactive
const state = reactive({
  count: 0,
  message: 'hello'
})

// 从 reactive 对象中解构
const { count, message } = toRefs(state)
```

### 避免响应式陷阱

```js
import { reactive, ref } from 'vue'

// ❌ 错误：丢失响应性
let state = reactive({ count: 0 })
state = reactive({ count: 1 }) // 原始引用丢失

// ✅ 正确：保持响应性
const state = reactive({ count: 0 })
state.count = 1

// ❌ 错误：解构丢失响应性  
const { count } = reactive({ count: 0 })

// ✅ 正确：使用 toRefs
const { count } = toRefs(reactive({ count: 0 }))
```

这些是 Vue 3 的真实官方 API，你可以在 [Vue.js 官方文档](https://vuejs.org/api/) 中查看完整的 API 参考。
