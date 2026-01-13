---
outline: deep
---

## React19+ 编译器的 使用
::: details 自动处理记忆化，减少使用 `useMemo`，`useCallback`，和 `React.memo`
### 1. 安装
```bash
pnpm install -D babel-plugin-react-compiler@latest
```
### 2. 配置
> 19+ 默认是不需要配置的，17>version<19需要配置

:::details
:::code-group
```js [babel]
module.exports = {
    plugins: [
    'babel-plugin-react-compiler', // 必须首先运行！
    // ... 其他插件
    ],
    // ... 其他配置
};
```
```js [vite]
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
```
:::
## useEffect 组件生命周期钩子的使用


::: details 19+ 推荐使用编译器
> 19+正在逐渐减少 useEffect 的使用

```jsx
export const Hooks = () => {
    useEffect(() => {
        console.log("Hooks组件只要有更新都会执行一次")
    })

    useEffect(() => {
        console.log("初始化的时候执行一次")
    }, [])

    useEffect(() => {
        console.log("只有 userInfo.name, userInfo.age 变化的时候才会触发")
    }, [userInfo.name, userInfo.age])

    useEffect(() => {
        return () => {
            console.log("组件卸载的时候才会触发，建议写在空数组的形式中，做组件卸载时的回调函数使用")
        }
    }, [])
} 
```

:::

## useEffect 不同场景的卸载函数写法

:::details

### 1. 空依赖数组 [] - 最常用

- 事件监听 - 用空数组
- 定时器 - 用空数组
- ✅ 组件生命周期

```jsx
function Component() {
    useEffect(() => {
        console.log('🔵 组件挂载')

        // 初始化操作：事件监听、定时器、订阅等
        window.addEventListener('resize', handleResize)
        const timer = setInterval(() => {
        }, 1000)
        const subscription = api.subscribe()

        // 🎯 卸载清理：只在组件卸载时执行
        return () => {
            console.log('🔵 组件卸载清理')
            window.removeEventListener('resize', handleResize)
            clearInterval(timer)
            subscription.unsubscribe()
        }
    }, []) // ✅ 空数组 - 真正的组件卸载清理

    return <div>组件内容</div>
}
```

### 2. 有依赖数组 [dep] - 依赖变化时也清理

- API 订阅 - 用依赖数组

```jsx
function UserProfile({userId}) {
    useEffect(() => {
        console.log(`🟠 开始监听用户 ${userId}`)
        const subscription = api.subscribeToUser(userId)

        // 🎯 清理时机：userId 变化时 或 组件卸载时
        return () => {
            console.log(`🟠 停止监听用户 ${userId}`)
            subscription.unsubscribe()
        }
    }, [userId]) // ✅ 有依赖 - 依赖变化时也执行清理

    return <div>用户资料 {userId}</div>
}
```

### 3. 无依赖数组 - 每次渲染都清理（很少用）

```jsx
function Component() {
    useEffect(() => {
        console.log('🔴 Effect 执行')

        // 🎯 清理时机：每次渲染前 或 组件卸载时
        return () => {
            console.log('🔴 清理执行 - 太频繁了！')
        }
    }) // ❌ 无依赖 - 性能不好，通常避免使用

    return <div>组件内容</div>
}
```

:::

## useReducer 

::: details 整合状态逻辑
###  基础使用
```tsx
import {useReducer} from 'react';

interface State {
   count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>欢迎来到我的计数器</h1>

      <p>计数： {state.count}</p>
      <button onClick={addFive}>加 5</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```
### 高级用法
:::

## useCallback 

::: details 19+ 推荐使用编译器

:::

## useMemo 

::: details 19+ 推荐使用编译器
:::

## useCallback 与 useMemo 的深度区别
::: details useCallback 缓存函数，useMemo 缓存计算结果
- useCallback → 缓存函数 → 函数稳定性
  - useMemo → 缓存值 → 计算优化
- Callback 保函数，Memo 存结果 
  - 函数传子用 Callback，大数计算用 Memo
