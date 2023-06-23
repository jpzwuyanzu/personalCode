import Cookie from 'js-cookie'

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