var express = require('express');
var User = require('../models/usermodel');
var passport = require('passport');
var router = express.Router();


router.get('/:id/:password', function(req, res) {
  var user = new User();
  user.local.username = req.params.id;
  user.local.password = req.params.password;

  user.save(function(err) {
    if (err) {
      console.log("Could not save");
    };
    console.log(user.local.username + " " + user.local.password);
  });
 res.send("<h1>Hello, " + req.params.id + "</h1>");
});


module.exports = router;
