/**
 * AllergyWarning Component — Dark Dashboard
 */

import './AllergyWarning.css';

function AllergyWarning({ matchedAllergens }) {
    if (!matchedAllergens || matchedAllergens.length === 0) return null;

    return (
        <div className="allergy-warning" role="alert">
            <div className="allergy-warning-header">
                <div className="allergy-warning-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <h3 className="allergy-warning-title">Allergy Warning</h3>
            </div>
            <p className="allergy-warning-message">
                This product contains ingredients that match your saved allergens:
            </p>
            <div className="allergy-warning-list">
                {matchedAllergens.map((allergen, i) => (
                    <span key={i} className="allergy-warning-tag">{allergen}</span>
                ))}
            </div>
            <p className="allergy-warning-disclaimer">
                Please check the full ingredient list and consult a healthcare professional if you have concerns.
            </p>
        </div>
    );
}

export default AllergyWarning;
