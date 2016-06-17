var request = require('supertest');
var app = require('../../app')
var expect = require('chai').expect


describe('GET index', function(){
  it('it returns 200', function(done){
    request(app).get('/students').expect(200, done);
  });

  it('returns an array of students as JSON', function(done) {
    request(app).get('/students').expect(function(response){
      expect(response.body).to.be.instanceOf(Array);
    }).end(done);
  })
  it('returns an Object of students as JSON', function(done) {
    request(app).get('/students').expect(function(response){
      expect(response.body[0]).to.be.instanceOf(Object);
    }).end(done);
  })
  it('returns a first name of students as JSON', function(done) {
    request(app).get('/students').expect(function(response){
      expect(response.body[0].firstName).to.equal('Charlie');
      expect(response.body[1].firstName).to.equal('Linus');
    }).end(done);
  })
})
