
//封装storage

/*获取 storage 缓存数据
* type  类型   local：localStorage   session：sessionStorage
* name  缓存数据name名
*/
export function getStorage(type: string, name: any) {
    let types = type || 'local';
    var result:any = "";
    if (types === 'local') {
         result = localStorage.getItem(name) ? localStorage.getItem(name) : "";
    } else if (types === 'session') {
        result = sessionStorage.getItem(name) ? sessionStorage.getItem(name) : "";
    }
    return result;
}

/*设置 storage 缓存数据
*type  类型   local：localStorage   session：sessionStorage
*name  缓存数据name名
*content  缓存的数据内容
*/
export function setStorage(type: string, name: any, content: any) {
    let types = type || 'local';
    var data = content;
    if (typeof (data) === 'object') {
        data = JSON.stringify(content)
    };
    if (types === 'local') {
        localStorage.setItem(name, data);
    } else if (types === 'session') {
        sessionStorage.setItem(name, data);
    }
}

export function removeStorage(type?: any) {
    let types = type || 'local';
    if (types === 'local') {
        localStorage.clear()
    } else if (types === 'session') {
        sessionStorage.clear()
    }
}

//封装获取url参数
export function getQueryString(name: string) {
    var search = '?' + window.location.href.split('?')[1];
    var pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
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
    let day = end.getDate();
    let dateObj: any = {};
    dateObj.end = year + '-' + (month > 9 ? month : '0'+ month) + '-' + (day > 9 ? day : '0'+day);
    let endMonthDay = new Date(year, month, 0).getDate();//当前月的总天数
    if (month - 1 <= 0) { //如果是1月，年数往前推一年<br>　　　　
        dateObj.start = (year - 1) + '-' + 12 + '-' + day;
    } else {
        let startMonthDay = new Date(year, (parseInt((month as any)) - 1), 0).getDate();
        if (startMonthDay < day) {//1个月前所在月的总天数小于现在的天日期
            if (day < endMonthDay) {//当前天日期小于当前月总天数
                dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0'+(month - 1)) + '-' + ((startMonthDay - (endMonthDay - day)) > 9 ? (startMonthDay - (endMonthDay - day)) : '0'+(startMonthDay - (endMonthDay - day)));
            } else {
                dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0'+(month - 1)) + '-' + (startMonthDay > 9 ? startMonthDay : '0'+startMonthDay);
            }
        } else {
            dateObj.start = year + '-' + ((month - 1) > 9 ? (month - 1) : '0'+(month - 1)) + '-' + (day > 9 ? day : '0'+day);
        }
    }
    return  [dateObj.start,  dateObj.end]
}

//判断是安卓还是ios
export function judgeMobile() {
    let plat = ''
    if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        if(((/iphone/gi.test(navigator.userAgent) && window.screen.height === 812 && window.screen.width === 375) || (/iphone/gi.test(navigator.userAgent) && window.screen.height === 896 && window.screen.width === 414) || (/iphone/gi.test(navigator.userAgent) && Math.floor((window.screen.height / window.screen.width) * 100) === 216))) {
            plat = 'iosX'
        } else {
            plat = 'ios'
        }
    } else {
        plat='android'
    }
    return plat
}

//压缩图片
/**
 * 压缩方法 
 * @param {string} file 文件
 * @param {Number} quality  0~1之间
*/
export function compressImg(file: any, quality: any):any {
    if (file[0]) {
      return Promise.all(Array.from(file).map(e => compressImg(e as any, quality as any))) // 如果是 file 数组返回 Promise 数组
    } else {
      return new Promise((resolve) => {
        const reader: any = new FileReader() // 创建 FileReader
        reader.onload = ({target: {result: src}}:any) => {
          const image: any = new Image() // 创建 img 元素
          image.onload = async () => {
            const canvas:any = document.createElement('canvas') // 创建 canvas 元素
            canvas.width = image.width
            canvas.height = image.height
            canvas?.getContext('2d').drawImage(image, 0, 0, image.width, image.height) // 绘制 canvas
            const canvasURL = canvas.toDataURL('image/jpeg', quality)
            const buffer = atob(canvasURL.split(',')[1])
            let length = buffer.length
            const bufferArray = new Uint8Array(new ArrayBuffer(length))
            while (length--) {
              bufferArray[length] = buffer.charCodeAt(length)
            }
            const miniFile = new File([bufferArray], file.name, {
              type: 'image/jpeg'
            })
            resolve({
              file: miniFile,
              origin: file,
              beforeSrc: src,
              afterSrc: canvasURL,
              beforeKB: Number((file.size / 1024).toFixed(2)),
              afterKB: Number((miniFile.size / 1024).toFixed(2))
            })
          }
          image.src = src
        }
        reader.readAsDataURL(file)
      })
    }
  }