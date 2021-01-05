var express = require('express');
var router = express.Router();
const roomDAO = require('../models/room');
const matchDAO = require('../models/match');
const accountDAO = require('../models/account');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const a = await accountDAO.find();
  for (let i = 0; i < a.length; i++) {
    a[i].inRoom = false;
    await a[i].save();
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
