level-userdb-dnode
==================

[![Build Status](https://travis-ci.org/FrozenRidge/level-userdb-dnode.png)](https://travis-ci.org/FrozenRidge/level-userdb-dnode)

Dnode client and server for [level-userdb](https://github.com/FrozenRidge/level-userdb).

## Installation

`npm install level-userdb-dnode`

## Quickstart

```javascript
var dnodeServer = require('level-userdb-dnode').server
var dnodeClient = require('level-userdb-dnode').client

// Start the server
var server = dnodeServer('my-database')
server.listen(8080)

var client
var remote

// Connect an RPC client
function connect() {
  dnodeClient(8080, addUser)
}

// Add a user via dnode
function addUser(r, c) {
  remote = r
  client = c
  remote.addUser('test@example.com', 'secret', {some:"data"}, added)
}

// Find user we just added via dnode
function added(err) {
  remote.findUser('test@example.com', foundUser)
}

function foundUser(err, user) {
  console.log("user: %s", JSON.stringify(user, null, '\t'))
  process.exit(0)
}

connect()

```

## Tests

`npm test`

## API

level-userdb-dnode wraps the following API calls from [level-userdb](https://github.com/FrozenRidge/level-userdb).

- findUser()
- addUser()
- checkPassword()
- changeEmail()
- changePassword()
- modifyUser()
- deleteUser()

## TODO

Wrap leveldb streams to stream larger result sets.

## License

BSD
