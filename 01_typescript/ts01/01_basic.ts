(() => {
    function sayHi(str: string) {
        return '你好' + str
    }
    let text = 'xiaozi'
    console.log(sayHi(text))
})()

// ts中的文件中如果直接写js代码，在html中可以直接使用ts文件，在浏览器是可以直接加载
// 如果ts文件中有ts文件嗲吗，就需要把ts编译成js文件，再引入使用
// ts文件中函数中的形参如果使用了某个类型进行修饰，最终编译的js中是没有这个类型的
// ts文件中的变量是使用let进行修饰的，编译js之后就是var
