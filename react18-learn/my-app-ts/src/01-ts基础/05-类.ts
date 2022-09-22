// 类
class Bus{
    public name = 'test' //公有属性可以随便访问
    private _list: any = [] //私有属性只能在自己的内部使用，子类都无法使用
    protected age = 122 //受保护的属性可以在自己的内部以及子类中访问
    public subscribe(cb: any) {
        this._list.push(cb)
    }
    public dispatch() {
        this._list.forEach((cb: any) => {
            cb&&cb()
        })
    }
}
var obj = new Bus()
obj.subscribe(() => {
    
})
console.log(obj.name)

export default {}