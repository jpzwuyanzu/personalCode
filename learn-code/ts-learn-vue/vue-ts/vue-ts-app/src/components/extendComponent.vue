<template>
    <div>
        <h2>扩展式组件</h2>
        <span>{{revermsg}}</span>
        <button @click="test">测试组件点击事件</button>
        <div>
            <input type="text" v-model="name" v-focus>
        </div>
        <p>{{proid}}</p>
        <div ref="box">ref</div>
        <div>{{sex | sexFilter}}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    // props:['proid'],
    // props:{
    //     proid: String
    // },
    props:{
        proid:{
            type:String,
            required:true,
            default:'hahha'
        }
    },
    data () {
        return {
            msg: 'hello world',
            name:'',
            obj: { id: 1, name: 'lixiangyang',child: {name:'1111'} },
            sex: 0
        }
    },
    computed: {
        revermsg (): string {
            return this.msg.split('').reverse().join('')
        }
    },
    methods: {
        test() {
            console.log('898989')
            this.obj.child.name = '1000000'
        }
    },
    watch: {
        name( newVal: string, oldVal: string ) {
            console.log(newVal, oldVal)
        },
        'obj.name' (newVal: string, oldVal: string) {
            console.log(newVal, oldVal)
        },
        // obj<T>(newVal: T, oldVal: T) {
        //     console.log(newVal, oldVal)
        // }
        obj:{
            deep: true,
            immediate: true,
            handler (newVal, oldVal) {
                console.log(newVal, oldVal)
            }
        }
    },
    mounted () {
        //断言为HTMLDivElement
        // const dom: HTMLDivElement = this.$refs.box as HTMLDivElement
        // dom.style.background = "#f666"
        (this.$refs.box as HTMLDivElement).style.background = '#f66'
    },

    //过滤器 --- 全局过滤器 --- 局部过滤器
    filters:{
        sexFilter (val: number): string {
            return val === 1 ? '男' : '女'
        }
    },
    //自定义指令
    directives:{
        focus:{
            inserted: function(el) {
                el.focus()
            }
        }
    }

})
</script>