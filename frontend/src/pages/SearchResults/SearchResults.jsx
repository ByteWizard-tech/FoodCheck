/**
 * SearchResults Page
 * Displays product search results with pagination
 */

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { searchProducts } from '../../services/api';
import './SearchResults.css';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        totalCount: 0
    });

    // Fetch products when query or page changes
    useEffect(() => {
        if (query) {
            fetchProducts(query, pagination.page);
        }
    }, [query, pagination.page]);

    // Fetch products from API
    const fetchProducts = async (searchQuery, page) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await searchProducts(searchQuery, page, 20);

            if (response.success) {
                setProducts(response.data.products);
                setPagination({
                    page: response.data.page,
                    totalPages: response.data.totalPages,
                    totalCount: response.data.totalCount
                });
            } else {
                setError(response.message || 'Failed to search products');
                setProducts([]);
            }
        } catch (err) {
            if (err.error === 'No products found') {
                setProducts([]);
                setPagination({ page: 1, totalPages: 0, totalCount: 0 });
            } else {
                setError(err.message || 'Failed to search products. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const { page, totalPages } = pagination;

        // Show max 5 page numbers
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="search-results-page page">
            <div className="container">
                {/* Header */}
                <div className="search-results-header">
                    <Link to="/" className="back-link">
                        ← Back to Search
                    </Link>
                    <h1 className="search-results-title">
                        Search Results for "{query}"
                    </h1>
                    {!isLoading && pagination.totalCount > 0 && (
                        <p className="search-results-count">
                            Found {pagination.totalCount} products
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="loading-text">Searching products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="search-results-error alert alert-danger">
                        <span>⚠️</span>
                        <p>{error}</p>
                    </div>
                )}

                {/* No Results */}
                {!isLoading && !error && products.length === 0 && (
                    <div className="search-results-empty">
                        <span className="empty-icon">🔍</span>
                        <h2>No Products Found</h2>
                        <p>We couldn't find any products matching "{query}".</p>
                        <p>Try different keywords or check your spelling.</p>
                        <Link to="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && products.length > 0 && (
                    <>
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn pagination-prev"
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    aria-label="Previous page"
                                >
                                    ← Prev
                                </button>

                                <div className="pagination-numbers">
                                    {getPageNumbers().map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            className={`pagination-number ${pageNum === pagination.page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
                                            aria-label={`Page ${pageNum}`}
                                            aria-current={pageNum === pagination.page ? 'page' : undefined}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="pagination-btn pagination-next"
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    aria-label="Next page"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
