---
outline: deep
---

### props 类型

```ts
// 3.5+
interface Props {
  msg?: string;
  labels?: string[];
}

const { msg = "hello", labels = ["one", "two"] } = defineProps<Props>();
```

### 组件类型

```ts
import { computed, reactive, ref, useTemplateRef } from "vue";
import keyboard from "@/stores/keyboard";

const colorKeyboards =
  useTemplateRef<InstanceType<typeof Keyboard | null>>("Keyboard");
```
[TS 与组合式 API](https://cn.vuejs.org/guide/typescript/composition-api.html)