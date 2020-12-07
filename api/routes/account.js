const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

router.post('/register', async (req, res, next) => {
    accountController.register(req, res, next);
});

module.exports = router;