/* Practive with nodemon */
/*
https://stackoverflow.com/questions/38323880/error-eacces-permission-denied
*/
// const foo = 'bar'
// const interval = setInterval(() => console.log(foo), 1000)
// setTimeout(() => clearInterval(interval), 5000)

const fs = require('fs')
const http = require('http')
console.log(process)

// fs.readFile('./node-practice-users.json', (err, data) => {
//   if (err) console.log(err)
//   else console.log(data.toString())
// })

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      err ? reject(err) : resolve(data.toString())
    })
  })
}

// readFile('./node-practice-users.json')
//   .then(data => console.log(data))
//   .catch(ex => console.log(ex))

// http
//   .createServer((req, res) => {
//     res.write('hello world!')
//     res.end()
//   })
//   .listen(3000)

const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      err ? reject(err) : resolve()
    })
  })
}

// writeFile(
//   './node-practice-users.json',
//   JSON.stringify([{ id: 1, name: 'moe' }])
// )
//   .then(() => console.log('success!'))
//   .catch(() => console.log('failure!'))

const addUser = user => {
  return readFile('./node-practice-users.json')
    .then(data => {
      const users = JSON.parse(data)
      let max = users.reduce((acc, user) => {
        if (user.id > acc) {
          acc = user.id
        }
        return acc
      }, 0)

      user.id = max + 1
      users.push(user)
      return writeFile('./node-practice-users.json', JSON.stringify(users))
    })
    .then(() => console.log(user))
}

addUser({ name: `curly-${Math.random()}` }).then(user => console.log(user))

http
  .createServer((req, res) => {
    if (req.url === '/api/node-practice-users') {
      readFile('./node-practice-users.json')
        .then(data => {
          res.write(data)
          res.end()
        })
        .catch(ex => {
          res.statusCode = 500
          res.write(ex.message)
          res.end()
        })
    } else if (req.url === '/') {
      readFile('./index.html')
        .then(data => {
          res.write(data)
          res.end()
        })
        .catch(ex => {
          res.statusCode = 500
          res.write(ex.message)
          res.end()
        })
    }
  })
  .listen(3000)
