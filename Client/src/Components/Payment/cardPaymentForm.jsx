import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyles.css';
import axios from "axios";

export const CardPaymentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardName: '',
        cardNum: '',
        expMonth: '',
        expYear: '',
        cvv: '',
    });

    const handleOrderPlacement = async () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (Object.values(formData).some(value => value === '')) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/CupnCrave/Checkout",
                { cartItems, total },
                { withCredentials: true }
            );

            if (response.status === 201) {
                console.log("Order placed successfully:", response.data);
                localStorage.removeItem("cartItems");
                window.dispatchEvent(new Event("cartUpdated"));
                navigate("/orderPlaced");
            } else {
                console.error("Failed to place order:", response.data);
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className="container-payment2">
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="col">
                        <h3 className="title">Billing Address</h3>
                        <div className="inputBox">
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex">
                            <div className="inputBox">
                                <label htmlFor="state">State:</label>
                                <input
                                    type="text"
                                    id="state"
                                    placeholder="Enter state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <label htmlFor="zip">Zip Code:</label>
                                <input
                                    type="number"
                                    id="zip"
                                    placeholder="123 456"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h3 className="title">Payment</h3>
                        <div className="inputBox">
                            <label htmlFor="name">Card Accepted:</label>
                            <img
                                src="https://i.ibb.co/X38b5PF/card-img.png"
                                alt="Card Accepted"
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="cardName">Name On Card:</label>
                            <input
                                type="text"
                                id="cardName"
                                placeholder="Enter card name"
                                value={formData.cardName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="cardNum">Credit Card Number:</label>
                            <input
                                type="text"
                                id="cardNum"
                                placeholder="1111-2222-3333-4444"
                                maxLength="19"
                                value={formData.cardNum}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="expMonth">Exp Month:</label>
                            <select
                                id="expMonth"
                                value={formData.expMonth}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                    <option value={month} key={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex">
                            <div className="inputBox">
                                <label htmlFor="expYear">Exp Year:</label>
                                <select
                                    id="expYear"
                                    value={formData.expYear}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choose Year</option>
                                    {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                        <option value={year} key={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="cvv">CVV:</label>
                                <input
                                    type="number"
                                    id="cvv"
                                    placeholder="1234"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Proceed to Checkout"
                    className="submit_btn loginbtn"
                    onClick={handleOrderPlacement}
                />
            </form>
        </div>
    );
};