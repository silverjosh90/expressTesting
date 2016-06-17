var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/students_development')
var studentsCollection = db.get('students')


router.get('/', function(req, res, next) {
  studentsCollection.find({}, function(err,students){
    if(err) console.log(err);
    res.json(students)
  })
});

router.post('/', function(req,res,next){
  res.json('')
})

module.exports = router;
