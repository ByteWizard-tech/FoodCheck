/**
 * Product Routes
 * Defines API endpoints for product-related operations
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Search products by name
// GET /api/products/search?query=<name>&page=<num>&pageSize=<num>
router.get('/search', productController.searchProducts);

// Get product by barcode
// GET /api/products/barcode/:code
router.get('/barcode/:code', productController.getProductByBarcode);

// Get product details by ID
// GET /api/products/:id
router.get('/:id', productController.getProductById);

module.exports = router;
