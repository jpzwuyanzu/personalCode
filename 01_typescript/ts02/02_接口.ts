// 接口 : 一种约束
(() => {
    interface IPerson {
        firstName: string   // 姓
        lastName: string    // 名
    }
    // 输出全名
    function showFullName (person: IPerson) {
        return person.firstName + '_' +  person.lastName
    }
    // 定义一个对象
    const person = {
        firstName: '东方',
        lastName: '不败'
    }
    console.log(showFullName(person))
})()
