/**
 * AllergyWarning Component
 * Red alert box showing matched allergens
 */

import './AllergyWarning.css';

function AllergyWarning({ matchedAllergens }) {
    // Don't render if no matched allergens
    if (!matchedAllergens || matchedAllergens.length === 0) {
        return null;
    }

    return (
        <div className="allergy-warning">
            <div className="allergy-warning-header">
                <span className="allergy-warning-icon">⚠️</span>
                <h3 className="allergy-warning-title">Allergy Warning!</h3>
            </div>

            <p className="allergy-warning-message">
                This product contains ingredients that match your saved allergens:
            </p>

            <div className="allergy-warning-list">
                {matchedAllergens.map((allergen, index) => (
                    <span key={index} className="allergy-warning-tag">
                        {allergen}
                    </span>
                ))}
            </div>

            <p className="allergy-warning-disclaimer">
                Please check the full ingredient list and consult with a healthcare professional if you have concerns.
            </p>
        </div>
    );
}

export default AllergyWarning;
