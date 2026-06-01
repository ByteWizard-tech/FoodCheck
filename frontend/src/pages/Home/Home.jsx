/**
 * Home Page — Dark Dashboard
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllergenInput from '../../components/AllergenInput/AllergenInput';
import SearchBar from '../../components/SearchBar/SearchBar';
import BarcodeScanner from '../../components/BarcodeScanner/BarcodeScanner';
import { getProductByBarcode } from '../../services/api';
import './Home.css';

const features = [
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
        ),
        title: 'Search Products',
        description: 'Search by product name or barcode number instantly',
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
        ),
        title: 'Scan Barcodes',
        description: 'Use your camera to scan product barcodes on the go',
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="m10.29 3.86-8.29 14.29h18l-8.29-14.29a1 1 0 0 0-1.42 0Z"/><path d="M12 9v4M12 17h.01"/>
            </svg>
        ),
        title: 'Allergy Alerts',
        description: 'Get instantly warned about your specific allergens',
    },
    {
        icon: (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
            </svg>
        ),
        title: 'Health Scores',
        description: 'Detailed health ratings and nutritional breakdowns',
    },
];

function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [error, setError] = useState(null);

    const isBarcode = (query) => /^\d{8,13}$/.test(query);

    const handleSearch = async (query) => {
        setError(null);
        if (isBarcode(query)) {
            await handleBarcodeSearch(query);
        } else {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleBarcodeSearch = async (barcode) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getProductByBarcode(barcode);
            if (response.success && response.data) {
                navigate(`/product/${barcode}`);
            } else {
                navigate('/not-found', { state: { type: 'barcode', query: barcode } });
            }
        } catch (err) {
            if (err.error === 'Product not found') {
                navigate('/not-found', { state: { type: 'barcode', query: barcode } });
            } else {
                setError(err.message || 'Failed to fetch product. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBarcodeScan = (barcode) => {
        setIsScannerOpen(false);
        handleBarcodeSearch(barcode);
    };

    return (
        <div className="home-page page page-centered">
            <div className="container">
                {/* Hero */}
                <div className="home-hero slide-up">
                    <div className="home-eyebrow">
                        <span className="home-eyebrow-dot"></span>
                        Food Intelligence Dashboard
                    </div>
                    <h1 className="home-title">
                        Know exactly what<br />
                        <span className="home-title-accent">you're eating.</span>
                    </h1>
                    <p className="home-subtitle">
                        Analyse food products for allergens, additives, and health scores.
                        Make informed choices at a glance.
                    </p>
                </div>

                {/* Allergen Input */}
                <div className="home-allergen-section fade-in">
                    <AllergenInput />
                </div>

                {/* Search */}
                <div className="home-search-section fade-in">
                    <SearchBar
                        onSearch={handleSearch}
                        onCameraClick={() => setIsScannerOpen(true)}
                        isLoading={isLoading}
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="home-error alert alert-danger">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
                        </svg>
                        {error}
                    </div>
                )}

                {/* Stats */}
                <div className="home-stats fade-in">
                    <div className="home-stat">
                        <span className="home-stat-number">3M+</span>
                        <span className="home-stat-label">Products</span>
                    </div>
                    <div className="home-stat">
                        <span className="home-stat-number">180+</span>
                        <span className="home-stat-label">Countries</span>
                    </div>
                    <div className="home-stat">
                        <span className="home-stat-number">Real-time</span>
                        <span className="home-stat-label">Analysis</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="home-divider">
                    <span className="home-divider-text">Features</span>
                </div>

                {/* Features */}
                <div className="home-features">
                    {features.map((f) => (
                        <div className="feature-card fade-in" key={f.title}>
                            <div className="feature-icon-wrap">
                                {f.icon}
                            </div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-description">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <BarcodeScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleBarcodeScan}
            />
        </div>
    );
}

export default Home;
