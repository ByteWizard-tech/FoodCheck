/**
 * AllergenInput Component
 * Input for user allergens with localStorage persistence
 */

import { useState, useEffect } from 'react';
import './AllergenInput.css';

// localStorage key for allergens
const ALLERGENS_STORAGE_KEY = 'food_compliance_allergens';

function AllergenInput() {
    const [allergenText, setAllergenText] = useState('');
    const [savedAllergens, setSavedAllergens] = useState([]);
    const [showSaved, setShowSaved] = useState(false);

    // Load allergens from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(ALLERGENS_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSavedAllergens(parsed);
                setAllergenText(parsed.join(', '));
            } catch (e) {
                console.error('Failed to parse stored allergens:', e);
            }
        }
    }, []);

    // Parse allergen text into array
    const parseAllergens = (text) => {
        return text
            .split(',')
            .map(a => a.trim().toLowerCase())
            .filter(a => a.length > 0);
    };

    // Handle input change and save to localStorage
    const handleChange = (e) => {
        const text = e.target.value;
        setAllergenText(text);

        // Parse and save allergens
        const allergens = parseAllergens(text);
        setSavedAllergens(allergens);

        // Save to localStorage
        localStorage.setItem(ALLERGENS_STORAGE_KEY, JSON.stringify(allergens));
    };

    // Handle clear all allergens
    const handleClear = () => {
        setAllergenText('');
        setSavedAllergens([]);
        localStorage.removeItem(ALLERGENS_STORAGE_KEY);
    };

    // Remove a single allergen
    const removeAllergen = (allergenToRemove) => {
        const newAllergens = savedAllergens.filter(a => a !== allergenToRemove);
        setSavedAllergens(newAllergens);
        setAllergenText(newAllergens.join(', '));
        localStorage.setItem(ALLERGENS_STORAGE_KEY, JSON.stringify(newAllergens));
    };

    return (
        <div className="allergen-input-container">
            <div className="allergen-header">
                <label className="allergen-label" htmlFor="allergen-input">
                    <span className="allergen-icon">⚠️</span>
                    Your Allergens
                </label>
                {savedAllergens.length > 0 && (
                    <button
                        className="allergen-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear all allergens"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="allergen-input-wrapper">
                <input
                    id="allergen-input"
                    type="text"
                    className="allergen-input"
                    placeholder="Enter allergens separated by commas (e.g., peanuts, milk, gluten)"
                    value={allergenText}
                    onChange={handleChange}
                    aria-describedby="allergen-help"
                />
                {savedAllergens.length > 0 && (
                    <button
                        className="allergen-toggle-btn"
                        onClick={() => setShowSaved(!showSaved)}
                        aria-expanded={showSaved}
                        aria-label={showSaved ? 'Hide saved allergens' : 'Show saved allergens'}
                    >
                        {showSaved ? '▼' : '▶'} {savedAllergens.length}
                    </button>
                )}
            </div>

            {/* Saved allergens tags */}
            {showSaved && savedAllergens.length > 0 && (
                <div className="allergen-tags">
                    {savedAllergens.map((allergen, index) => (
                        <span key={index} className="allergen-tag">
                            {allergen}
                            <button
                                className="allergen-tag-remove"
                                onClick={() => removeAllergen(allergen)}
                                aria-label={`Remove ${allergen}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <p id="allergen-help" className="allergen-help">
                Your allergens are saved locally and will be used to check products for potential allergic reactions.
            </p>
        </div>
    );
}

// Export helper function to get allergens from localStorage
export function getUserAllergens() {
    const stored = localStorage.getItem(ALLERGENS_STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
}

export default AllergenInput;
