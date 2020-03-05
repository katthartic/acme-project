const express = require('express')
const path = require('path')
const app = express()
const db = require('./db') //create module

console.log(path.join(__dirname, 'index.html'))
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', (req, res, next) => {
  res.send(db.getUsers())
})

app.listen(3000, () => console.log('listening on port 3000'))
