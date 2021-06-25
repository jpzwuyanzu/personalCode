### 计算属性computed

```js
const double = computed(() => state.count * 2)

```

* 这里会返回一个ref包装的响应式的值，获取的时候 double.value


#### 响应性的值在标签中会自动解开

#### 当一个 ref 值嵌套于响应式对象之中时，访问时会自动解开:
```js
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2),
})

// 无需再使用 `state.double.value`
console.log(state.double)
```

* 状态变化时可以使用 watchEffect 和 watch API 应用副作用


### 组合式api

* setup调用时机是在 beforeCreate 钩子之前被调用

* setup第一个参数props是响应式数据，不需要解构

* watchEffect 或 watch 会观察和响应 props 的更新：

```js
export default {
    props: { 
        name: string
    },
    setup(props) {
        watchEffect(() => {
            console.log(`name is ${props.name}`)
        })
    }
}
```
* props 对象对用户空间代码是不可变的

*第二个参数context 

```js
const myComponent = {
    setup(props, { attrs }) {
        function onClick() {
            console.log(attrs.foo) //一定是最新的引用，没有失去响应性
        }
    }
}
```

*attrs 和 slots 都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值。所以可以解构，无需担心后面访问到过期的值


### 响应式系统api

###  reactive ： 接收一个普通对象，然后返回该普通对象的响应式代理，等同于2.x的Vue.observable()

```js
const obj = reactive({ count: 0 })
```

* 基于 ES2015 的 Proxy 实现，返回的代理对象不等于原始对象。建议仅使用代理对象而避免依赖原始对象。

*类型定义

```js
function reactive<T extends object>(raw: T): T
```

### ref 接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 .value。

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

+ 如果传入 ref 的是一个对象，将调用 reactive 方法进行深层响应转换。

+ 注意当嵌套在 reactive Object 中时，ref 才会解套。从 Array 或者 Map 等原生集合类中访问 ref 时，不会自动解套：

```js
const arr = reactive([ref(0)])
// 这里需要 .value
console.log(arr[0].value)

const map = reactive(new Map([['foo', ref(0)]]))
// 这里需要 .value
console.log(map.get('foo').value)
```

* 类型定义

```js
interface Ref<T> {
    value: T
}
function ref<T>(value: T): Ref<T>
```

*有时我们可能需要为 ref 做一个较为复杂的类型标注。我们可以通过在调用 ref 时传递泛型参数来覆盖默认推导：

```js
const foo = ref<string | number>('foo') // foo 的类型: Ref<string | number>

foo.value = 123 // 能够通过！
```

### computed  

* 1, 传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。

```js
const count = ref(1)
const pulsOne = computed(() => count.value + 1)
console.log(plusOne.value)
plusOne.value++ // 错误！
```

* 2,或者传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态。

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  },
})

plusOne.value = 1
console.log(count.value) // 0
```

* 类型定义

```js
//只读
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// 可更改的
function computed<T>(options: {
  get: () => T
  set: (value: T) => void
}): Ref<T>
```

### readonly  传入一个对象（响应式或普通）或 ref，返回一个原始对象的只读代理。一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 依赖追踪
  console.log(copy.count)
})

// original 上的修改会触发 copy 上的侦听
original.count++

// 无法修改 copy 并会被警告
copy.count++ // warning!
```

### watchEffect 副作用函数两个参数

```js
```

+ watch 需要侦听特定的数据源，并在回调函数中执行副作用，默认情况是懒执行的，也就是说仅在侦听的数据源变更时才会执行回调

+ 对比watchEffect， watch允许我们

* 懒执行副作用

* 更明确哪些状态的改变会触发侦听器重新运行副作用

* 访问侦听状态变化前后的值

* 可以监听一个getter， 或者是可以监听一个ref

```js
//getter
const state = reactive({ count: 0 })
watch(
    () => state.count,
    (count, precount) => {
        /**/
    }
)

// ref
const count = ref(0)
watch(count, (count, precount) => {})

//多个数据源，使用数组

watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### 依赖注入

* inject 接受一个可选的的默认值作为第二个参数。如果未提供默认值，并且在 provide 上下文中未找到该属性，则 inject 返回 undefined。

```js
import { provide, inject } from 'vue'

const ThemeSymbol = Symbol()

const Ancestor = {
  setup() {
    provide(ThemeSymbol, 'dark')
  },
}


const Descendent = {
  setup() {
    const theme = inject(ThemeSymbol, 'light' /* optional default value */)
    return {
      theme,
    }
  },
}
 
