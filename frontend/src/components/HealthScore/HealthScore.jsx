/**
 * HealthScore Component — Dark Dashboard
 */

import './HealthScore.css';

function HealthScore({ score, showLabel = true }) {
    const getScoreCategory = (score) => {
        if (score >= 75) return { class: 'score-excellent', label: 'Excellent', desc: 'Great nutritional profile' };
        if (score >= 50) return { class: 'score-moderate', label: 'Moderate', desc: 'Moderate nutritional value' };
        return { class: 'score-poor', label: 'Poor', desc: 'Low nutritional profile' };
    };

    const category = getScoreCategory(score);
    // SVG circle: r=42 => circumference = 2π*42 ≈ 263.9
    const circumference = 2 * Math.PI * 42;
    const dash = (score / 100) * circumference;

    return (
        <div className={`health-score ${category.class}`}>
            <div className="health-score-circle">
                <svg viewBox="0 0 100 100" className="health-score-svg">
                    <circle cx="50" cy="50" r="42" className="health-score-bg" />
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="health-score-progress"
                        style={{ strokeDasharray: `${dash} ${circumference}` }}
                    />
                </svg>
                <div className="health-score-value">
                    <span className="health-score-number">{score}</span>
                    <span className="health-score-max">/100</span>
                </div>
            </div>

            {showLabel && (
                <div className="health-score-info">
                    <div className="health-score-label">
                        <span className="health-score-badge">{category.label}</span>
                    </div>
                    <p className="health-score-desc">{category.desc}</p>
                </div>
            )}
        </div>
    );
}

export default HealthScore;
