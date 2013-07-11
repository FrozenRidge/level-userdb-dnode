var client = require('../index').client
var db = require('level-userdb')
var expect = require('chai').expect
var net = require('net')
var rimraf = require('rimraf')
var server = require('../index').server


describe('server', function() {

  var dbname = 'test-db'

  after(function(done) {
    rimraf(dbname, done)
  })

  before(function(done) {
    rimraf(dbname, done)
  })

  it('should work with existing level-userdb object', function(done) {
    var dbi = db(dbname)
    var s = server(dbi)
    s.listen(8080)

    function connect() {
      var client = net.connect({port:8080}, function() {
        s.end()
        dbi.close(done)
      })
      client.on('error', function() {
        expect(true).to.be.false
      })
    }
    connect()
  })

  it('should work with string dbname param', function(done) {
    var s = server(dbname)
    s.listen(8081)

    function connect() {
      var client = net.connect({port:8081}, function() {
        s.end()
        done()
      })
      client.on('error', function() {
        expect(true).to.be.false
        done()
      })
    }
    connect()

  })

})

describe('client', function() {


  var dbname = 'test-db-cs'

  after(function(done) {
    rimraf(dbname, done)
  })

  before(function(done) {
    rimraf(dbname, done)
  })

  it('should be able to add a user via dnode', function(done) {
    var testEmail = 'test-dnode@example.com'
    var testPassword = 'testfoo'
    var testData = {some:"data"}
    var s = server(dbname)
    s.listen(8082)
    var c
    var remote

    function connect() {
      client(8082, addUser)
    }

    function addUser(r, d) {
      remote = r
      c = d
      remote.addUser(testEmail, testPassword, testData, added)
    }
    
    function added(err) {
      expect(err).to.be.undefined
      remote.findUser(testEmail, foundUser)
    }

    function foundUser(err, user) {
      expect(err).to.be.null
      expect(user.email).to.eql(testEmail)
      expect(user.data).to.eql(testData)
      expect(user.password).to.exist
      s.end()
      c.end()
      done()
    }

    connect()


  })


})