```

* 注入的响应性, 可以使用 ref 来保证 provided 和 injected 之间值的响应：

```js
//提供者
const ThemeSymbol = Symbol()
const themeRef = ref('dark')
provide(ThemeSymbol, themeRef)


//使用者
const theme = inject(ThemeSymbol, ref('light'))

watchEffect(() => {
  console.log(`theme set to: ${theme.value}`)
})


```

* 类型定义

```ts
interface InjectionKey<T> extends Symbol {}

function provide<T>(key: InjectionKey<T> | string, value: T): void

// 未传，使用缺省值
function inject<T>(key: InjectionKey<T> | string): T | undefined
// 传入了默认值
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
```


* Vue 提供了一个继承 Symbol 的 InjectionKey 接口。它可用于在提供者和消费者之间同步注入值的类型：


```js
import { InjectionKey, provide, inject } from 'vue'

const key: InjectionKey<string> = Symbol()

provide(key, 'foo') // 类型不是 string 则会报错

const foo = inject(key) // foo 的类型: string | undefined


//如果使用字符串作为键或没有定义类型的符号，则需要显式声明注入值的类型：
const foo = inject<string>('foo') // string | undefined
```
### 模版Refs

* 当使用组合式 API 时，reactive refs 和 template refs 的概念已经是统一的。为了获得对模板内元素或组件实例的引用，我们可以像往常一样在 setup() 中声明一个 ref 并返回它：

```vue
<template>
  <div ref="root"></div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // 在渲染完成后, 这个 div DOM 会被赋值给 root ref 对象
        console.log(root.value) // <div/>
      })

      return {
        root,
      }
    },
  }
</script>
```

* 这里我们将 root 暴露在渲染上下文中，并通过 ref="root" 绑定到 div 作为其 ref。 
* 在 Virtual DOM patch 算法中，如果一个 VNode 的 ref 对应一个渲染上下文中的 ref，则该 VNode 对应的元素或组件实例将被分配给该 ref。
* 这是在 Virtual DOM 的 mount / patch 过程中执行的，因此模板 ref 仅在渲染初始化后才能访问。

* ref 被用在模板中时和其他 ref 一样：都是响应式的，并可以传递进组合函数（或从其中返回）。



### 响应式系统的工具集

* unref ：如果参数是一个 ref 则返回它的 value，否则返回参数本身
* 背后是  val = isRef(val) ? val.value : val 

```ts
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x) // unwrapped 一定是 number 类型
}
```

* toRef 可以用来为一个 reactive 对象的属性创建一个 ref。这个 ref 可以被传递并且能够保持响应性。

```js
const state = reactive({
  foo: 1,
  bar: 2,
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

* 当您要将一个 prop 中的属性作为 ref 传给组合逻辑函数时，toRef 就派上了用场：

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  },
}
```

* torefs 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。

```js
const state = reactive({
  foo: 1,
  bar: 2,
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型如下:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 对象 与 原属性的引用是 "链接" 上的
state.foo++
console.log(stateAsRefs.foo) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3

```

* 当想要从一个组合逻辑函数中返回响应式对象时，用 toRefs 是很有效的，该 API 让消费组件可以 解构 / 扩展（使用 ... 操作符）返回的对象，并不会丢失响应性：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2,
  })

  // 对 state 的逻辑操作

  // 返回时将属性都转为 ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以解构，不会丢失响应性
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar,
    }
  },
}
```

isRef 检查一个值是否为一个 ref 对象。

isProxy 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理。

### 高级响应式API

+ customref

+ shallowReactive 只为某个对象的私有（第一层）属性创建浅层的响应式代理，不会对“属性的属性”做深层次、递归地响应式代理，而只是保留原样。

+ shallowReadonly 只为某个对象的自有（第一层）属性创建浅层的只读响应式代理，同样也不会做深层次、递归地代理，深层次的属性并不是只读的。

+ shallowRef  创建一个 ref ，将会追踪它的 .value 更改操作，但是并不会对变更后的 .value 做响应式代理转换（即变更不会调用 reactive）

```js
const foo = shallowRef({})
// 更改对操作会触发响应
foo.value = {}
// 但上面新赋的这个对象并不会变为响应式对象
isReactive(foo.value) // false
```

toRaw  返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```


## 学习地址--- https://juejin.cn/post/6926822933721513998#heading-19


### https://juejin.cn/post/6955129410705948702

