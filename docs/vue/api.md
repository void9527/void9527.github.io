---
outline: deep
---

# Vue3 内置的高级API

## track()

手动跟踪一个依赖。这是一个底层API，通常用于自定义响应式实现。

```js
import { track, trigger, ref } from 'vue'

// 创建一个自定义的响应式实现
function createCustomReactive(target, key) {
  let value = target[key]
  
  return {
    get() {
      // 手动跟踪依赖
      track(target, 'get', key)
      return value
    },
    set(newValue) {
      if (value !== newValue) {
        value = newValue
        // 手动触发更新
        trigger(target, 'set', key, newValue)
      }
    }
  }
}
```

## trackScope()

跟踪当前作用域中的所有依赖收集，用于调试响应式系统。

```js
import { trackScope, ref, computed } from 'vue'

function debugReactivity() {
  const count = ref(0)
  
  // 开始跟踪作用域
  const scope = trackScope(() => {
    const doubled = computed(() => count.value * 2)
    return doubled.value
  })
  
  console.log('依赖跟踪信息:', scope)
}
```

## trackOptions()

配置依赖跟踪的选项，可以用于优化性能或调试。

```js
import { trackOptions, ref, watchEffect } from 'vue'

// 配置跟踪选项
trackOptions({
  // 启用调试模式
  debug: true,
  // 设置最大跟踪深度
  maxDepth: 10,
  // 自定义跟踪回调
  onTrack(event) {
    console.log('依赖被跟踪:', event)
  }
})

const count = ref(0)
watchEffect(() => {
  console.log(count.value) // 这里的依赖跟踪会被记录
})
```

## trigger()

手动触发依赖更新。这是响应式系统的核心API之一。

```js
import { trigger, track, ref } from 'vue'

// 创建一个自定义的响应式Map
class ReactiveMap {
  constructor() {
    this._map = new Map()
    this._target = {}
  }
  
  get(key) {
    // 跟踪依赖
    track(this._target, 'get', key)
    return this._map.get(key)
  }
  
  set(key, value) {
    const hadKey = this._map.has(key)
    const oldValue = this._map.get(key)
    
    this._map.set(key, value)
    
    // 触发更新
    if (!hadKey) {
      trigger(this._target, 'add', key, value)
    } else if (value !== oldValue) {
      trigger(this._target, 'set', key, value, oldValue)
    }
  }
}

// 使用示例
const reactiveMap = new ReactiveMap()
watchEffect(() => {
  console.log('user name:', reactiveMap.get('user'))
})

reactiveMap.set('user', 'Alice') // 会触发watchEffect
```

## effectScope()

创建一个effect作用域，用于批量管理副作用的生命周期。

```js
import { effectScope, ref, watchEffect, computed } from 'vue'

function useFeature() {
  const scope = effectScope()
  
  return scope.run(() => {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    
    // 这个watchEffect会被包含在scope中
    watchEffect(() => {
      console.log('count:', count.value)
    })
    
    // 返回清理函数
    return {
      count,
      doubled,
      cleanup: () => scope.stop() // 停止所有副作用
    }
  })
}

// 使用
const feature = useFeature()
feature.count.value = 10

// 清理所有副作用
feature.cleanup()
```

## effect()

创建一个响应式副作用函数。这是watchEffect的底层实现。

```js
import { effect, ref, stop } from 'vue'

const count = ref(0)
const name = ref('Vue')

// 创建一个响应式副作用
const runner = effect(() => {
  console.log(`${name.value} count: ${count.value}`)
}, {
  // 配置选项
  lazy: false, // 是否延迟执行
  scheduler: (job) => {
    // 自定义调度器
    setTimeout(job, 100) // 延迟100ms执行
  },
  onTrack(event) {
    console.log('跟踪:', event)
  },
  onTrigger(event) {
    console.log('触发:', event)
  }
})

count.value++ // 会触发effect，但延迟100ms执行

// 手动执行effect
runner()

// 停止effect
stop(runner)
```

## watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```js
import { watchEffect, ref, nextTick } from 'vue'

const count = ref(0)
const enabled = ref(true)

// 基本用法
const stop1 = watchEffect(() => {
  if (enabled.value) {
    console.log('count is:', count.value)
  }
})

// 带选项的用法
const stop2 = watchEffect(
  () => {
    console.log('DOM updated, count:', count.value)
  },
  {
    flush: 'post', // 'pre' | 'sync' | 'post'
    onTrack(e) {
      console.log('跟踪依赖:', e)
    },
    onTrigger(e) {
      console.log('触发更新:', e)
    }
  }
)

// 异步清理
const stop3 = watchEffect(async (onCleanup) => {
  const response = await fetch(`/api/count/${count.value}`)
  const data = await response.json()
  
  // 注册清理函数
  onCleanup(() => {
    // 取消请求或清理资源
    console.log('清理副作用')
  })
  
  console.log('数据:', data)
})

