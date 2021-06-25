"use strict";
// 反转
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else {
        return x.split('').reverse().join('');
    }
}
console.log(reverse(123));
console.log(reverse('hello'));
