/**
 * Product Controller
 * Handles HTTP requests for product-related endpoints
 */

const productService = require('../services/productService');

/**
 * Search products by name
 * GET /api/products/search?query=<name>&page=<num>
 */
async function searchProducts(req, res) {
    try {
        const { query, page = 1, pageSize = 20 } = req.query;

        // Validate query parameter
        if (!query || query.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Search query is required'
            });
        }

        // Parse page and pageSize as integers
        const pageNum = parseInt(page, 10) || 1;
        const size = Math.min(parseInt(pageSize, 10) || 20, 50); // Max 50 items per page

        const results = await productService.searchProducts(query.trim(), pageNum, size);

        // Check if any products found
        if (results.products.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No products found',
                message: `No products matching "${query}" were found.`
            });
        }

        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
}

/**
 * Get product by barcode
 * GET /api/products/barcode/:code
 */
async function getProductByBarcode(req, res) {
    try {
        const { code } = req.params;

        // Validate barcode
        if (!code || code.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Barcode is required'
            });
        }

        // Clean barcode - remove any non-numeric characters
        const cleanedBarcode = code.trim().replace(/[^0-9]/g, '');

        if (cleanedBarcode.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Invalid barcode format',
                message: 'Barcode should be at least 8 digits'
            });
        }

        const product = await productService.getProductByBarcode(cleanedBarcode);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
                message: `No product found with barcode "${cleanedBarcode}"`
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Barcode lookup error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
}

/**
 * Get product details by ID
 * GET /api/products/:id
 */
async function getProductById(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Product ID is required'
            });
        }

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
                message: `No product found with ID "${id}"`
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Product fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
}

module.exports = {
    searchProducts,
    getProductByBarcode,
    getProductById
};
