// 参数一是本地配置的路由menus， 

//参数二是服务器端获取到的权限keys数组 eg: ["0-0", "0-1", "0-1-0", "0-1-1", "0-2", "0-2-0", "0-2-1", "0-2-2", "0-3", "0-3-0", "0-3-1", "0-4-0", "0-5", "0-5-0", "0-5-1", "0-6", "0-4"]
// const lastarr = ["0-1", "0-1-0", "0-1-1", "0-2", "0-2-0", "0-2-1", "0-2-2", "0-3", "0-3-0", "0-3-1", "0-4", "0-4-0", "0-5", "0-5-0", "0-5-1", "0-6"]
export function getMenu (menus, lastarr) {
    console.log(menus)
    console.log(lastarr)
    const arr1 = []
    lastarr.forEach(item => {
        const index1 = item.split('-')[1] //一级菜单的index
        const index2 = item.split('-')[2] //二级菜单的index

        let obj = {
            path: menus[index1].path,
            key: menus[index1].key,
            title: menus[index1].title,
            icon: menus[index1].icon,
            component: menus[index1].component,
            meta:menus[index1].meta
        }

        if(index2) {
            !arr1[arr1.length - 1].children && (arr1[arr1.length - 1].children = [])
            arr1[arr1.length - 1].children.push({
                path: menus[index1].children[index2].path,
                key: menus[index1].children[index2].key,
                title: menus[index1].children[index2].title,
                icon: menus[index1].children[index2].icon,
                component: menus[index1].children[index2].component,
                meta: menus[index1].children[index2].meta
            })
        }

        !arr1.some(itm => itm.key === obj.key) && arr1.push(obj)
    })
    return arr1
}