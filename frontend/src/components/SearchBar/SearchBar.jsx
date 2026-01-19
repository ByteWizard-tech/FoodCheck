/**
 * SearchBar Component
 * Search input with product name/barcode and camera button for barcode scanning
 */

import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onCameraClick, isLoading = false }) {
    const [query, setQuery] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="search-bar-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                {/* Search Icon */}
                <div className="search-icon">
                    🔍
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by product name or barcode..."
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    aria-label="Search products"
                />

                {/* Search Button */}
                <button
                    type="submit"
                    className="search-button"
                    disabled={!query.trim() || isLoading}
                    aria-label="Search"
                >
                    {isLoading ? (
                        <span className="search-spinner"></span>
                    ) : (
                        'Search'
                    )}
                </button>

                {/* Camera Button for Barcode Scanning */}
                <button
                    type="button"
                    className="camera-button"
                    onClick={onCameraClick}
                    disabled={isLoading}
                    aria-label="Scan barcode with camera"
                    title="Scan barcode with camera"
                >
                    📷
                </button>
            </form>

            {/* Helper text */}
            <p className="search-helper">
                Enter a product name to search, or a barcode number for direct lookup
            </p>
        </div>
    );
}

export default SearchBar;
