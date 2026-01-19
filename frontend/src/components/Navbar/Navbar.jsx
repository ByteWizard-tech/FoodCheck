/**
 * Navbar Component
 * Top navigation bar with responsive mobile menu
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    // Track mobile menu open state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Navigation links configuration
    const navLinks = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/about', label: 'About', icon: '📋' },
        { path: '/contact', label: 'Contact', icon: '✉️' },
        { path: '/help', label: 'Help', icon: '❓' }
    ];

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when link is clicked
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                {/* Logo/Brand */}
                <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
                    <span className="navbar-logo">🥗</span>
                    <span className="navbar-title">FoodCheck</span>
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="navbar-links hide-mobile">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                <span className="navbar-link-icon">{link.icon}</span>
                                <span className="navbar-link-label">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="navbar-toggle hide-desktop"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Mobile Navigation Menu */}
                <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-mobile-links">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`navbar-mobile-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                >
                                    <span className="navbar-link-icon">{link.icon}</span>
                                    <span className="navbar-link-label">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="navbar-overlay" onClick={handleLinkClick}></div>
            )}
        </nav>
    );
}

export default Navbar;
