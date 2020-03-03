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
    } else {
      res.write('hello world!')
      res.end()
    }
  })
  .listen(3000)
