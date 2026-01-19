/**
 * NotFound Page (404)
 * Displayed when product or page is not found
 */

import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const location = useLocation();
    const state = location.state || {};
    const { type, query } = state;

    // Determine message based on context
    const getMessage = () => {
        if (type === 'barcode') {
            return {
                title: 'Product Not Found',
                subtitle: `We couldn't find a product with barcode "${query}"`,
                suggestion: 'The barcode may not be in our database. Try searching by product name instead.'
            };
        }
        if (type === 'product') {
            return {
                title: 'Product Not Found',
                subtitle: `We couldn't find a product with ID "${query}"`,
                suggestion: 'This product may have been removed or the link may be incorrect.'
            };
        }
        return {
            title: 'Page Not Found',
            subtitle: "Oops! The page you're looking for doesn't exist",
            suggestion: 'It might have been moved, deleted, or you may have mistyped the URL.'
        };
    };

    const message = getMessage();

    return (
        <div className="not-found-page page page-centered">
            <div className="container">
                <div className="not-found-content">
                    {/* 404 Illustration */}
                    <div className="not-found-illustration">
                        <span className="not-found-emoji">🔍</span>
                        <div className="not-found-number">404</div>
                    </div>

                    {/* Message */}
                    <h1 className="not-found-title">{message.title}</h1>
                    <p className="not-found-subtitle">{message.subtitle}</p>
                    <p className="not-found-suggestion">{message.suggestion}</p>

                    {/* Actions */}
                    <div className="not-found-actions">
                        <Link to="/" className="btn btn-primary">
                            🏠 Go to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-secondary"
                        >
                            ← Go Back
                        </button>
                    </div>

                    {/* Tips Section */}
                    <div className="not-found-tips">
                        <h3>What you can do:</h3>
                        <ul>
                            <li>
                                <span className="tip-icon">🔍</span>
                                <span>Search for products by name on the home page</span>
                            </li>
                            <li>
                                <span className="tip-icon">📷</span>
                                <span>Use our barcode scanner to find products</span>
                            </li>
                            <li>
                                <span className="tip-icon">❓</span>
                                <span>Check out our <Link to="/help">Help page</Link> for guidance</span>
                            </li>
                            <li>
                                <span className="tip-icon">📧</span>
                                <span><Link to="/contact">Contact us</Link> if you're having issues</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
