const express = require('express');
const router = express.Router();

// Requires specific file 
const usersController = require('../controllers/users');

// Requires specific function from index file 
router.get('/', usersController.getAll);
// router.get('/:category', usersController.getByCategory );
router.get('/byId/:id', usersController.getById );

// Creating new User
router.post('/', usersController.addNewUser)

// Updating the a User info.
router.put('/byId/:id', usersController.updateUser);

// Deleting One User
router.delete('/byId/:id', usersController.deleteUser);

module.exports = router;