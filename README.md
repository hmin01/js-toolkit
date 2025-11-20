# js-toolkit

> **JavaScript 유틸리티 라이브러리**

---

## 설치

```bash
npm install @hmin/js-toolkit
# 또는
yarn add @hmin/js-toolkit
```

## Examples

```ts
import { debounce } from "@hmin/js-toolkit";

const debounced = debounce(() => {
  console.log("Hello, world");
}, 100);
// Call
debounced();
```
