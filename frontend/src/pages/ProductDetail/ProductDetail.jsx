/**
 * ProductDetail Page
 * Displays detailed product information including health score and allergen warnings
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HealthScore from '../../components/HealthScore/HealthScore';
import AllergyWarning from '../../components/AllergyWarning/AllergyWarning';
import { getUserAllergens } from '../../components/AllergenInput/AllergenInput';
import { getProductById } from '../../services/api';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAllergens, setUserAllergens] = useState([]);
    const [matchedAllergens, setMatchedAllergens] = useState([]);

    // Load user allergens and fetch product on mount
    useEffect(() => {
        const allergens = getUserAllergens();
        setUserAllergens(allergens);

        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    // Check for matched allergens when product loads
    useEffect(() => {
        if (product && userAllergens.length > 0) {
            checkAllergens();
        }
    }, [product, userAllergens]);

    // Fetch product details
    const fetchProduct = async (productId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getProductById(productId);

            if (response.success && response.data) {
                setProduct(response.data);
            } else {
                navigate('/not-found', {
                    state: { type: 'product', query: productId }
                });
            }
        } catch (err) {
            if (err.error === 'Product not found') {
                navigate('/not-found', {
                    state: { type: 'product', query: productId }
                });
            } else {
                setError(err.message || 'Failed to load product details.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Check for allergen matches
    const checkAllergens = () => {
        if (!product) return;

        const matched = [];
        const productAllergens = product.allergens.map(a => a.toLowerCase());
        const ingredientsText = (product.ingredients || '').toLowerCase();

        userAllergens.forEach(userAllergen => {
            const allergenLower = userAllergen.toLowerCase();

            // Check in allergens list
            if (productAllergens.some(pa => pa.includes(allergenLower))) {
                matched.push(userAllergen);
                return;
            }

            // Check in ingredients text
            if (ingredientsText.includes(allergenLower)) {
                matched.push(userAllergen);
            }
        });

        setMatchedAllergens([...new Set(matched)]);
    };

    // Get risk badge color
    const getRiskBadgeClass = (risk) => {
        switch (risk) {
            case 'low': return 'badge-success';
            case 'medium': return 'badge-warning';
            case 'high': return 'badge-danger';
            default: return 'badge-info';
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="loading-text">Loading product details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="product-error">
                        <span className="error-icon">⚠️</span>
                        <h2>Error Loading Product</h2>
                        <p>{error}</p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    // No product found
    if (!product) {
        return null;
    }

    return (
        <div className="product-detail-page page">
            <div className="container">
                {/* Back Link */}
                <Link to="/" className="back-link">
                    ← Back to Search
                </Link>

                {/* Allergy Warning - Shown at top if allergens match */}
                <AllergyWarning matchedAllergens={matchedAllergens} />

                {/* Product Header */}
                <div className="product-header">
                    {/* Product Image */}
                    <div className="product-image-container">
                        {product.imageLarge ? (
                            <img
                                src={product.imageLarge}
                                alt={product.name}
                                className="product-image"
                            />
                        ) : (
                            <div className="product-no-image">
                                <span>🍽️</span>
                                <p>No Image Available</p>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <h1 className="product-name">{product.name}</h1>
                        {product.brand && (
                            <p className="product-brand">{product.brand}</p>
                        )}
                        {product.quantity && (
                            <p className="product-quantity">{product.quantity}</p>
                        )}

                        {/* Health Score */}
                        <div className="product-score-section">
                            <h2 className="section-label">Health Score</h2>
                            <HealthScore score={product.healthScore} />
                        </div>

                        {/* Nutri-Score Rating */}
                        {product.healthRating && product.healthRating !== 'N/A' && (
                            <div className="product-nutriscore">
                                <span className="nutriscore-label">Nutri-Score:</span>
                                <span className={`nutriscore-badge grade-${product.healthRating.toLowerCase()}`}>
                                    {product.healthRating.toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Sections */}
                <div className="product-sections">
                    {/* Allergens Section */}
                    {product.allergens.length > 0 && (
                        <section className="product-section">
                            <h2 className="section-title">
                                <span className="section-icon">⚠️</span>
                                Allergens
                            </h2>
                            <div className="allergen-list">
                                {product.allergens.map((allergen, index) => (
                                    <span
                                        key={index}
                                        className={`allergen-badge ${matchedAllergens.some(m => allergen.toLowerCase().includes(m.toLowerCase()))
                                                ? 'allergen-matched'
                                                : ''
                                            }`}
                                    >
                                        {allergen}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Ingredients Section */}
                    <section className="product-section">
                        <h2 className="section-title">
                            <span className="section-icon">📝</span>
                            Ingredients
                        </h2>
                        <p className="ingredients-text">{product.ingredients}</p>
                    </section>

                    {/* Additives Section */}
                    {product.additives && product.additives.length > 0 && (
                        <section className="product-section">
                            <h2 className="section-title">
                                <span className="section-icon">🧪</span>
                                Additives & Preservatives
                            </h2>
                            <div className="additives-list">
                                {product.additives.map((additive, index) => (
                                    <div key={index} className="additive-card">
                                        <div className="additive-header">
                                            <span className="additive-code">{additive.code}</span>
                                            <span className={`additive-risk badge ${getRiskBadgeClass(additive.risk)}`}>
                                                {additive.risk}
                                            </span>
                                        </div>
                                        <h3 className="additive-name">{additive.name}</h3>
                                        <p className="additive-description">{additive.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Nutrition Section */}
                    {product.nutrients && (
                        <section className="product-section">
                            <h2 className="section-title">
                                <span className="section-icon">📊</span>
                                Nutritional Information (per 100g)
                            </h2>
                            <table className="nutrition-table">
                                <tbody>
                                    {product.nutrients.energy && (
                                        <tr>
                                            <td>Energy</td>
                                            <td>{product.nutrients.energy} {product.nutrients.energyUnit}</td>
                                        </tr>
                                    )}
                                    {product.nutrients.fat != null && (
                                        <tr>
                                            <td>Fat</td>
                                            <td>{product.nutrients.fat}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.saturatedFat != null && (
                                        <tr className="sub-row">
                                            <td>— Saturated Fat</td>
                                            <td>{product.nutrients.saturatedFat}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.carbs != null && (
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td>{product.nutrients.carbs}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.sugars != null && (
                                        <tr className="sub-row">
                                            <td>— Sugars</td>
                                            <td>{product.nutrients.sugars}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.fiber != null && (
                                        <tr>
                                            <td>Fiber</td>
                                            <td>{product.nutrients.fiber}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.proteins != null && (
                                        <tr>
                                            <td>Proteins</td>
                                            <td>{product.nutrients.proteins}g</td>
                                        </tr>
                                    )}
                                    {product.nutrients.salt != null && (
                                        <tr>
                                            <td>Salt</td>
                                            <td>{product.nutrients.salt}g</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