- 从简单的代码开始，在遇到性能问题时才考虑使用 `useCallback` 和 `useMemo`。使用性能分析工具（`React DevTools Profiler`）验证优化效果，避免过早优化。

| 特性   | useCallback                          | useMemo     |
|------|--------------------------------------|-------------|
| 缓存什么 | 	函数引用                                | 	任何类型的值     |
| 返回值  | 	函数                                  | 	计算值        |
| 主要用途 | 	函数引用稳定性                             | 	昂贵计算优化     |
| 等价写法 | 	useMemo(() => fn, deps)	useCallback | 不能替代        |
| 依赖数组 | 	依赖变化时重新创建函数                         | 	依赖变化时重新计算值 |

### 基础概念对比
:::code-group 
```js [基本语法差异]
// useCallback: 缓存函数本身
const memoizedFunction = useCallback(
  () => {
    // 函数逻辑
    doSomething(a, b)
  },
  [a, b] // 依赖数组
)

// useMemo: 缓存计算值
const memoizedValue = useMemo(
  () => {
    // 计算逻辑
    return expensiveCalculation(a, b)
  },
  [a, b] // 依赖数组
)
```
```js [实际等价关系]
// useCallback 可以用 useMemo 实现
const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
)

// 等价于
const memoizedCallback = useMemo(
  () => () => doSomething(a, b),
  [a, b]
)

// 但反过来不行！
// useMemo 无法用 useCallback 实现
```

### 详细使用场景对比
::: code-group
```js [场景 1：传递回调函数给子组件]
// ✅ useCallback 的正确场景
function Parent() {
  const [count, setCount] = useState(0)
  
  // 缓存回调函数，避免 Child 不必要重渲染
  const handleClick = useCallback(() => {
    console.log('Clicked:', count)
    setCount(c => c + 1)
  }, []) // 注意：这里没有 count 依赖，使用函数式更新
  
  return <Child onClick={handleClick} />
}

// 使用 React.memo 的子组件
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered')
  return <button onClick={onClick}>Click me</button>
})
```
```js [场景 2：缓存昂贵的计算结果]
// ✅ useMemo 的正确场景
function ExpensiveComponent({ items, filter }) {
  // 缓存过滤结果，避免每次渲染都重新计算
  const filteredItems = useMemo(() => {
    console.log('重新过滤...')
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter]) // 只有 items 或 filter 变化时才重新计算
  
  // 另一个计算：统计数据
  const stats = useMemo(() => {
    return {
      total: filteredItems.length,
      average: calculateAverage(filteredItems)
    }
  }, [filteredItems])
  
  return (
    <div>
      <div>总数: {stats.total}</div>
      <div>平均: {stats.average}</div>
      <ItemList items={filteredItems} />
    </div>
  )
}
```
### 深入理解区别
:::code-group
```js [1. 引用稳定性是关键]
function Component() {
  const [count, setCount] = useState(0)
  
  // ❌ 每次渲染都创建新函数
  const badFunction = () => console.log(count)
  
  // ✅ useCallback: 缓存函数引用
  const goodFunction = useCallback(() => {
    console.log(count)
  }, [count])
  
  // ✅ useMemo: 缓存值（包括函数）
  const alsoGoodFunction = useMemo(() => {
    return () => console.log(count)
  }, [count])
  
  useEffect(() => {
    // badFunction 每次都会导致 effect 重新执行
    console.log('Effect runs')
  }, [badFunction]) // ❌ 依赖总是变化
  
  useEffect(() => {
    console.log('Effect runs only when count changes')
  }, [goodFunction]) // ✅ 依赖稳定
  
  return <div>Count: {count}</div>
}
```
```js [2. 性能影响不同]
// Benchmark 测试场景
function PerformanceTest() {
  const [data, setData] = useState(largeDataset)
  
  // useCallback: 影响函数创建开销
  // 假设创建函数成本低，但传递引用影响子组件渲染
  const processWithCallback = useCallback(() => {
    // 函数体
  }, [data])
  
  // useMemo: 影响计算开销
  // 假设计算成本高，需要缓存结果
  const processedData = useMemo(() => {
    return expensiveTransform(data) // 耗时操作
  }, [data])
  
  return (
    <div>
      {/* Child 只关心函数引用是否变化 */}
      <Button onClick={processWithCallback} />
      
      {/* List 只关心数据是否变化 */}
      <List items={processedData} />
    </div>
  )
}
```

