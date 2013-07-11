var dnode = require('dnode')
var db = require('level-userdb')
var EventEmitter = require('events').EventEmitter

module.exports = {
  // Parameter is either an already-created level-userdb object or a string to pass as
  // name parameter to level-userdb constructor.
  server: function(dbi) {
    if (typeof dbi === 'string') {
      dbi = db(dbi)
    }
    var emitter = new EventEmitter()
    var s = dnode({
      findUser: function(email, cb) {
        emitter.emit('log', {email:email, method:'findUser'})
        dbi.findUser(email, cb)
      },

      addUser: function(email, password, data, cb) {
        emitter.emit('log', {email:email, method:'addUser', data:data, password:password})
        dbi.addUser(email, password, data, cb)
      },

      checkPassword: function(email, password, cb) {
        emitter.emit('log', {email:email, method:'checkPassword', password:password})
        dbi.checkPassword(email, password, cb)
      },

      changeEmail: function(email, newEmail, cb) {
        emitter.emit('log', {email:email, newEmail:newEmail, method:'changeEmail'})
        dbi.changeEmail(email, newEmail, cb)
      },

      deleteUser: function(email, cb) {
        emitter.emit('log', {email:email, method:'deleteUser'})
        dbi.deleteUser(email, cb)
      },

      modifyUser: function(email, data, cb) {
        emitter.emit('log', {email:email, data:data, method:'modifyUser'})
        dbi.modifyUser(email, data, cb)
      },

      close: function() {
        dbi.close.call(null, arguments)
      },

      get: function() {
        dbi.get.call(null, arguments)
      },

      // TODO: streams etc

    })

    s.emitter = emitter
    return s

  },
  client: function(hostPort, cb) {
    dnode.connect(hostPort, cb)
  }
}
