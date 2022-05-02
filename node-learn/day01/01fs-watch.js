const fs = require('fs')

fs.watchFile('1.txt', (newVal, oldval) => {
    console.log('newVal:', newVal)
    console.log('oldVal:', oldval)
})