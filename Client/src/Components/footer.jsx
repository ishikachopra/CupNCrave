import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Welcome to our cozy cafe! We serve the best coffee and pastries in town.</p>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>123 Coffee Street, Caffeine City, CO 12345</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@cupncrave.com</p>
                </div>
                <div className="footer-section">
                    <h4>Opening Hours</h4>
                    <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                    <p>Saturday - Sunday: 8:00 AM - 6:00 PM</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Cup & Crave. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
