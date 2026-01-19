/**
 * About Page
 * Information about the project, team, and purpose
 */

import './About.css';

function About() {
    // Team members data
    const teamMembers = [
        {
            name: 'P R Hari Hara Sai Pratham',
            role: '',
            bio: '',
            avatar: '👨‍💻'
        },
        {
            name: 'Pramath J',
            role: '',
            bio: '',
            avatar: '👩‍💻'
        },
        {
            name: 'Prarthana Upadhyaya',
            role: '',
            bio: '.',
            avatar: '🎨'
        },
        {
            name: 'Poojith Prasad Khanapur',
            role: '',
            bio: '.',
            avatar: '🔍'
        }
    ];

    return (
        <div className="about-page page">
            <div className="container">
                {/* Hero Section */}
                <section className="about-hero">
                    <h1 className="about-title">About FoodCheck</h1>
                    <p className="about-subtitle">
                        Empowering consumers to make informed decisions about the food they eat
                    </p>
                </section>

                {/* Mission Section */}
                <section className="about-section">
                    <div className="about-card">
                        <span className="about-card-icon">🎯</span>
                        <h2>Our Mission</h2>
                        <p>
                            FoodCheck was created to help people understand what's in their food.
                            We believe everyone deserves to know exactly what they're eating,
                            especially those with food allergies, dietary restrictions, or
                            health-conscious lifestyles.
                        </p>
                    </div>
                </section>

                {/* Problem & Solution */}
                <section className="about-grid">
                    <div className="about-card">
                        <span className="about-card-icon">❓</span>
                        <h2>The Problem</h2>
                        <p>
                            Reading food labels is confusing. Chemical codes like "E171" or
                            "E621" don't mean anything to most consumers. People with allergies
                            struggle to quickly identify if a product is safe for them.
                            Understanding the overall healthiness of a product requires
                            nutritional expertise.
                        </p>
                    </div>

                    <div className="about-card">
                        <span className="about-card-icon">✅</span>
                        <h2>Our Solution</h2>
                        <p>
                            FoodCheck translates complex food labels into simple, actionable
                            information. We convert chemical codes into readable names, provide
                            personalized allergen warnings, and calculate easy-to-understand
                            health scores—all in seconds by scanning a barcode or searching
                            a product name.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="about-section">
                    <h2 className="section-heading">What We Do</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <span className="feature-emoji">🔍</span>
                            <h3>Product Search</h3>
                            <p>Search millions of food products by name or barcode</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-emoji">📷</span>
                            <h3>Barcode Scanning</h3>
                            <p>Instantly scan barcodes using your device's camera</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-emoji">⚠️</span>
                            <h3>Allergen Alerts</h3>
                            <p>Personalized warnings based on your saved allergens</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-emoji">🧪</span>
                            <h3>Chemical Decoder</h3>
                            <p>Translate E-codes into understandable ingredient names</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-emoji">📊</span>
                            <h3>Health Scores</h3>
                            <p>Color-coded health ratings at a glance</p>
                        </div>
                        <div className="feature-item">
                            <span className="feature-emoji">📱</span>
                            <h3>Mobile Friendly</h3>
                            <p>Use anywhere—at home or in the grocery store</p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="about-section">
                    <h2 className="section-heading">Meet Our Team</h2>
                    <p className="section-description">
                        Biosafety Team - Dedicated to making food information accessible to everyone
                    </p>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">{member.avatar}</div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Data Source */}
                <section className="about-section">
                    <div className="about-card data-card">
                        <span className="about-card-icon">📚</span>
                        <h2>Our Data Source</h2>
                        <p>
                            FoodCheck is powered by <strong>Open Food Facts</strong>, a free,
                            open, collaborative database of food products from around the world.
                            With information on over 2 million products, we can provide detailed
                            nutritional information, ingredient lists, and allergen data for
                            products globally.
                        </p>
                        <a
                            href="https://world.openfoodfacts.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            Learn More About Open Food Facts →
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
