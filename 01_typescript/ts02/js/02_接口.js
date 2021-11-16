// 接口 : 一种约束
(function () {
    // 输出全名
    function showFullName(person) {
        return person.firstName + '_' + person.lastName;
    }
    // 定义一个对象
    var person = {
        firstName: '东方',
        lastName: '不败'
    };
    console.log(showFullName(person));
})();
