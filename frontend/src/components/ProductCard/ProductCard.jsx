/**
 * ProductCard Component
 * Display card for search results with product image and name
 */

import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const { id, name, brand, image, healthRating } = product;

    // Get health rating badge color
    const getRatingClass = (rating) => {
        if (!rating) return 'rating-unknown';
        const r = rating.toLowerCase();
        if (r === 'a') return 'rating-a';
        if (r === 'b') return 'rating-b';
        if (r === 'c') return 'rating-c';
        if (r === 'd') return 'rating-d';
        if (r === 'e') return 'rating-e';
        return 'rating-unknown';
    };

    return (
        <Link to={`/product/${id}`} className="product-card">
            {/* Product Image */}
            <div className="product-card-image">
                {image ? (
                    <img src={image} alt={name} loading="lazy" />
                ) : (
                    <div className="product-card-no-image">
                        <span>🍽️</span>
                        <p>No Image</p>
                    </div>
                )}

                {/* Nutri-Score Badge */}
                {healthRating && (
                    <div className={`product-card-rating ${getRatingClass(healthRating)}`}>
                        {healthRating.toUpperCase()}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="product-card-info">
                <h3 className="product-card-name">{name || 'Unknown Product'}</h3>
                {brand && (
                    <p className="product-card-brand">{brand}</p>
                )}
            </div>

            {/* View Details Arrow */}
            <div className="product-card-arrow">
                →
            </div>
        </Link>
    );
}

export default ProductCard;
