const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', require("./displayName"));

router.use('/products', require("./products"));
router.use('/users', require('./users'));
// router.use('/theme', require('./theme'));

module.exports = router;