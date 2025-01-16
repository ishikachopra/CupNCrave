const express = require('express');
const router = express.Router();
const { handleDeleteCookies, handleGetCookies, handleCreateCookies, handleUpdateCookies, markAsInStock, markAsOutOfStock } = require('../controllers/cookies');
const upload = require('../helper/multer');

// Create a cake
router.post('/', upload.single('img'), handleCreateCookies);

// Read all cakes
router.get('/', handleGetCookies);

// Update a cake by ID
router.put('/:id', handleUpdateCookies);

// Delete a cake by ID
router.delete('/:id', handleDeleteCookies);

router.patch('/:id/out-of-stock', markAsOutOfStock);
router.patch('/:id/in-stock', markAsInStock);

module.exports = router;