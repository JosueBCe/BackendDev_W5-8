const express = require('express');
const router = express.Router();

// Requires specific file 
const productsController = require('../controllers/products');

// Requires specific function from index file 
router.get('/', productsController.getAll);
router.get('/:category', productsController.getCategory );
router.get('/byId/:id', productsController.getById );

// Creating new Product
router.post('/', productsController.addNewProduct)

// Updating the a Product info.
router.put('/byId/:id', productsController.updateProduct);

// Deleting One Product
router.delete('/byId/:id', productsController.deleteProduct);

module.exports = router;