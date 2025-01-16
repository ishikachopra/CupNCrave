const express = require('express');
const router = express.Router();
const { handleDeleteCakes, handleGetCakes, handleCreateCakes, handleUpdateCakes, markAsInStock, markAsOutOfStock } = require('../controllers/cakes');
const upload = require('../helper/multer');


router.post('/', upload.single('img'), handleCreateCakes);
router.get('/', handleGetCakes);
router.put('/:id', handleUpdateCakes);
router.delete('/:id', handleDeleteCakes);
router.patch('/:id/out-of-stock', markAsOutOfStock);
router.patch('/:id/in-stock', markAsInStock);

module.exports = router;
