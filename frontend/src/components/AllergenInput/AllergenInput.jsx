/**
 * AllergenInput Component — Dark Dashboard
 */

import { useState, useEffect } from 'react';
import './AllergenInput.css';

const ALLERGENS_STORAGE_KEY = 'food_compliance_allergens';

function AllergenInput() {
    const [allergenText, setAllergenText] = useState('');
    const [savedAllergens, setSavedAllergens] = useState([]);
    const [showSaved, setShowSaved] = useState(false);

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

    const parseAllergens = (text) =>
        text.split(',').map(a => a.trim().toLowerCase()).filter(a => a.length > 0);

    const handleChange = (e) => {
        const text = e.target.value;
        setAllergenText(text);
        const allergens = parseAllergens(text);
        setSavedAllergens(allergens);
        localStorage.setItem(ALLERGENS_STORAGE_KEY, JSON.stringify(allergens));
    };

    const handleClear = () => {
        setAllergenText('');
        setSavedAllergens([]);
        setShowSaved(false);
        localStorage.removeItem(ALLERGENS_STORAGE_KEY);
    };

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
                    <svg className="allergen-label-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Your Allergens
                </label>
                {savedAllergens.length > 0 && (
                    <button className="allergen-clear-btn" onClick={handleClear} aria-label="Clear all allergens">
                        Clear all
                    </button>
                )}
            </div>

            <div className="allergen-input-wrapper">
                <input
                    id="allergen-input"
                    type="text"
                    className="allergen-input"
                    placeholder="e.g. peanuts, milk, gluten, shellfish..."
                    value={allergenText}
                    onChange={handleChange}
                    aria-describedby="allergen-help"
                />
                {savedAllergens.length > 0 && (
                    <button
                        className="allergen-toggle-btn"
                        onClick={() => setShowSaved(!showSaved)}
                        aria-expanded={showSaved}
                    >
                        {showSaved ? '▲' : '▼'} {savedAllergens.length}
                    </button>
                )}
            </div>

            {showSaved && savedAllergens.length > 0 && (
                <div className="allergen-tags">
                    {savedAllergens.map((allergen, i) => (
                        <span key={i} className="allergen-tag">
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
                Allergens are saved locally and checked against every product you view.
            </p>
        </div>
    );
}

export function getUserAllergens() {
    const stored = localStorage.getItem(ALLERGENS_STORAGE_KEY);
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { return []; }
    }
    return [];
}

export default AllergenInput;
