import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyles.css';
import axios from "axios";

export const CashOnDeliveryForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleOrderPlacement = async () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Check if all fields are filled
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
                localStorage.removeItem("cartItems"); // Clear cart items
                window.dispatchEvent(new Event("cartUpdated"));
                navigate("/orderPlaced"); // Navigate to the order placed page
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Cash On Delivery Form Submitted:', formData);
    };

    return (
        <div className="container-payment2">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <h3 className="title">Billing Address</h3>

                    <div className="inputBox">
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
                                placeholder="123456"
                                value={formData.zip}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Proceed to Checkout"
                    className="loginbtn submit_btn"
                    onClick={handleOrderPlacement}
                />
            </form>
        </div>
    );
};
