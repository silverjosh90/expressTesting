var request = require('supertest');
var app = require('../../app')
var expect = require('chai').expect
var db = require('monk')('localhost/students_development')
var studentsCollection = db.get('students')


var student1 = {
  firstName: "Charlie",
  age: 12,
  grade: 6
}
var student2 = {
  firstName: "Linus",
  age: 11,
  grade: 6
}



describe('Students', function(){
  beforeEach(function() {
    studentsCollection.remove({},function(err, students){
      if(err) console.log(err);
    })
  });
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
        expect(response.body).to.be.instanceOf(Object);
      }).end(done);
    })
    it('returns a first name of students as JSON', function(done) {
      studentsCollection.insert([student1,student2], function(err,data){
        if(err) console.log(err);
        request(app).get('/students').expect(function(response){
          expect(response.body[0].firstName).to.equal('Charlie');
          expect(response.body[1].firstName).to.equal('Linus');
        }).end(done);

      })
    })
  })
  describe('POST index', function(){
    it('it returns 200', function(done){
      request(app).post('/students').expect(200, done);
    });

  })

})
