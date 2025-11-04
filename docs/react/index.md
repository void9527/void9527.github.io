---
outline: deep
---
## React19 推荐依赖
:::details
```json [package.json]
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.0.0",
    "valtio": "^2.0.0",
    "@tanstack/react-query": "^5.0.0",
    "react-i18next": "^13.0.0",
    "i18next": "^23.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vite-plugin-compression": "^0.5.0"
  }
}
```
:::
## useEffect 组件生命周期钩子的使用
```jsx
export const Hooks = () =>{
  useEffect(()=>{
    console.log("Hooks组件只要有更新都会执行一次")
  })

  useEffect(()=>{
    console.log("初始化的时候执行一次")
  },[])

  useEffect(()=>{
    console.log("只有 userInfo.name, userInfo.age 变化的时候才会触发")
  },[userInfo.name, userInfo.age])

  useEffect(()=>{
    return ()=>{
      console.log("组件卸载的时候才会触发，建议写在空数组的形式中，做组件卸载时的回调函数使用")
    }
  },[])
} 
```
## 不同场景的卸载函数写法
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
    const timer = setInterval(() => {}, 1000)
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
function UserProfile({ userId }) {
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