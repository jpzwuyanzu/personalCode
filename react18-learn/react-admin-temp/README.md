## 新搭建react后台管理系统(react)

### 1. 创建项目(使用pnpm)
1. pnpm create vite

### 2. 整理结构
main.tsx
```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```