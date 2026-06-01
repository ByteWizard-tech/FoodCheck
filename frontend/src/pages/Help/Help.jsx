/**
 * Help Page — Dark Dashboard
 */

import './Help.css';
import { Link } from 'react-router-dom';

const helpSections = [
    {
        id: 'allergens',
        num: '01',
        title: 'Setting Your Allergens',
        steps: [
            'Go to the Home page',
            'Find the "Your Allergens" field',
            'Enter allergens separated by commas (e.g., "peanuts, milk, gluten")',
            'Your allergens are automatically saved in your browser',
            'They will be remembered when you return',
        ],
        colors: null,
        note: 'Your allergen information is stored locally in your browser and never sent to our servers.',
    },
    {
        id: 'search-name',
        num: '02',
        title: 'Searching by Product Name',
        steps: [
            'Go to the Home page',
            'Type the product name in the search bar',
            'Click "Search" or press Enter',
            'Browse through the results',
            'Click any product to view full details',
        ],
        colors: null,
        note: 'You can search brand names, product names, or general food categories.',
    },
    {
        id: 'scan-barcode',
        num: '03',
        title: 'Scanning Barcodes',
        steps: [
            'Go to the Home page',
            'Click the camera icon next to the search bar',
            'Allow camera access when prompted',
            'Point your camera at the product barcode',
            'Hold steady until the barcode is detected',
            'You will be redirected to the product details automatically',
        ],
        colors: null,
        note: 'Works best in good lighting. Ensure the entire barcode is visible in the frame.',
    },
    {
        id: 'health-score',
        num: '04',
        title: 'Understanding Health Scores',
        steps: [
            'Health scores range from 0 to 100',
            'Calculated using nutritional values, additives, and processing level',
        ],
        colors: [
            { range: '75–100', label: 'Excellent', type: 'good', meaning: 'Great nutritional profile' },
            { range: '50–74', label: 'Moderate', type: 'moderate', meaning: 'Consume in moderation' },
            { range: '0–49', label: 'Poor', type: 'poor', meaning: 'Consider healthier alternatives' },
        ],
        note: 'Health scores are for general guidance only. Always consult a healthcare professional for personalised dietary advice.',
    },
    {
        id: 'additives',
        num: '05',
        title: 'Understanding Additives',
        steps: [
            'Additives are listed with their E-codes (e.g., E322)',
            'Each additive shows its full name and a brief description',
            'Risk levels are color-coded:',
        ],
        colors: [
            { range: 'Low Risk', label: 'Low', type: 'good', meaning: 'Generally safe for most people' },
            { range: 'Medium Risk', label: 'Medium', type: 'moderate', meaning: 'May cause reactions in sensitive individuals' },
            { range: 'High Risk', label: 'High', type: 'poor', meaning: 'Controversial or potentially harmful' },
        ],
        note: 'Risk levels are based on current research and may vary based on individual health conditions.',
    },
];

const faqItems = [
    {
        question: 'Is my data safe?',
        answer: 'Yes. Your allergen information is stored locally in your browser using localStorage. We never send your personal data to our servers.',
    },
    {
        question: "Why can't I find my product?",
        answer: "Our database contains millions of products but may not have every item. Try different search terms, or use the barcode scanner for better accuracy.",
    },
    {
        question: 'How accurate are the health scores?',
        answer: 'Scores are calculated using nutritional data from Open Food Facts. They should be used as general guidance, not medical advice.',
    },
    {
        question: 'Does barcode scanning work on all devices?',
        answer: 'It requires a camera and a browser that supports camera access (most modern browsers do). Use the latest Chrome, Firefox, or Safari for best results.',
    },
    {
        question: 'Can I use this offline?',
        answer: 'No. An internet connection is required to search for products and retrieve nutritional information.',
    },
];

function Help() {
    return (
        <div className="help-page page">
            <div className="container">
                {/* Header */}
                <section className="help-header slide-up">
                    <div className="help-eyebrow">Help</div>
                    <h1 className="help-title">How to Use FoodCheck</h1>
                    <p className="help-subtitle">
                        Step-by-step guides to help you get the most out of the food compliance checker.
                    </p>
                </section>

                {/* Guide Sections */}
                <div className="help-sections fade-in">
                    {helpSections.map(section => (
                        <section key={section.id} id={section.id} className="help-section">
                            <div className="help-section-inner">
                                <div className="help-section-num">{section.num}</div>
                                <div className="help-section-body">
                                    <h2 className="help-section-title">{section.title}</h2>
                                    <ol className="help-steps">
                                        {section.steps.map((step, i) => (
                                            <li key={i} className="help-step">
                                                <span className="step-number">{i + 1}</span>
                                                <span className="step-text">{step}</span>
                                            </li>
                                        ))}
                                    </ol>

                                    {section.colors && (
                                        <div className="help-colors">
                                            {section.colors.map((c, i) => (
                                                <div key={i} className={`color-item color-${c.type}`}>
                                                    <span className="color-range">{c.range}</span>
                                                    <span className="color-meaning">{c.meaning}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {section.note && (
                                        <div className="help-note">
                                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10"/>
                                                <line x1="12" y1="8" x2="12" y2="12"/>
                                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                                            </svg>
                                            <p>{section.note}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* FAQ */}
                <section className="faq-section fade-in">
                    <div className="faq-label">FAQ</div>
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqItems.map((item, i) => (
                            <details key={i} className="faq-item">
                                <summary className="faq-question">
                                    <span>{item.question}</span>
                                    <svg className="faq-chevron" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </summary>
                                <p className="faq-answer">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="help-cta fade-in">
                    <h2>Still need help?</h2>
                    <p>Can't find what you're looking for? Our team is here to help.</p>
                    <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                </section>
            </div>
        </div>
    );
}

export default Help;
