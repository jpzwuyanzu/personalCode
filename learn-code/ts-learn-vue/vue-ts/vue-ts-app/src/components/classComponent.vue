<template>
  <div id="app">
    <h2>类组件</h2>
    <span>{{revermsg}}</span>
    <button @click="test('2222')">测试类组件点击事件</button>
    <div>
        <input type="text" v-model="name" v-focus>
    </div>
    <p>{{proid}}--- {{titile}}</p>
    <div ref="bbox">ref</div>
    <div>{{ sex | sexFilter('animal') }}</div>
  </div>
</template>

<script lang="ts">
//  类组件 + 扩展式组件 + 函数式组件
import { Vue, Component , Watch, Prop, Ref} from 'vue-property-decorator'

//  使用装饰器去装饰该组件
@Component({
    directives: { //自定义指令
        focus: { // 指令的名称 使用的时候 v-focus
            inserted: function(el) { //el代表的是Dom元素
                el.focus()
            } 
        }
    },
    filters: {  //自定义过滤器, 可以传参数， 默认第一个参数是｜前的属性
        sexFilter (val: number, type: string) { 
            if(type === 'person') {
                return val === 1 ? '男' : '女'
            } else {
                return val === 1 ? '公' : '母'
            }
         }
    }
})
export default class App extends Vue {

    //ref 感叹号代表非空断言 属性后边加上！  如果没有后续业务逻辑，可以使用联合类型 string | undefined  
    @Ref('bbox')
    bboxing!: HTMLDivElement

    mounted(): void {
        this.bboxing.style.background = '#00f'
    }


    // 子组件要接收父组件传递的数据,通过@Prop装饰器来实现
    //子组件接收父组件传递的参数
    //可以设置只读参数
    // 加上require: true 代表必传参数
    // 加上default: value 代表默认值
    @Prop({ required: true })
    readonly proid: string | undefined

    // 问号代表可选参数
    // string ｜ undefined 代表联合类型
    @Prop({ default: '默认标题' }) //默认参数，父组件可以传递也可以不传递，设置了默认值
    readonly titile?: string | undefined



    // error  Type string trivially inferred from a string literal, remove type annotation 表示不需要添加类型注解
    // 初始化数据不需要添加类型
    msg = 'hello test'
    name = ''
    obj = {id:1, name: '1212', child:{ name:'0000' }}
    sex = 0

    //计算属性
    get revermsg (): string {
        return this.msg.split('').reverse().join('-')
    }

    get newObj (): string {
        return JSON.parse(JSON.stringify(this.obj))
    }

    //自定义事件
    test(str: string): void {
        console.log('67676767' + str)
        this.obj.child.name = '99999999'
    }

    //@侦听属性
    @Watch('name')
    onNameChange<T>(newVal: T, oldVal: T): void{
        console.log(newVal, oldVal)
    }

    //  @Watch('obj.child.name')
    // onObjChange(newVal, oldVal) {
    //     console.log(newVal, oldVal)
    // }

    // 深度监听
     @Watch('newObj', { deep: true, immediate: true })
    onObjChange<T>(newVal: T, oldVal: T): void {
        console.log(newVal, oldVal)
    }
}

</script>