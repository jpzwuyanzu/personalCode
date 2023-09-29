### 搭建支付

### 支付接口等待调试

### useState改变值之后立刻获取最新的状态

##### useSyncCallback.tsx

```tsx
import { useEffect, useState, useCallback } from 'react';

const useSyncCallback = callback => {
    const [proxyState, setProxyState] = useState({ current: false });

    const Func = useCallback(() => {
        setProxyState({ current: true });
    }, [proxyState])

    useEffect(() => {
        if (proxyState.current === true) setProxyState({ current: false });
    }, [proxyState])

    useEffect(() => {
        proxyState.current && callback();
    })

    return Func
}

export default useSyncCallback;
```
##### App.tsx
```tsx
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setstate(2);
    func(); // 打印 2
  };
  /** 将func的方法传递给useSyncCallback然后返回一个新的函数 */
  const func = useSyncCallback(() => {
    console.log(count);
  });

  return (
    <div className="App">
       <button onClick={handleClick}>点击</button>
    </div>
  );
}

export default App;
```