const express = require('express');
const router = express.Router();
const { handleDeleteCoffee, handleGetCoffee, handleCreateCoffee, handleUpdateCoffee, markAsInStock, markAsOutOfStock } = require('../controllers/coffee');
const upload = require('../helper/multer');

router.post('/', upload.single('img'), handleCreateCoffee);
router.get('/', handleGetCoffee);
router.put('/:id', handleUpdateCoffee);
router.delete('/:id', handleDeleteCoffee);
router.patch('/:id/out-of-stock', markAsOutOfStock);
router.patch('/:id/in-stock', markAsInStock);

module.exports = router;
