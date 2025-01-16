import React, { useState, useEffect } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import "../App.css";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartLength, setCartLength] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

     const navigate = useNavigate();

    // Toggle functions
    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);
    const toggleSearch = () => setIsSearchOpen((prev) => !prev);
    const closeSearch = () => setIsSearchOpen(false);

    // Update cart length dynamically
    const updateCartLength = () => {
        const storedArray = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const totalLength = storedArray.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartLength(totalLength);
    };

    // Listen for changes in localStorage using a custom event
    useEffect(() => {
        updateCartLength(); // Initial load

        const handleCartUpdate = () => updateCartLength();
        window.addEventListener("storage", handleCartUpdate); // For cross-tab updates
        window.addEventListener("cartUpdated", handleCartUpdate); // Custom event for same-tab updates

        return () => {
            window.removeEventListener("storage", handleCartUpdate);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector(".dropdown-menu");
            const toggleButton = document.querySelector(".menu-toggle");

            // Check if the click is outside the dropdown menu and not on the toggle button
            if (dropdown && isOpen && !dropdown.contains(event.target) && !toggleButton.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);



    // Handle Search Navigation
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            closeSearch();
        }
    };

    return (
        <>
            <nav>
                <div className="dropdown-icon">
                    <span className="menu-toggle" onClick={toggleMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </div>

                <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                    <div className="subdropdown">
                        <div className="uppermenu">
                                <h1>Main Menu</h1>
                            
                            <NavLink to="/" onClick={closeMenu}><i className="fa-solid fa-house"></i> HOME</NavLink>
                            <NavLink to="/Menu" onClick={closeMenu}><i className="fa-solid fa-utensils"></i> MENU</NavLink>
                            <NavLink to="/profile-display" onClick={closeMenu}><i className="fa-solid fa-user"></i> YOUR PROFILE</NavLink>
                            <NavLink to="/profile-display" onClick={closeMenu}><i className="fa-solid fa-bag-shopping"></i> YOUR ORDERS</NavLink>
                            <NavLink to="/About" onClick={closeMenu}><i className="fa-solid fa-address-card"></i> ABOUT US</NavLink>
                            <NavLink to="/Contact" onClick={closeMenu}><i className="fa-solid fa-address-book"></i> CONTACT US</NavLink>
                            <NavLink to="/profile-display" onClick={closeMenu}><i className="fa-solid fa-gear"></i> SETTINGS</NavLink>
                        </div>
                        <div className="lowermenu">
                            <NavLink to="/login" className="login-btn" onClick={closeMenu}>LOGIN</NavLink>
                            <NavLink to="/signup" className="login-btn" onClick={closeMenu}>SIGNUP</NavLink>
                            <NavLink to="/login" className="login-btn" onClick={closeMenu}>LOGOUT</NavLink>
                        </div>
                    </div>
                </div>

                <div className="logo">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/final_navlogo.png`}
                        alt="Cafe Logo"
                    />
                </div>

                <div className="center">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Menu">Menu</NavLink>
                    <NavLink to="/About">About Us</NavLink>
                    <NavLink to="/Contact">Contact Us</NavLink>
                </div>

                <div className="right">
                    <span className="search" onClick={toggleSearch}><i className="fa-solid fa-magnifying-glass"></i></span>
                    <NavLink to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <sup>{cartLength}</sup>
                    </NavLink>
                    <NavLink to="/profile-display" className="profile"><i className="fa-solid fa-user"></i></NavLink>
                </div>
            </nav>
           
            {/* Search Results */}
            {isSearchOpen && (
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
            )}
        </>
    );
}

export default Nav;
