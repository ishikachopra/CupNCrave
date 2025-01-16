import React, { useEffect } from "react";
import Popular from "./popular";
import Discount from "./discount";
import { ReactTyped } from 'react-typed';
import { NavLink } from "react-router-dom";
import Reviews from "./testimonials";

function Section1() {
    useEffect(() => {
        const slides = document.querySelectorAll(".fade");
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add("active");
                } else {
                    slide.classList.remove("active");
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Show the first slide initially
        showSlide(currentSlide);

        // Automatically switch to the next slide every 3 seconds
        const intervalId = setInterval(nextSlide, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <section id="section1">
                <div className="bg">
                    <div className="frontflex">
                        <div className="heading">
                            <div className="text">
                                <img src={`${process.env.PUBLIC_URL}/images/finallogo.png`} alt="Cafe Logo" id="coffeeshop" />
                                <h1>
                                    <ReactTyped
                                        strings={['Brew-tiful Mornings Starts Here !']}
                                        typeSpeed={50}
                                        backSpeed={30}
                                        loop={false}
                                        showCursor={false}
                                    />
                                </h1>
                                <h3>
                                    Welcome to Cup n Crave, where every cup tells a story and every bite is a delight. Nestled in the heart of India, our charming cafe beckons you with the irresistible aroma of freshly brewed coffee and the promise of culinary delights.
                                </h3>
                                <div id="loginbuttons">
                                    <NavLink className="bordered-button" to="/login">Login</NavLink>
                                    <NavLink className="colored-button" to="/signup">Signup</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="slideshow">
                            <div className="animationimg">
                                <img src={`${process.env.PUBLIC_URL}/images/dish1.png`} className="fade" alt="Dish 1" />
                                <img src={`${process.env.PUBLIC_URL}/images/dish2.png`} className="fade" alt="Dish 2" />
                                <img src={`${process.env.PUBLIC_URL}/images/dish3.png`} className="fade" alt="Dish 3" />
                                <img src={`${process.env.PUBLIC_URL}/images/dish6.png`} className="fade" alt="Dish 4" />
                                <img src={`${process.env.PUBLIC_URL}/images/dish5.png`} className="fade" alt="Dish 5" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Discount />
            <Popular />
            <Reviews />
        </>
    );
}

export default Section1;


