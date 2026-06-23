/**
 * ProductCard Component — Dark Dashboard
 */

import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    const { id, name, brand, image, healthRating } = product;

    const getRatingClass = (rating) => {
        if (!rating) return 'rating-unknown';
        switch (rating.toLowerCase()) {
            case 'a': return 'rating-a';
            case 'b': return 'rating-b';
            case 'c': return 'rating-c';
            case 'd': return 'rating-d';
            case 'e': return 'rating-e';
            default: return 'rating-unknown';
        }
    };

    const isValidRating = (rating) => {
        if (!rating) return false;
        const valid = ['a', 'b', 'c', 'd', 'e'];
        return valid.includes(rating.toLowerCase());
    };

    return (
        <Link to={`/product/${id}`} className="product-card">
            {/* Image */}
            <div className="product-card-image">
                {image ? (
                    <img src={image} alt={name} loading="lazy" />
                ) : (
                    <div className="product-card-no-image">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                    </div>
                )}
                {isValidRating(healthRating) && (
                    <div className={`product-card-rating ${getRatingClass(healthRating)}`}>
                        {healthRating.toUpperCase()}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="product-card-info">
                <h3 className="product-card-name">{name || 'Unknown Product'}</h3>
                {brand && <p className="product-card-brand">{brand}</p>}
            </div>

            {/* Arrow */}
            <div className="product-card-arrow">→</div>
        </Link>
    );
}

export default ProductCard;
