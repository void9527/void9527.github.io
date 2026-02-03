---
outline: deep
---

:::details 最简案例
:::code-group
```ts [store.ts]
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
export const useStore = create(
  immer(
    subscribeWithSelector((set, get) => ({
      who: "zustand",
      setWho: (who) =>
        set({
          who: who,
        }),
      count: 0,
      increment: () =>
        // 回调函数就可以使用内部的state
        set((state) => {
          state.count++;
        }),
      name: "历史",
      getState: () => get().name,
    }))
  )
);

useStore.subscribe(
  (state) => state.count,
  (a, b) => {
    console.log("新数据:", a, "旧数据:", b);
  }
);
```
```tsx [app.tsx]
import { useStore } from "./store";
function Child(props) {
  const { count, increment, getState } = useStore();
  return (
    <>
      <p>{getState()}</p>
      <div>prent:{props.count}</div>
      <div>child{count}</div>
      <button onClick={() => increment()}> increment </button>
    </>
  );
}

function App() {
  const { who, setWho, count } = useStore();
 
  return (
    <>
      <p> Hello {who}!</p>
      <button onClick={() => setWho("nwe value")}> setWho </button>
      <p> Hello {count}!</p>

      <Child count={count} />
    </>
  );
}

export default App;

```
:::

:::details 插件
:::code-group

:::
