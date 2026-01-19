/**
 * HealthScore Component
 * Displays health score with color-coded indicator
 */

import './HealthScore.css';

function HealthScore({ score, showLabel = true }) {
    // Determine score category and color
    const getScoreCategory = (score) => {
        if (score >= 80) return { class: 'score-excellent', label: 'Excellent', emoji: '🌟' };
        if (score >= 60) return { class: 'score-moderate', label: 'Moderate', emoji: '⚡' };
        return { class: 'score-poor', label: 'Poor', emoji: '⚠️' };
    };

    const category = getScoreCategory(score);

    // Calculate rotation for circular progress
    const rotation = (score / 100) * 360;

    return (
        <div className={`health-score ${category.class}`}>
            {/* Circular Progress Indicator */}
            <div className="health-score-circle">
                <svg viewBox="0 0 100 100" className="health-score-svg">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="health-score-bg"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="health-score-progress"
                        style={{
                            strokeDasharray: `${(score / 100) * 283} 283`
                        }}
                    />
                </svg>
                {/* Score number */}
                <div className="health-score-value">
                    <span className="health-score-number">{score}</span>
                    <span className="health-score-max">/100</span>
                </div>
            </div>

            {/* Label */}
            {showLabel && (
                <div className="health-score-label">
                    <span className="health-score-emoji">{category.emoji}</span>
                    <span className="health-score-text">{category.label}</span>
                </div>
            )}
        </div>
    );
}

export default HealthScore;