// 停止监听
// stop1()
// stop2()
// stop3()
```

## provide()

提供一个值，可以被后代组件通过inject()注入。

```js
import { provide, ref, readonly } from 'vue'

// 在父组件中
export default {
  setup() {
    const theme = ref('dark')
    const user = ref({ name: 'Alice', role: 'admin' })
    
    // 提供响应式数据
    provide('theme', theme)
    
    // 提供只读数据，防止子组件修改
    provide('user', readonly(user))
    
    // 提供方法
    provide('updateTheme', (newTheme) => {
      theme.value = newTheme
    })
    
    // 使用Symbol作为key，避免命名冲突
    const ThemeSymbol = Symbol('theme')
    provide(ThemeSymbol, theme)
    
    return {
      theme,
      user,
      ThemeSymbol
    }
  }
}

// 在子组件中使用inject()
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    const user = inject('user')
    const updateTheme = inject('updateTheme')
    
    // 带默认值的注入
    const config = inject('config', { apiUrl: '/api' })
    
    // 注入可选值
    const optionalValue = inject('optional', null)
    
    return {
      theme,
      user,
      updateTheme,
      config
    }
  }
}
```

## inject()

注入一个由provide()提供的值。

```js
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    const user = inject('user')
    const updateTheme = inject('updateTheme')
    
    // 带默认值的注入
    const config = inject('config', { apiUrl: '/api' })
    
    // 注入可选值
    const optionalValue = inject('optional', null)
    
    return {
      theme,
      user,
      updateTheme,
      config
    }
  }
}
```

## customRef()

创建一个自定义的 ref，可以用于自定义响应式逻辑。

```js
import { customRef } from 'vue'

function useCustomRef() {
  const value = ref(0)
  
  const customRef = customRef((track, trigger) => {
    return {
      get() {
        track()
        return value.value
      },
      set(newValue) {
        value.value = newValue
        trigger()
      }
    }
  })
  
  return customRef
}

const customRef = useCustomRef()
console.log(customRef.value) // 0
customRef.value = 1
console.log(customRef.value) // 1
```

## shallowRef()

创建一个浅层 ref，用于创建浅层响应式对象。

```js
import { shallowRef } from 'vue'

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

## getCurrentScope()

返回当前活跃的 effect 作用域。用于调试和高级用例。

```js
import { getCurrentScope, effectScope } from 'vue'

const scope = effectScope()
scope.run(() => {
  console.log(getCurrentScope() === scope) // true
})
```

## onScopeDispose()

在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

```js
import { onScopeDispose, effectScope } from 'vue'

const scope = effectScope()
scope.run(() => {
  onScopeDispose(() => {
    console.log('scope disposed')
  })
})

scope.stop() // 'scope disposed'
```

## unref()

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 的语法糖函数。

```js
import { unref, ref } from 'vue'

const count = ref(1)
console.log(unref(count)) // 1
console.log(unref(1)) // 1
```

## toValue()

将值、refs 或 getters 规范化为值。这与 unref() 类似，不同的是此函数也会规范化 getter 函数。

```js
import { toValue, ref, computed } from 'vue'

const count = ref(1)
const getter = () => count.value * 2

console.log(toValue(count)) // 1
console.log(toValue(getter)) // 2
console.log(toValue(1)) // 1
```

## isRef()

检查某个值是否为 ref。

```js
import { isRef, ref } from 'vue'

const count = ref(1)
console.log(isRef(count)) // true
console.log(isRef(1)) // false
```

## isReactive()

检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。

```js
import { isReactive, reactive, readonly } from 'vue'

const state = reactive({ count: 1 })
const readonlyState = readonly(state)

console.log(isReactive(state)) // true
console.log(isReactive(readonlyState)) // false
```

## isReadonly()

检查传入的值是否为只读对象。

```js
import { isReadonly, readonly, reactive } from 'vue'

const state = reactive({ count: 1 })
const readonlyState = readonly(state)

console.log(isReadonly(state)) // false
console.log(isReadonly(readonlyState)) // true
```

## isProxy()

检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。

```js
import { isProxy, reactive, readonly } from 'vue'

const state = reactive({ count: 1 })
const readonlyState = readonly(state)

console.log(isProxy(state)) // true
console.log(isProxy(readonlyState)) // true
console.log(isProxy({})) // false
```

## toRaw()

根据一个 Vue 创建的代理返回其原始对象。

```js
import { toRaw, reactive } from 'vue'

const original = { count: 1 }
const state = reactive(original)

console.log(toRaw(state) === original) // true
```

## markRaw()

将一个对象标记为不可被转为代理。返回该对象本身。

```js
import { markRaw, reactive } from 'vue'

const foo = markRaw({})
const state = reactive({ foo })

console.log(isReactive(state.foo)) // false
```

## triggerRef()

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

```js
import { triggerRef, shallowRef } from 'vue'

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

## proxyRefs()

让我们可以把一个对象的所有属性都转换为 ref，并且自动解包。

```js
import { proxyRefs, ref } from 'vue'

