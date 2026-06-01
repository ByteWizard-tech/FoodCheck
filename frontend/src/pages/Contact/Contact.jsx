/**
 * Contact Page — Dark Dashboard
 */

import { useState } from 'react';
import './Contact.css';

const contactInfo = [
    {
        icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
            </svg>
        ),
        title: 'Email',
        value: 'support@foodcheck.app',
        link: 'mailto:support@foodcheck.app',
    },
    {
        icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
        ),
        title: 'Location',
        value: 'RVCE Campus, Bangalore, India',
        link: null,
    },
    {
        icon: (
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
        ),
        title: 'Response Time',
        value: 'Within 24–48 hours',
        link: null,
    },
];

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page page">
            <div className="container">
                {/* Header */}
                <section className="contact-header slide-up">
                    <div className="contact-eyebrow">Contact</div>
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Have questions, feedback, or suggestions? We'd love to hear from you.
                    </p>
                </section>

                <div className="contact-layout">
                    {/* Form */}
                    <div className="contact-form-container fade-in">
                        {submitted ? (
                            <div className="contact-success">
                                <div className="success-icon">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22 4 12 14.01 9 11.01"/>
                                    </svg>
                                </div>
                                <h2>Message Sent</h2>
                                <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-header">
                                    <h2>Send a Message</h2>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name" className="form-label">Name</label>
                                        <input
                                            type="text" id="contact-name" name="name"
                                            className="form-input" placeholder="Your name"
                                            value={formData.name} onChange={handleChange} required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email" className="form-label">Email</label>
                                        <input
                                            type="email" id="contact-email" name="email"
                                            className="form-input" placeholder="your@email.com"
                                            value={formData.email} onChange={handleChange} required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                                    <input
                                        type="text" id="contact-subject" name="subject"
                                        className="form-input" placeholder="What is this about?"
                                        value={formData.subject} onChange={handleChange} required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message" className="form-label">Message</label>
                                    <textarea
                                        id="contact-message" name="message"
                                        className="form-textarea" placeholder="Your message..."
                                        rows="5" value={formData.message} onChange={handleChange} required
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}

                                <button
                                    type="submit" id="contact-submit"
                                    className="btn btn-primary form-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <><span className="spinner spinner-sm"></span> Sending...</>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info */}
                    <div className="contact-info-container fade-in">
                        <div className="contact-info-card">
                            <h2 className="info-title">Contact Information</h2>
                            <div className="contact-info-list">
                                {contactInfo.map((info, i) => (
                                    <div className="contact-info-item" key={i}>
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-content">
                                            <span className="info-label">{info.title}</span>
                                            {info.link ? (
                                                <a href={info.link} className="info-value info-link">{info.value}</a>
                                            ) : (
                                                <p className="info-value">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
