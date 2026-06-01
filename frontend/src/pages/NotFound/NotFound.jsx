/**
 * NotFound Page — Dark Dashboard
 */

import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const location = useLocation();
    const state = location.state || {};
    const { type, query } = state;

    const getMessage = () => {
        if (type === 'barcode') {
            return {
                code: '404',
                title: 'Product Not Found',
                subtitle: `No product found with barcode "${query}"`,
                suggestion: 'The barcode may not be in our database. Try searching by product name.',
            };
        }
        if (type === 'product') {
            return {
                code: '404',
                title: 'Product Not Found',
                subtitle: `No product found with ID "${query}"`,
                suggestion: 'This product may have been removed or the link is incorrect.',
            };
        }
        return {
            code: '404',
            title: 'Page Not Found',
            subtitle: "The page you're looking for doesn't exist.",
            suggestion: "It may have been moved, deleted, or you mistyped the URL.",
        };
    };

    const msg = getMessage();

    return (
        <div className="not-found-page page page-centered">
            <div className="container">
                <div className="not-found-content">
                    <div className="not-found-code">{msg.code}</div>
                    <h1 className="not-found-title">{msg.title}</h1>
                    <p className="not-found-subtitle">{msg.subtitle}</p>
                    <p className="not-found-suggestion">{msg.suggestion}</p>

                    <div className="not-found-actions">
                        <Link to="/" className="btn btn-primary">Go to Home</Link>
                        <button onClick={() => window.history.back()} className="btn btn-secondary">
                            ← Go Back
                        </button>
                    </div>

                    <div className="not-found-tips">
                        <p className="not-found-tips-label">What you can do</p>
                        <ul>
                            <li>
                                <span>Search for products by name on the home page</span>
                            </li>
                            <li>
                                <span>Use the barcode scanner to find products</span>
                            </li>
                            <li>
                                <span>Check out our <Link to="/help">Help page</Link> for guidance</span>
                            </li>
                            <li>
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
