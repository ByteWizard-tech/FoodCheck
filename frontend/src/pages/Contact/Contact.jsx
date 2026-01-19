/**
 * Contact Page
 * Contact form and information
 */

import { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Simulate form submission (in real app, this would be an API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Contact information
    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'support@foodcheck.app',
            link: 'mailto:support@foodcheck.app'
        },
        {
            icon: '📍',
            title: 'Location',
            value: 'RVCE Campus, Bangalore, India',
            link: null
        },
        {
            icon: '⏰',
            title: 'Response Time',
            value: 'Within 24-48 hours',
            link: null
        }
    ];

    return (
        <div className="contact-page page">
            <div className="container">
                {/* Header */}
                <section className="contact-header">
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Have questions, feedback, or suggestions? We'd love to hear from you!
                    </p>
                </section>

                <div className="contact-content">
                    {/* Contact Form */}
                    <div className="contact-form-container">
                        {submitted ? (
                            <div className="contact-success">
                                <span className="success-icon">✅</span>
                                <h2>Message Sent!</h2>
                                <p>
                                    Thank you for reaching out. We'll get back to you as soon as possible.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h2 className="form-title">Send us a Message</h2>

                                {/* Name Field */}
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Subject Field */}
                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-input"
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Type your message here..."
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="form-error">
                                        ⚠️ {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary form-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="btn-spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="contact-info-container">
                        <h2 className="info-title">Contact Information</h2>
                        <p className="info-subtitle">
                            You can also reach us through the following channels:
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-info-item">
                                    <span className="info-icon">{info.icon}</span>
                                    <div className="info-content">
                                        <h3 className="info-label">{info.title}</h3>
                                        {info.link ? (
                                            <a href={info.link} className="info-value">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="info-value">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links Placeholder */}
                        <div className="social-links">
                            <h3>Follow Us</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                                <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
                                <a href="#" className="social-icon" aria-label="GitHub">💻</a>
                                <a href="#" className="social-icon" aria-label="Instagram">📸</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
