---
outline: deep
---

# Pinia

## 用setup方式编写pinia无法调用reset时

:::details

```js
import cloneDeep from 'lodash.clonedeep';
import { createPinia } from 'pinia';

function storeReset({ store }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}

const pinia = createPinia();
pinia.use(StoreReset);
```

:::
