const fs = require('fs')
const FILE = './users.json'

const readJSON = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE, (err, data) => {
      if (data) {
        try {
          resolve(JSON.parse(data.toString()))
          //resolve(data.toString())
        } catch (ex) {
          reject(ex)
        }
      } else {
        reject(err)
      }
    })
  })
}

const writeJSON = data => {
  return new Promise((resolve, reject) => {
    fs.writeFile(FILE, JSON.stringify(data, null, 2), err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const getUsers = () => {
  return readJSON()
}

const createUser = user => {
  return getUsers()
    .then(users => {
      const maxId = users.reduce((acc, _user) => {
        if (_user.id > acc) acc = _user.id
        return acc
      }, 0)
      user.id = maxId + 1
      users.push(user)
      return writeJSON(users)
    })
    .then(() => {
      return user
    })
}

module.exports = {
  getUsers,
  createUser
}
