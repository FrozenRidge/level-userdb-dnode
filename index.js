var dnode = require('dnode')
var db = require('level-userdb')

module.exports = {
  // Parameter is either an already-created level-userdb object or a string to pass as
  // name parameter to level-userdb constructor.
  server: function(dbi) {
    if (typeof dbi === 'string') {
      dbi = db(dbi)
    }
    var s = dnode({
      findUser: function(email, cb) {
        dbi.findUser(email, cb)
      },

      addUser: function(email, password, data, cb) {
        dbi.addUser(email, password, data, cb)
      },

      checkPassword: function(email, password, cb) {
        dbi.checkPassword(email, password, data, cb)
      },

      changeEmail: function(email, newEmail, cb) {
        dbi.checkPassword(email, newEmail, cb)
      },

      deleteUser: function(email, cb) {
        dbi.checkPassword(email, cb)
      },

      modifyUser: function(email, data, cb) {
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

    return s

  },
  client: function(hostPort, cb) {
    dnode.connect(hostPort, cb)
  }
}
