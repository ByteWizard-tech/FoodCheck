/**
 * Product Service
 * Handles business logic for product search, data transformation, and health score calculation
 */

const axios = require('axios');
const { parseAdditives } = require('../utils/chemicalCodes');

// Open Food Facts API base URLs
const OFF_API_BASE = 'https://world.openfoodfacts.org';
const SEARCH_URL = `${OFF_API_BASE}/cgi/search.pl`;
const PRODUCT_URL = `${OFF_API_BASE}/api/v0/product`;

// Define a custom user agent as requested by Open Food Facts API guidelines
const HEADERS = {
    'User-Agent': 'FoodComplianceChecker/1.0 (biosafety@example.com)'
};

// In-Memory Caches for Demo Performance
const searchCache = new Map();
const barcodeCache = new Map();

/**
 * Calculate health score based on product data
 * Score ranges from 0-100
 * @param {object} product - Product data from API
 * @returns {number} Health score (0-100)
 */
function calculateHealthScore(product) {
    let score = 50; // Base score

    // 1. Nutri-Score contribution (if available)
    const nutriScore = product.nutriscore_grade || product.nutrition_grades;
    if (nutriScore) {
        const nutriScoreMap = {
            'a': 95,
            'b': 80,
            'c': 60,
            'd': 40,
            'e': 20
        };
        score = nutriScoreMap[nutriScore.toLowerCase()] || score;
    }

    // 2. NOVA group penalty (ultra-processed foods)
    const novaGroup = product.nova_group;
    if (novaGroup) {
        const novaPenalty = {
            1: 0,    // Unprocessed
            2: -5,   // Processed culinary ingredients
            3: -10,  // Processed foods
            4: -20   // Ultra-processed
        };
        score += novaPenalty[novaGroup] || 0;
    }

    // 3. Additives penalty
    const additives = product.additives_tags || [];
    const additiveCount = additives.length;
    if (additiveCount > 0) {
        // -2 points per additive, max -20
        score -= Math.min(additiveCount * 2, 20);
    }

    // 4. High risk additives check
    const highRiskAdditives = ['e171', 'e250', 'e251', 'e252', 'e320', 'e321', 'e123', 'e952'];
    additives.forEach(additive => {
        const code = additive.replace('en:', '').toLowerCase();
        if (highRiskAdditives.some(hr => code.includes(hr))) {
            score -= 5; // Extra penalty for high-risk additives
        }
    });

    // 5. Nutrient-based adjustments
    const nutrients = product.nutriments || {};

    // Penalty for high sugar
    const sugar = nutrients.sugars_100g;
    if (sugar > 22.5) score -= 10;
    else if (sugar > 12.5) score -= 5;

    // Penalty for high saturated fat
    const satFat = nutrients['saturated-fat_100g'];
    if (satFat > 5) score -= 10;
    else if (satFat > 2.5) score -= 5;

    // Penalty for high sodium
    const sodium = nutrients.sodium_100g;
    if (sodium > 1.5) score -= 10;
    else if (sodium > 0.6) score -= 5;

    // Bonus for fiber
    const fiber = nutrients.fiber_100g;
    if (fiber > 6) score += 10;
    else if (fiber > 3) score += 5;

    // Bonus for protein
    const protein = nutrients.proteins_100g;
    if (protein > 8) score += 5;

    // Ensure score is within bounds
    return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Round a numeric value to 1 decimal place, or return null
 * @param {*} value - Value to round
 * @returns {number|null}
 */
function roundNutrient(value) {
    if (value == null || isNaN(value)) return null;
    return Math.round(value * 10) / 10;
}

/**
 * Transform raw API product data into clean format
 * @param {object} rawProduct - Raw product data from Open Food Facts
 * @returns {object} Cleaned product data
 */
function transformProduct(rawProduct) {
    // Parse additives with readable names
    const additivesTags = rawProduct.additives_tags || [];
    const parsedAdditives = parseAdditives(additivesTags.map(a => a.replace('en:', '')));

    // Extract allergens
    const allergensFromTags = (rawProduct.allergens_tags || []).map(a =>
        a.replace('en:', '').replace(/-/g, ' ')
    );
    const allergensFromHierarchy = (rawProduct.allergens_hierarchy || []).map(a =>
        a.replace('en:', '').replace(/-/g, ' ')
    );
    const allergens = [...new Set([...allergensFromTags, ...allergensFromHierarchy])];

    // Calculate health score
    const healthScore = calculateHealthScore(rawProduct);

    return {
        id: rawProduct.code || rawProduct._id,
        name: rawProduct.product_name || rawProduct.product_name_en || 'Unknown Product',
        brand: rawProduct.brands || 'Unknown Brand',
        image: rawProduct.image_url || rawProduct.image_front_url || null,
        imageLarge: rawProduct.image_front_url || rawProduct.image_url || null,
        ingredients: rawProduct.ingredients_text || rawProduct.ingredients_text_en || 'Ingredients not available',
        ingredientsList: (rawProduct.ingredients || []).map(ing => ({
            name: ing.text || ing.id,
            percent: ing.percent_estimate || null
        })),
        allergens: allergens,
        allergensText: rawProduct.allergens || '',
        healthRating: rawProduct.nutriscore_grade || rawProduct.nutrition_grades || 'N/A',
        healthScore: healthScore,
        novaGroup: rawProduct.nova_group || null,
        additives: parsedAdditives,
        nutrients: {
            energy: roundNutrient(rawProduct.nutriments?.energy_100g),
            energyUnit: rawProduct.nutriments?.energy_unit || 'kJ',
            fat: roundNutrient(rawProduct.nutriments?.fat_100g),
            saturatedFat: roundNutrient(rawProduct.nutriments?.['saturated-fat_100g']),
            carbs: roundNutrient(rawProduct.nutriments?.carbohydrates_100g),
            sugars: roundNutrient(rawProduct.nutriments?.sugars_100g),
            fiber: roundNutrient(rawProduct.nutriments?.fiber_100g),
            proteins: roundNutrient(rawProduct.nutriments?.proteins_100g),
            salt: roundNutrient(rawProduct.nutriments?.salt_100g),
            sodium: roundNutrient(rawProduct.nutriments?.sodium_100g)
        },
        categories: rawProduct.categories || '',
        quantity: rawProduct.quantity || '',
        packaging: rawProduct.packaging || ''
    };
}

/**
 * Search products by name
 * @param {string} query - Search query
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Promise<object>} Search results with products and pagination info
 */
async function searchProducts(query, page = 1, pageSize = 20) {
    const cacheKey = `${query}_${page}_${pageSize}`;
    
    // Check Cache First
    if (searchCache.has(cacheKey)) {
        console.log(`[Cache Hit] Search: ${query} (Page ${page})`);
        return searchCache.get(cacheKey);
    }

    console.log(`[Cache Miss] Fetching Search: ${query} (Page ${page})`);
    
    const maxRetries = 1;
    let lastError = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(SEARCH_URL, {
                params: {
                    search_terms: query,
                    search_simple: 1,
                    action: 'process',
                    json: 1,
                    page: page,
                    page_size: pageSize,
                    sort_by: 'unique_scans_n',
                    fields: 'code,product_name,product_name_en,brands,image_url,image_front_url,nutriscore_grade,nutrition_grades'
                },
                headers: HEADERS,
                timeout: 15000
            });

            // Validate response is JSON (OFF sometimes returns HTML error pages)
            const data = response.data;
            if (typeof data === 'string' || !data || !Array.isArray(data.products)) {
                console.warn('Open Food Facts returned invalid response, retrying...');
                lastError = new Error('Invalid response from food database');
                continue;
            }

            // Filter out products with empty/missing names and map to clean format
            const products = (data.products || [])
                .filter(p => {
                    const name = (p.product_name || p.product_name_en || '').trim();
                    return name.length > 0;
                })
                .map(p => ({
                    id: p.code,
                    name: p.product_name || p.product_name_en,
                    brand: p.brands || '',
                    image: p.image_url || p.image_front_url || null,
                    healthRating: p.nutriscore_grade || p.nutrition_grades || null
                }));

            const result = {
                products: products,
                totalCount: data.count || 0,
                page: page,
                pageSize: pageSize,
                totalPages: Math.ceil((data.count || 0) / pageSize)
            };

            // Save to Cache
            searchCache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error(`Search attempt ${attempt + 1} failed:`, error.message);
            lastError = error;
            // Wait briefly before retry
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    throw new Error(lastError?.message || 'Failed to search products. Please try again.');
}

/**
 * Get product by barcode
 * @param {string} barcode - Product barcode
 * @returns {Promise<object|null>} Product data or null if not found
 */
async function getProductByBarcode(barcode) {
    // Check Cache First
    if (barcodeCache.has(barcode)) {
        console.log(`[Cache Hit] Barcode: ${barcode}`);
        return barcodeCache.get(barcode);
    }

    console.log(`[Cache Miss] Fetching Barcode: ${barcode}`);

    const maxRetries = 1;
    let lastError = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(`${PRODUCT_URL}/${barcode}.json`, {
                headers: HEADERS,
                timeout: 15000
            });

            const data = response.data;

            // Validate response is JSON
            if (typeof data === 'string' || !data) {
                console.warn('Open Food Facts returned invalid response for barcode, retrying...');
                lastError = new Error('Invalid response from food database');
                continue;
            }

            if (data.status === 0 || !data.product) {
                return null; // Product not found
            }

            const result = transformProduct(data.product);
            
            // Save to Cache
            barcodeCache.set(barcode, result);
            return result;
        } catch (error) {
            console.error(`Barcode lookup attempt ${attempt + 1} failed:`, error.message);
            lastError = error;
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    throw new Error(lastError?.message || 'Failed to fetch product. Please try again.');
}

/**
 * Get product details by ID (same as barcode for Open Food Facts)
 * @param {string} productId - Product ID/barcode
 * @returns {Promise<object|null>} Product data or null if not found
 */
async function getProductById(productId) {
    return getProductByBarcode(productId);
}

module.exports = {
    searchProducts,
    getProductByBarcode,
    getProductById,
    calculateHealthScore,
    transformProduct
};