### 常见误区与正确用法
:::code-group
```js [误区 1：过度使用 useCallback]
// ❌ 不必要的 useCallback
function SimpleButton() {
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, []) // 简单函数不需要缓存
  
  // ✅ 直接定义即可
  const handleClick = () => console.log('clicked')
  
  return <button onClick={handleClick}>Click</button>
}
```
```js [误区 2：用错场景]
function UserProfile({ user }) {
  // ❌ useCallback 用于缓存值
  const userName = useCallback(
    user.name.toUpperCase(),
    [user.name]
  ) // 错误：返回字符串，不是函数
  
  // ✅ useMemo 用于缓存值
  const userName = useMemo(
    () => user.name.toUpperCase(),
    [user.name]
  )
  
  // ❌ useMemo 用于简单函数
  const handleClick = useMemo(
    () => () => console.log('click'),
    []
  ) // 可以但过度，应该用 useCallback
  
  // ✅ useCallback 用于函数
  const handleClick = useCallback(
    () => console.log('click'),
    []
  )
  
  return <div>{userName}</div>
}
```
```js [误区 3：依赖数组错误]
function Component() {
  const [state, setState] = useState({ a: 1, b: 2 })
  
  // ❌ 依赖整个对象，总是变化
  const calculation = useMemo(() => {
    return state.a + state.b
  }, [state]) // state 引用总是变化
  
  // ✅ 依赖具体属性
  const calculation = useMemo(() => {
    return state.a + state.b
  }, [state.a, state.b]) // 只有 a 或 b 变化才重新计算
  
  // ❌ useCallback 忘记依赖
  const updateState = useCallback((newVal) => {
    setState(prev => ({ ...prev, a: prev.a + newVal }))
  }, []) // 可以，因为使用函数式更新
  
  return <div>{calculation}</div>
}
```
### 高级组合用法
:::code-group
```js [1. 结合使用场景]
function ComplexComponent({ data, onDataChange }) {
  // 1. useMemo 处理数据
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      score: calculateScore(item),
      formattedDate: formatDate(item.date)
    }))
  }, [data])
  
  // 2. useCallback 处理事件
  const handleItemSelect = useCallback((itemId) => {
    const selected = processedData.find(item => item.id === itemId)
    onDataChange(selected)
  }, [processedData, onDataChange]) // 依赖 memoized 值
  
  // 3. useMemo 生成配置对象
  const config = useMemo(() => ({
    theme: 'dark',
    onSelect: handleItemSelect,
    items: processedData
  }), [handleItemSelect, processedData])
  
  // 4. 子组件使用稳定引用
  return <DataGrid config={config} />
}
```
```js [2. 自定义 Hook 中的应用]
// 自定义 Hook 示例
function useDataProcessor(initialData) {
  const [data, setData] = useState(initialData)
  
  // useMemo: 处理数据
  const processedData = useMemo(() => 
    expensiveProcessing(data),
    [data]
  )
  
  // useCallback: 提供操作函数
  const updateData = useCallback((newData) => {
    setData(prev => mergeData(prev, newData))
  }, [])
  
  const resetData = useCallback(() => {
    setData(initialData)
  }, [initialData])
  
  return {
    data: processedData,    // memoized 值
    updateData,            // memoized 函数
    resetData             // memoized 函数
  }
}
```
```js [3. 与 Context 配合]
const DataContext = createContext()

function DataProvider({ children }) {
  const [state, setState] = useState(initialState)
  
  // useMemo: 缓存 context 值
  const contextValue = useMemo(() => ({
    state,
    // useCallback: 缓存方法
    update: useCallback((updater) => {
      setState(updater)
    }, []),
    reset: useCallback(() => {
      setState(initialState)
    }, [initialState])
  }), [state])
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}
```
:::
