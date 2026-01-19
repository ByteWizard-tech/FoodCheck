/**
 * API Service
 * Handles all REST API calls to the backend
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Search products by name
 * @param {string} query - Search query
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Promise<object>} Search results
 */
export async function searchProducts(query, page = 1, pageSize = 20) {
    try {
        const response = await api.get('/products/search', {
            params: { query, page, pageSize }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with error status
            throw error.response.data;
        }
        throw { success: false, error: 'Network error', message: 'Failed to connect to server' };
    }
}

/**
 * Get product by barcode
 * @param {string} barcode - Product barcode
 * @returns {Promise<object>} Product data
 */
export async function getProductByBarcode(barcode) {
    try {
        const response = await api.get(`/products/barcode/${barcode}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw { success: false, error: 'Network error', message: 'Failed to connect to server' };
    }
}

/**
 * Get product details by ID
 * @param {string} productId - Product ID
 * @returns {Promise<object>} Product data
 */
export async function getProductById(productId) {
    try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw { success: false, error: 'Network error', message: 'Failed to connect to server' };
    }
}

/**
 * Check API health
 * @returns {Promise<object>} Health status
 */
export async function checkHealth() {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        throw { success: false, error: 'Server offline' };
    }
}

export default api;
