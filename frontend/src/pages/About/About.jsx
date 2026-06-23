/**
 * About Page — Dark Dashboard
 */

import './About.css';

const teamMembers = [
    { name: 'Omesh Sengar', initials: 'OS' },
    { name: 'Nandan Reddy', initials: 'NR' },
];

const features = [
    { title: 'Product Search', desc: 'Search millions of food products by name or barcode' },
    { title: 'Barcode Scanning', desc: 'Instantly scan barcodes using your device camera' },
    { title: 'Allergen Alerts', desc: 'Personalised warnings based on your saved allergens' },
    { title: 'Chemical Decoder', desc: 'Translate E-codes into understandable ingredient names' },
    { title: 'Health Scores', desc: 'Color-coded health ratings at a glance' },
    { title: 'Mobile Friendly', desc: 'Use anywhere—at home or in the grocery store' },
];

function About() {
    return (
        <div className="about-page page">
            <div className="container">
                {/* Hero */}
                <section className="about-hero slide-up">
                    <div className="about-eyebrow">About</div>
                    <h1 className="about-title">Built for people who<br />care about what they eat.</h1>
                    <p className="about-subtitle">
                        FoodCheck empowers consumers to make informed decisions
                        about the food they eat — instantly, anywhere.
                    </p>
                </section>

                {/* Problem & Solution */}
                <section className="about-two-col fade-in">
                    <div className="about-card">
                        <div className="about-card-label">The Problem</div>
                        <h2>Food labels are hard to read.</h2>
                        <p>
                            Chemical codes like "E171" or "E621" mean nothing to most consumers.
                            People with allergies struggle to quickly identify safe products.
                            Understanding product healthiness requires nutritional expertise
                            most people don't have.
                        </p>
                    </div>
                    <div className="about-card about-card-accent">
                        <div className="about-card-label">Our Solution</div>
                        <h2>We translate it for you.</h2>
                        <p>
                            FoodCheck converts complex food labels into clear, actionable information.
                            We decode E-codes, give personalised allergen warnings, and calculate
                            easy-to-understand health scores — all in seconds.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="about-section fade-in">
                    <div className="about-section-label">What We Do</div>
                    <div className="about-features-grid">
                        {features.map((f, i) => (
                            <div className="about-feature-item" key={i}>
                                <div className="about-feature-num">{String(i + 1).padStart(2, '0')}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="about-section fade-in">
                    <div className="about-section-label">The Team</div>
                    <p className="about-team-desc">Biosafety Team — RV College of Engineering, Bangalore</p>
                    <div className="about-team-grid">
                        {teamMembers.map((m, i) => (
                            <div className="about-team-card" key={i}>
                                <div className="about-team-avatar">{m.initials}</div>
                                <h3 className="about-team-name">{m.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Data Source */}
                <section className="about-datasource fade-in">
                    <div className="about-datasource-inner">
                        <div className="about-datasource-text">
                            <div className="about-card-label">Data Source</div>
                            <h2>Powered by Open Food Facts</h2>
                            <p>
                                A free, open, collaborative database of food products from around the world
                                — with data on over 3 million products globally.
                            </p>
                        </div>
                        <a
                            href="https://world.openfoodfacts.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Visit Open Food Facts →
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
