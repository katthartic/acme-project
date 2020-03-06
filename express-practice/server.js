const express = require('express')
const path = require('path')
const app = express() //same as creating http.createServer()
const db = require('./db') //create module
const port = process.env.PORT || 3000

// console.log(path.join(__dirname, 'index.html'))

app.get('/', (req, res, next) => {
  console.log(`HITTING: ${req.url} - ${req.method}`)
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', async (req, res, next) => {
  // try {
  //   res.send(await db.readUsers())
  // } catch (ex) {
  //   next(ex)
  // }
  db.readUsers()
    .then(users => res.send(users))
    .catch(next)
})

app.get('/api/users', async (req, res, next) => {
  res.send(await db.readUsers())
})

app.listen(port, () => console.log(`listening on port ${port}`))
