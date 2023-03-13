const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));


// create home route
router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
// router.get('/', require("./displayName"));

router.use('/products', require("./products"));
router.use('/users', require('./users'));

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));


module.exports = router;