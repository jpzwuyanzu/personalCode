// 类型注解： 是一种轻量级为函数或者变量添加的约束
(function () {
    function showMsg(str) {
        return '窗前明月光';
    }
    var text = '疑似地上霜';
    //  let text = [1,2,3]
    console.log(showMsg(text));
})();
