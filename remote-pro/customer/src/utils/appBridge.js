/**
 * appBridge模块
 */
/**
 * 引入 import appBridge from "./appBridge";
 * 
 * 调用原生方法（无参数）
 * appBridge.callApp('原生方法名称');
 * 
 * 调用原生方法（携带参数）
 * 
 * appBridge.callApp('原生方法名称', {
     data: 123213213
   });
 * 
 * 
**/


export default {
  // ios,android通讯
  callApp (fnName, data, callback) {

    function run () {
      if (callback) {
        window[fnName + 'Callback'] = function (...args) {
          window[fnName + 'Callback'] = null;
          callback(args);
        };
      }

      // ios
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.QieZiJs.postMessage(
          JSON.stringify(
            Object.assign(
              { action: fnName },
              data || {},
              callback ? { callback: `${fnName}Callback` } : {}
            )
          )
        );
      }
      // android
      if (QieZiJs && QieZiJs[fnName]) {
        if (data) {
          QieZiJs[fnName](data);
        } else {
          QieZiJs[fnName]();
        }
      }
    }

    try {
      run();
    } catch (e) {

    }
  }
}