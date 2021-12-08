/**
 * 
 * @param {*} storageType 存储类型 local/session
 * @param {*} name 名称
 * @returns 
 */
 const getStorage = (storageType, name) => {
    let storageTypes = storageType || 'local';
    let result = '';
    if (storageTypes === 'local') {
       result = localStorage.getItem(name) ? localStorage.getItem(name) : "";
    } else if (storageTypes === 'session') {
       result = sessionStorage.getItem(name) ? sessionStorage.getItem(name) : "";
    }
    return result;
}

/**
 * 
 * @param {*} storageType 存储类型 local/session
 * @param {*} name 名称
 * @param {*} content 存储内容
 */
const setStorage = (storageType, name, content) => {
    let storageTypes = storageType || 'local';
    let data = content;
    if (typeof(data) === 'object') { data = JSON.stringify(content) };
    if (storageTypes === 'local') {
        localStorage.setItem(name, data);
    } else if (storageTypes === 'session') {
        sessionStorage.setItem(name, data);
    }
}

export {
    getStorage,
    setStorage
}