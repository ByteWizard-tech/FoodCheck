/**
 * SearchResults Page — Dark Dashboard
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
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCount: 0 });

    // Reset to page 1 when query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        if (query) fetchProducts(query, currentPage);
    }, [query, currentPage]);

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
                    totalCount: response.data.totalCount,
                });
            } else {
                setError(response.message || 'Failed to search products');
                setProducts([]);
            }
        } catch (err) {
            setError(err.message || 'Failed to search products. Please try again.');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const { page, totalPages } = pagination;
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    return (
        <div className="search-results-page page">
            <div className="container">
                {/* Header */}
                <div className="search-results-header">
                    <Link to="/" className="back-link">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Back to Search
                    </Link>
                    <h1 className="search-results-title">
                        Results for <span className="search-results-title-query">"{query}"</span>
                    </h1>
                    {!isLoading && pagination.totalCount > 0 && (
                        <p className="search-results-count">{pagination.totalCount} products found</p>
                    )}
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="loading-text">Searching products...</p>
                    </div>
                )}

                {/* Error */}
                {error && !isLoading && (
                    <div className="search-results-error alert alert-danger">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
                        </svg>
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty */}
                {!isLoading && !error && products.length === 0 && (
                    <div className="search-results-empty">
                        <div className="empty-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                                <path d="m8 11 3 3 3-3"/>
                            </svg>
                        </div>
                        <h2>No Products Found</h2>
                        <p>We couldn't find any products matching "{query}". Try different keywords or check your spelling.</p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </div>
                )}

                {/* Results */}
                {!isLoading && products.length > 0 && (
                    <>
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {pagination.totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn pagination-prev"
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                >
                                    ← Prev
                                </button>
                                <div className="pagination-numbers">
                                    {getPageNumbers().map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            className={`pagination-number ${pageNum === pagination.page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
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
