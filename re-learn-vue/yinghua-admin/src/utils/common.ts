import Cookie from 'js-cookie'
 import dayjs from 'dayjs';

export function setCookieItem (key: string, value: string) {
    Cookie.set(key, value)
}

export function getCookieItem (key: string): any {
    return Cookie.get(key)
}

export function removeCookieItem (key: string) {
    Cookie.remove(key)
}


//封装storage

/*获取 storage 缓存数据
* type  类型   local：localStorage   session：sessionStorage
* name  缓存数据name名
*/
export function getStorage(type: string, name: string) {
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
 export function setStorage(type: string, name: string, content: any) {
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
 export function getQueryString (name: string) {
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

//日期格式化
export function parseDataType (time: any) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours()  + ':' : date.getHours()  + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); 
    // 输出结果：2014-04-23 18:55:49
    return Y+M+D+h+m+s
}

//苹果日期格式化
export function parseDataIosType (time: any) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    let Y = date.getFullYear() + '/';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours()  + ':' : date.getHours()  + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); 
    // 输出结果：2014-04-23 18:55:49
    return Y+M+D+h+m+s
}