const count = ref(1)
const name = ref('Vue')

const proxy = proxyRefs({
  count,
  name,
  msg: 'hello'
})

console.log(proxy.count) // 1 (自动解包)
console.log(proxy.name) // 'Vue' (自动解包)
console.log(proxy.msg) // 'hello'

proxy.count = 2 // 等价于 count.value = 2
console.log(count.value) // 2
```

## defineAsyncComponent()

定义一个异步组件，它在运行时是懒加载的。

```js
import { defineAsyncComponent } from 'vue'

// 简单用法
const AsyncComp = defineAsyncComponent(() => import('./MyComponent.vue'))

// 带选项的用法
const AsyncCompWithOptions = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

## defineCustomElement()

创建一个自定义元素类，该类可以在任何使用原生自定义元素 API 的地方使用。

```js
import { defineCustomElement } from 'vue'
import MyVueComponent from './MyVueComponent.vue'

const MyElement = defineCustomElement(MyVueComponent)

// 注册自定义元素
customElements.define('my-element', MyElement)
```

## useSlots()

返回一个等价于 setupContext.slots 的对象。

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

## useAttrs()

返回一个等价于 setupContext.attrs 的对象。

```js
import { useAttrs } from 'vue'

export default {
  setup() {
    const attrs = useAttrs()
    
    return () => <div {...attrs}>Content</div>
  }
}
```

## useCssModule()

在单文件组件的 `<script setup>` 中访问 CSS 模块。

```vue
<template>
  <p :class="$style.red">Hello</p>
</template>

<script setup>
import { useCssModule } from 'vue'

// 默认, 返回 <style module> 的 class
const style = useCssModule()

// 具名模块, 返回 <style module="classes"> 的 class  
const classes = useCssModule('classes')
</script>

<style module>
.red {
  color: red;
}
</style>
```

## useId()

用于生成应用内唯一的元素 ID。

```vue
<script setup>
import { useId } from 'vue'

const id = useId()
</script>

<template>
  <form>
    <label :for="id">Name:</label>
    <input :id="id" type="text" />
  </form>
</template>
```

```js
import {
  ref,
  customRef,
  watchEffect,
  computed,
  shallowRef,
  readonly,
} from "vue";

/**
 * 创建带有自定义 getter/setter 逻辑的响应式引用
 * 这是 track/trigger 的安全替代方案
 */
export function useCustomReactive(getter, setter) {
  return customRef((track, trigger) => ({
    get() {
      track();
      return getter();
    },
    set(newValue) {
      setter(newValue);
      trigger();
    },
  }));
}

/**
 * 创建防抖响应式引用
 */
export function useDebouncedRef(value, delay = 200) {
  let timeout;
  let _value = value;

  return customRef((track, trigger) => ({
    get() {
      track();
      return _value;
    },
    set(newValue) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        _value = newValue;
        trigger();
      }, delay);
    },
  }));
}

/**
 * 创建可以手动控制更新的响应式状态
 */
export function useManualReactive(initialValue) {
  const state = shallowRef(initialValue);
  const triggerUpdate = ref(0);

  // 使用计算属性来创建依赖关系
  const reactiveValue = computed(() => {
    // 访问 triggerUpdate 来建立依赖
    triggerUpdate.value;
    return state.value;
  });

  const setValue = (newValue) => {
    state.value = newValue;
    // 手动触发更新
    triggerUpdate.value++;
  };

  const forceUpdate = () => {
    triggerUpdate.value++;
  };

  return {
    value: reactiveValue,
    setValue,
    forceUpdate,
  };
}

/**
 * 创建与外部存储同步的响应式状态
 */
export function useExternalSync(key, storage = localStorage) {
  const getStoredValue = () => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const setStoredValue = (value) => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to storage:", error);
    }
  };

  return customRef((track, trigger) => ({
    get() {
      track();
      return getStoredValue();
    },
    set(newValue) {
      setStoredValue(newValue);
      trigger();
    },
  }));
}

/**
 * 创建可以批量更新的响应式状态
 */
export function useBatchReactive(initialState = {}) {
  const state = ref({ ...initialState });
  const pendingUpdates = ref({});
  let updateTimeout = null;

  const queueUpdate = (key, value) => {
    pendingUpdates.value[key] = value;

    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    updateTimeout = setTimeout(() => {
      // 批量应用更新
      Object.assign(state.value, pendingUpdates.value);
      pendingUpdates.value = {};
      updateTimeout = null;
    }, 0);
  };

  const flushUpdates = () => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
      Object.assign(state.value, pendingUpdates.value);
      pendingUpdates.value = {};
      updateTimeout = null;
    }
  };

  return {
    state: readonly(state),
    queueUpdate,
    flushUpdates,
    setProp: (key, value) => queueUpdate(key, value),
  };
}

```
