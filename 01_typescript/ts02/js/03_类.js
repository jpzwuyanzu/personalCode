// ts中书写js中类
(function () {
    //定义一个类
    var Person = /** @class */ (function () {
        // 定义一个构造器
        function Person(firstName, lastName) {
            //更新属性数据
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = this.firstName + '_' + this.lastName;
        }
        return Person;
    }());
    //实例话对象
    var person = new Person('诸葛', '孔明');
    function showFullName(person) {
        return person.firstName + '__' + person.lastName;
    }
    console.log(showFullName(person));
})();
