const express = require('express')
const path = require('path')
const app = express()
const db = require('./db')

// ('./users.json', (item, items) => {
//   if (!item.name) {
//     return 'name is required'
//   }
//   if (items.map(i => i.name).includes(item.name)) {
//     return 'name must be unique'
//   }
// })

app.use((req, res, next) => {
  console.log(`called ${req.method} on ${req.url}`)
  next()
})

app.use(express.json()) //middleware

console.log(path.join(__dirname, 'index.html'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', async (req, res, next) => {
  try {
    res.send(await db.getUsers())
  } catch (ex) {
    next(ex)
  }
})

app.post('/api/users', async (req, res, next) => {
  try {
    res.send(await db.createUser(req.body))
  } catch (ex) {
    next(ex)
  }
})

// db.createUser({ name: 'Bauer' }).then(console.log)

app.listen(3000, () => console.log('listening on port 3000'))
