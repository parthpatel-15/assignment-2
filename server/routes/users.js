/*   File name: users.js
     Student name: Parth Patel
     Student ID: 301207843
     Assignment: web authentication 
     date : 25th oct 2021   */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
