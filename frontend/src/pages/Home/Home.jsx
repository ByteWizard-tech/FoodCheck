/**
 * Home Page
 * Main landing page with allergen input and search functionality
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllergenInput from '../../components/AllergenInput/AllergenInput';
import SearchBar from '../../components/SearchBar/SearchBar';
import BarcodeScanner from '../../components/BarcodeScanner/BarcodeScanner';
import { getProductByBarcode } from '../../services/api';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [error, setError] = useState(null);

    // Check if query looks like a barcode (only digits, 8-13 characters)
    const isBarcode = (query) => {
        return /^\d{8,13}$/.test(query);
    };

    // Handle search submission
    const handleSearch = async (query) => {
        setError(null);

        // If it's a barcode, try direct lookup
        if (isBarcode(query)) {
            await handleBarcodeSearch(query);
        } else {
            // Navigate to search results page with query
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    // Handle barcode search (direct product lookup)
    const handleBarcodeSearch = async (barcode) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getProductByBarcode(barcode);

            if (response.success && response.data) {
                // Navigate directly to product detail page
                navigate(`/product/${barcode}`);
            } else {
                // Product not found
                navigate('/not-found', {
                    state: {
                        type: 'barcode',
                        query: barcode
                    }
                });
            }
        } catch (err) {
            if (err.error === 'Product not found') {
                navigate('/not-found', {
                    state: {
                        type: 'barcode',
                        query: barcode
                    }
                });
            } else {
                setError(err.message || 'Failed to fetch product. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle camera button click
    const handleCameraClick = () => {
        setIsScannerOpen(true);
    };

    // Handle barcode scanned from camera
    const handleBarcodeScan = (barcode) => {
        setIsScannerOpen(false);
        handleBarcodeSearch(barcode);
    };

    return (
        <div className="home-page page page-centered">
            <div className="container">
                {/* Hero Section */}
                <div className="home-hero slide-up">
                    <h1 className="home-title">
                        <span className="home-title-emoji">🥗</span>
                        Food Compliance Checker
                    </h1>
                    <p className="home-subtitle">
                        Check food products for allergens, additives, and health scores.
                        Make informed choices about what you eat.
                    </p>
                </div>

                {/* Allergen Input Section */}
                <div className="home-allergen-section fade-in">
                    <AllergenInput />
                </div>

                {/* Search Section */}
                <div className="home-search-section fade-in">
                    <SearchBar
                        onSearch={handleSearch}
                        onCameraClick={handleCameraClick}
                        isLoading={isLoading}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="home-error alert alert-danger">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                {/* Features Section */}
                <div className="home-features">
                    <div className="feature-card fade-in">
                        <span className="feature-icon">🔍</span>
                        <h3 className="feature-title">Search Products</h3>
                        <p className="feature-description">
                            Search by product name or barcode number
                        </p>
                    </div>

                    <div className="feature-card fade-in">
                        <span className="feature-icon">📷</span>
                        <h3 className="feature-title">Scan Barcodes</h3>
                        <p className="feature-description">
                            Use your camera to scan product barcodes
                        </p>
                    </div>

                    <div className="feature-card fade-in">
                        <span className="feature-icon">⚠️</span>
                        <h3 className="feature-title">Allergy Alerts</h3>
                        <p className="feature-description">
                            Get warned about your specific allergens
                        </p>
                    </div>

                    <div className="feature-card fade-in">
                        <span className="feature-icon">📊</span>
                        <h3 className="feature-title">Health Scores</h3>
                        <p className="feature-description">
                            See detailed health ratings and nutritional info
                        </p>
                    </div>
                </div>
            </div>

            {/* Barcode Scanner Modal */}
            <BarcodeScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleBarcodeScan}
            />
        </div>
    );
}

export default Home;
