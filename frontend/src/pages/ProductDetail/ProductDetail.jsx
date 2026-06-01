/**
 * ProductDetail Page — Dark Dashboard
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

    useEffect(() => {
        const allergens = getUserAllergens();
        setUserAllergens(allergens);
        if (id) fetchProduct(id);
    }, [id]);

    useEffect(() => {
        if (product && userAllergens.length > 0) checkAllergens();
    }, [product, userAllergens]);

    const fetchProduct = async (productId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getProductById(productId);
            if (response.success && response.data) {
                setProduct(response.data);
            } else {
                navigate('/not-found', { state: { type: 'product', query: productId } });
            }
        } catch (err) {
            if (err.error === 'Product not found') {
                navigate('/not-found', { state: { type: 'product', query: productId } });
            } else {
                setError(err.message || 'Failed to load product details.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const checkAllergens = () => {
        if (!product) return;
        const matched = [];
        const productAllergens = product.allergens.map(a => a.toLowerCase());
        const ingredientsText = (product.ingredients || '').toLowerCase();
        userAllergens.forEach(ua => {
            const lower = ua.toLowerCase();
            if (productAllergens.some(pa => pa.includes(lower)) || ingredientsText.includes(lower)) {
                matched.push(ua);
            }
        });
        setMatchedAllergens([...new Set(matched)]);
    };

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

    if (error) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="product-error">
                        <div className="error-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
                            </svg>
                        </div>
                        <h2>Error Loading Product</h2>
                        <p>{error}</p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="product-detail-page page">
            <div className="container">
                {/* Back */}
                <Link to="/" className="back-link">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Search
                </Link>

                {/* Allergy Warning */}
                <AllergyWarning matchedAllergens={matchedAllergens} />

                {/* Hero: image + info */}
                <div className="product-hero">
                    <div className="product-image-container">
                        {product.imageLarge ? (
                            <img src={product.imageLarge} alt={product.name} className="product-image" />
                        ) : (
                            <div className="product-no-image">
                                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21 15 16 10 5 21"/>
                                </svg>
                                <p>No Image</p>
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <div>
                            <h1 className="product-name">{product.name}</h1>
                            {product.brand && <p className="product-brand">{product.brand}</p>}
                        </div>

                        <div className="product-meta-row">
                            {product.quantity && (
                                <span className="product-quantity">{product.quantity}</span>
                            )}
                            {product.healthRating && product.healthRating !== 'N/A' && (
                                <div className="product-nutriscore">
                                    <span className="nutriscore-label">Nutri-Score</span>
                                    <span className={`nutriscore-badge grade-${product.healthRating.toLowerCase()}`}>
                                        {product.healthRating.toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="product-score-section">
                            <p className="product-score-label">Health Score</p>
                            <HealthScore score={product.healthScore} />
                        </div>
                    </div>
                </div>

                {/* Detail Sections */}
                <div className="product-sections">

                    {/* Allergens */}
                    {product.allergens.length > 0 && (
                        <section className="product-section">
                            <div className="product-section-header">
                                <div className="product-section-icon">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                                    </svg>
                                </div>
                                <h2 className="product-section-title">Allergens</h2>
                            </div>
                            <div className="allergen-list">
                                {product.allergens.map((allergen, i) => (
                                    <span
                                        key={i}
                                        className={`allergen-badge ${
                                            matchedAllergens.some(m => allergen.toLowerCase().includes(m.toLowerCase()))
                                                ? 'allergen-matched' : ''
                                        }`}
                                    >
                                        {allergen}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Ingredients */}
                    <section className="product-section">
                        <div className="product-section-header">
                            <div className="product-section-icon">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                                    <polyline points="10 9 9 9 8 9"/>
                                </svg>
                            </div>
                            <h2 className="product-section-title">Ingredients</h2>
                        </div>
                        <p className="ingredients-text">
                            {product.ingredients || 'Ingredients not available'}
                        </p>
                    </section>

                    {/* Additives */}
                    {product.additives && product.additives.length > 0 && (
                        <section className="product-section">
                            <div className="product-section-header">
                                <div className="product-section-icon">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                                    </svg>
                                </div>
                                <h2 className="product-section-title">Additives & Preservatives</h2>
                            </div>
                            <div className="additives-grid">
                                {product.additives.map((additive, i) => (
                                    <div key={i} className={`additive-card risk-${additive.risk}`}>
                                        <div className="additive-header">
                                            <span className="additive-code">{additive.code}</span>
                                            <span className={`additive-risk risk-${additive.risk}`}>{additive.risk}</span>
                                        </div>
                                        <h3 className="additive-name">{additive.name}</h3>
                                        <p className="additive-description">{additive.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Nutrition */}
                    {product.nutrients && (
                        <section className="product-section">
                            <div className="product-section-header">
                                <div className="product-section-icon">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                                    </svg>
                                </div>
                                <h2 className="product-section-title">Nutritional Information (per 100g)</h2>
                            </div>
                            <table className="nutrition-table">
                                <tbody>
                                    {product.nutrients.energy != null && (
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
