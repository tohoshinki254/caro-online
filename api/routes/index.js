var express = require('express');
var router = express.Router();
const roomDAO = require('../models/room');
const matchDAO = require('../models/match');
const accountDAO = require('../models/account');
const { getRankingBoard } = require('../controllers/account');

/* GET home page. */
router.get('/', async function(req, res, next) {
  await matchDAO.deleteMany();
  await roomDAO.deleteMany();
  res.send('success');
});

module.exports = router;
