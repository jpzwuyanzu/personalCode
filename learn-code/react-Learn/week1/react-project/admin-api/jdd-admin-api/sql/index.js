const {Collection} = require('./db')

module.exports = {
    insert (CollectionName, insertData) {
        return new Promise((resolve,reject) => {
            //node 中错误优先回掉原则
            CollectionName.insertMany(insertData, (err) => {
                if (err) throw err;
                resolve()
            })
        })
    },
    delete (CollectionName, whereData, deleteNum) {
        return new Promise(resolve => {
            const deleteType = deleteNum === 1 ? 'deleteMany' : 'deleteOne'
            CollectionName[deleteType](whereData, err => {
                if (err) throw err;
                resolve()
            })
        })
    },
    update (CollectionName,whereData,updateData) {
        const updateType = updateNum === 1 ? 'updateMany' : 'updateOne'
        return new Promise(resolve => {
            CollectionName[updateType](whereData, updateData, err => {
                if (err) throw err;
                resolve()
            })
        })
    },
    find (CollectionName, whereData, showData) {
        return new Promise(resolve => {
            CollectionName.find(whereData, showData).exec((err, data) => {
                if (err) throw err;
                resolve(data)
            })
        })
    },
    paging (CollectionName,whereData, showData, count, limitNum) {
        limitNum = limitNum || 10
        count = count || 1
        return new Promise(resolve => {
            //表示页码不是从0开始，从1开始
            CollectionName.find(whereData,showData).limit(limitNum).skip((count -1) * 
            limitNum).exec((err,data) => {
                if (err) throw err
                resolve(data)
            })
        })
    }
}