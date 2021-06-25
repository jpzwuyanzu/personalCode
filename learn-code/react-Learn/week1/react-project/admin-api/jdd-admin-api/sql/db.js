var mongoose = require('mongoose');
var DB_URL = "mongodb://localhost:27017/sz-gp-4";


mongoose.connect(DB_URL, { useNewUrlParser: true,useUnifiedTopology: true  })

mongoose.connection.on('connected',() => {
    console.log('db connect success')
})

mongoose.connection.on('disconnected',() => {
    console.log('db connect fail')
})

mongoose.connection.on('error',() => {
    console.log('db connect error')
})

module.exports = mongoose