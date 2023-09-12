import Cookie from 'js-cookie'

export function setCookieItem(key: string, value: string) {
    Cookie.set(key, value)
}

export function getCookieItem(key: string): any {
    return Cookie.get(key)
}

export function removeCookieItem(key: string) {
    Cookie.remove(key)
}

//封装storage

/*获取 storage 缓存数据
* type  类型   local：localStorage   session：sessionStorage
* name  缓存数据name名
*/
export function getStorage(type: string, name: any) {
    var type = type || 'local';
    if (type == 'local') {
        var result: any = localStorage.getItem(name) ? localStorage.getItem(name) : "";
    } else if (type == 'session') {
        var result: any = sessionStorage.getItem(name) ? sessionStorage.getItem(name) : "";
    }
    return result;
}

/*设置 storage 缓存数据
*type  类型   local：localStorage   session：sessionStorage
*name  缓存数据name名
*content  缓存的数据内容
*/
export function setStorage(type: string, name: any, content: any) {
    var type = type || 'local';
    var data = content;
    if (typeof (data) == 'object') {
        data = JSON.stringify(content)
    };
    if (type == 'local') {
        localStorage.setItem(name, data);
    } else if (type == 'session') {
        sessionStorage.setItem(name, data);
    }
}

export function removeStorage(type?: any) {
    var type = type || 'local';
    if (type == 'local') {
        localStorage.clear()
    } else if (type == 'session') {
        sessionStorage.clear()
    }
}

//封装获取url参数
export function getQueryString(name: string) {
    var search = '?' + window.location.href.split('?')[1];
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

//获取url后边的参数
export function getLocationStr(name: string) {
    const search = window.location.search; // 获取 URL 中的查询字符串，如 "?foo=bar"
    const params = new URLSearchParams(search); // 使用 URLSearchParams 解析查询字符串
    const str = params.get(name); // 获取参数 "foo" 的值
    return str
}

//日期格式化
export function parseDataType(time: any) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // 输出结果：2014-04-23 18:55:49
    return Y + M + D + h + m + s
}

//苹果日期格式化
export function parseDataIosType(time: any) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    let Y = date.getFullYear() + '/';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // 输出结果：2014-04-23 18:55:49
    return Y + M + D + h + m + s
}
//获取近一个月的日期
export function getRecentMounth() {
    let end = new Date();
    let year = end.getFullYear();
    let month = end.getMonth() + 1;//0-11表示1-12月
    let day = end.getDate() + 1;
    let dateObj: any = {};
    dateObj.end = year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);
    let endMonthDay = new Date(year, month, 0).getDate();//当前月的总天数
    if (month - 1 <= 0) { //如果是1月，年数往前推一年<br>　　　　
        dateObj.start = (year - 1) + '-' + 12 + '-' + day;
    } else {
        let startMonthDay = new Date(year, (parseInt((month as any)) - 1), 0).getDate();
        if (startMonthDay < day) {//1个月前所在月的总天数小于现在的天日期
            if (day < endMonthDay) {//当前天日期小于当前月总天数
                dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0' + (month - 1)) + '-' + ((startMonthDay - (endMonthDay - day)) > 9 ? (startMonthDay - (endMonthDay - day)) : '0' + (startMonthDay - (endMonthDay - day)));
            } else {
                dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0' + (month - 1)) + '-' + (startMonthDay > 9 ? startMonthDay : '0' + startMonthDay);
            }
        } else {
            dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0' + (month - 1)) + '-' + (day > 9 ? day : '0' + day);
        }
    }
    return [dateObj.start, dateObj.end]
}

//获取近三个月日期
export function getRecentThreeMounth() {
    let end = new Date();
    let year = end.getFullYear();
    let month: any = end.getMonth() + 1;//0-11表示1-12月
    let day = end.getDate();
    let dateObj: any = {};
    dateObj.end = year + '-' + month + '-' + day;
    let endMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
    if (month - 3 <= 0) { //如果是1、2、3月，年数往前推一年
        let start3MonthDay = new Date((year - 1), (12 - (3 - parseInt(month))), 0).getDate(); //3个月前所在月的总天数
        if (start3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
            dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + start3MonthDay;
        } else {
            dateObj.start = (year - 1) + '-' + (12 - (3 - month)) + '-' + day;
        }
    } else {
        let start3MonthDay = new Date(year, (parseInt(month) - 3), 0).getDate(); //3个月前所在月的总天数
        if (start3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
            if (day < endMonthDay) { //当前天日期小于当前月总天数,2月份比较特殊的月份
                dateObj.start = year + '-' + (month - 3) + '-' + (start3MonthDay - (endMonthDay - day));
            } else {
                dateObj.start = year + '-' + (month - 3) + '-' + start3MonthDay;
            }
        } else {
            dateObj.start = year + '-' + (month - 3) + '-' + day;
        }
    }
    return [dateObj.start, dateObj.end]
}

export function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}