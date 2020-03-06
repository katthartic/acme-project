const fs = require('fs')
const getUsersFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./users.json', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(data.toString()))
    })
  })
}

const readUsers = () => {
  return getUsersFromFile()
}

module.exports = {
  readUsers
}
