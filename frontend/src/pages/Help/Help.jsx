/**
 * Help Page
 * Step-by-step instructions for using the app
 */

import './Help.css';

function Help() {
    // Help sections with step-by-step instructions
    const helpSections = [
        {
            id: 'allergens',
            title: 'Entering Your Allergens',
            icon: '⚠️',
            steps: [
                'Go to the Home page',
                'Find the "Your Allergens" input field at the top',
                'Enter your allergens separated by commas (e.g., "peanuts, milk, gluten")',
                'Your allergens are automatically saved to your browser',
                'They will be remembered when you return to the site'
            ],
            note: 'Your allergen information is stored locally in your browser and never sent to our servers.'
        },
        {
            id: 'search-name',
            title: 'Searching by Product Name',
            icon: '🔍',
            steps: [
                'Go to the Home page',
                'Type the product name in the search bar',
                'Click the "Search" button or press Enter',
                'Browse through the search results',
                'Click on any product card to see detailed information'
            ],
            note: 'You can search for brand names, product names, or general food categories.'
        },
        {
            id: 'scan-barcode',
            title: 'Scanning Barcodes with Camera',
            icon: '📷',
            steps: [
                'Go to the Home page',
                'Click the camera button (📷) next to the search bar',
                'Allow camera access when prompted by your browser',
                'Point your camera at the product barcode',
                'Hold steady until the barcode is detected',
                'You will be automatically redirected to the product details'
            ],
            note: 'Barcode scanning works best in good lighting. Make sure the entire barcode is visible in the camera frame.'
        },
        {
            id: 'health-score',
            title: 'Understanding Health Scores',
            icon: '📊',
            steps: [
                'Health scores range from 0 to 100',
                'Scores are calculated based on nutritional values, additives, and processing level'
            ],
            colors: [
                { range: '80-100', color: 'Green', meaning: 'Excellent - This product has good nutritional value' },
                { range: '60-79', color: 'Yellow', meaning: 'Moderate - Consume in moderation' },
                { range: '0-59', color: 'Red', meaning: 'Poor - Consider healthier alternatives' }
            ],
            note: 'Health scores are for general guidance only. Always consult a healthcare professional for personalized dietary advice.'
        },
        {
            id: 'allergy-warnings',
            title: 'Understanding Allergy Warnings',
            icon: '🚨',
            steps: [
                'Set your allergens on the Home page first',
                'Search for a product',
                'On the product detail page, look for the red alert box',
                'If present, it means the product contains one or more of your allergens',
                'The specific matching allergens will be listed',
                'Allergens in the ingredient list will be highlighted'
            ],
            note: 'Always double-check product labels as formulations can change. When in doubt, contact the manufacturer.'
        },
        {
            id: 'additives',
            title: 'Understanding Additives',
            icon: '🧪',
            steps: [
                'Additives are listed with their E-codes (e.g., E322)',
                'Each additive shows its full name and description',
                'Risk levels are color-coded:'
            ],
            colors: [
                { label: 'Low Risk', color: 'Green', meaning: 'Generally safe for consumption' },
                { label: 'Medium Risk', color: 'Yellow', meaning: 'May cause reactions in sensitive individuals' },
                { label: 'High Risk', color: 'Red', meaning: 'Controversial or potentially harmful' }
            ],
            note: 'Risk levels are based on current research and may vary based on individual health conditions.'
        }
    ];

    // FAQ items
    const faqItems = [
        {
            question: 'Is my data safe?',
            answer: 'Yes! Your allergen information is stored locally in your browser using localStorage. We never send your personal data to our servers.'
        },
        {
            question: 'Why can\'t I find my product?',
            answer: 'Our database contains millions of products but may not have every item. Try searching with different terms, or use the barcode scan feature for better accuracy.'
        },
        {
            question: 'How accurate are the health scores?',
            answer: 'Health scores are calculated using nutritional data from Open Food Facts. While we strive for accuracy, scores should be used as general guidance, not medical advice.'
        },
        {
            question: 'Does the barcode scanner work on all devices?',
            answer: 'Barcode scanning requires a device with a camera and a browser that supports camera access (most modern browsers do). For best results, use the latest version of Chrome, Firefox, or Safari.'
        },
        {
            question: 'Can I use this offline?',
            answer: 'No, an internet connection is required to search for products and retrieve nutritional information from our database.'
        }
    ];

    return (
        <div className="help-page page">
            <div className="container">
                {/* Header */}
                <section className="help-header">
                    <h1 className="help-title">How to Use FoodCheck</h1>
                    <p className="help-subtitle">
                        Step-by-step guides to help you get the most out of our food compliance checker
                    </p>
                </section>

                {/* Quick Navigation */}
                <nav className="help-nav">
                    <h2>Quick Links</h2>
                    <ul className="help-nav-list">
                        {helpSections.map(section => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className="help-nav-link">
                                    <span>{section.icon}</span>
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Help Sections */}
                <div className="help-sections">
                    {helpSections.map(section => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="help-section"
                        >
                            <div className="help-section-header">
                                <span className="help-section-icon">{section.icon}</span>
                                <h2 className="help-section-title">{section.title}</h2>
                            </div>

                            <ol className="help-steps">
                                {section.steps.map((step, index) => (
                                    <li key={index} className="help-step">
                                        <span className="step-number">{index + 1}</span>
                                        <span className="step-text">{step}</span>
                                    </li>
                                ))}
                            </ol>

                            {section.colors && (
                                <div className="help-colors">
                                    {section.colors.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`color-item color-${item.color.toLowerCase()}`}
                                        >
                                            <span className="color-label">
                                                {item.range || item.label}
                                            </span>
                                            <span className="color-meaning">{item.meaning}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.note && (
                                <div className="help-note">
                                    <span className="note-icon">💡</span>
                                    <p>{section.note}</p>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* FAQ Section */}
                <section className="faq-section">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqItems.map((item, index) => (
                            <details key={index} className="faq-item">
                                <summary className="faq-question">
                                    {item.question}
                                </summary>
                                <p className="faq-answer">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Still Need Help */}
                <section className="help-contact">
                    <h2>Still Need Help?</h2>
                    <p>Can't find what you're looking for? Our team is here to help!</p>
                    <a href="/contact" className="btn btn-primary">
                        Contact Us
                    </a>
                </section>
            </div>
        </div>
    );
}

export default Help;
