const express = require('express');

const app = express()

app.get('/', (req, res) => {
    res.send('get hello world')
})
app.post('/',(req, res) => {
    res.send('post hello world')
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})