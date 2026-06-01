/**
 * Navbar Component — Dark Dashboard
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
        { path: '/help', label: 'Help' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleLinkClick = () => setIsMenuOpen(false);
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                {/* Logo */}
                <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
                    <div className="navbar-logo-mark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                    </div>
                    <span className="navbar-title">Food<span>Check</span></span>
                </Link>

                {/* Desktop Links */}
                <ul className="navbar-links hide-mobile">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggle hide-desktop"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Mobile Menu */}
                <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-mobile-links">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`navbar-mobile-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isMenuOpen && (
                <div className="navbar-overlay" onClick={handleLinkClick}></div>
            )}
        </nav>
    );
}

export default Navbar;
