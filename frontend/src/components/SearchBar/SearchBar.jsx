/**
 * SearchBar Component — Dark Dashboard
 */

import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onCameraClick, isLoading = false }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim()) onSearch(query.trim());
    };

    return (
        <div className="search-bar-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="search-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>

                <input
                    type="text"
                    id="product-search"
                    className="search-input"
                    placeholder="Search by product name or barcode..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    aria-label="Search products"
                    autoComplete="off"
                />

                <button
                    type="button"
                    id="camera-scan-btn"
                    className="camera-button"
                    onClick={onCameraClick}
                    disabled={isLoading}
                    aria-label="Scan barcode with camera"
                    title="Scan barcode"
                >
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                    </svg>
                </button>

                <button
                    type="submit"
                    id="search-submit-btn"
                    className="search-button"
                    disabled={!query.trim() || isLoading}
                    aria-label="Search"
                >
                    {isLoading ? <span className="search-spinner"></span> : 'Search'}
                </button>
            </form>

            <p className="search-helper">
                Enter a product name to search, or a barcode number for direct lookup
            </p>
        </div>
    );
}

export default SearchBar;
