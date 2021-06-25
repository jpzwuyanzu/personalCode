const util = {
        /*获取 storage 缓存数据
     * type  类型   local：localStorage   session：sessionStorage
     * name  缓存数据name名
     */
        getStorage:function(type, name) {
            var type = type || 'local';
            if (type == 'local') {
                var result = localStorage.getItem(name) ? localStorage.getItem(name) : "";
            } else if (type == 'session') {
                var result = sessionStorage.getItem(name) ? sessionStorage.getItem(name) : "";
            }
            return result;
        },
    
        /*设置 storage 缓存数据
         *type  类型   local：localStorage   session：sessionStorage
         *name  缓存数据name名
         *content  缓存的数据内容
         */
        setStorage:function(type, name, content) {
            var type = type || 'local';
            var data = content;
            if (typeof(data) == 'object') { data = JSON.stringify(content) };
            if (type == 'local') {
                localStorage.setItem(name, data);
            } else if (type == 'session') {
                sessionStorage.setItem(name, data);
            }
        }
}

export default util