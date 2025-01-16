import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toastStyles.css";
import axios from "axios";

export const RazorpayPayment = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleOrderPlacement = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some((field) => field === "")) {
            toast.error("All fields are required!");
            return;
        }

        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            toast.error("Failed to load Razorpay SDK. Please try again.");
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        try {
            // Generate Razorpay order
            const orderResponse = await axios.post(
                "http://localhost:3000/CupnCrave/CreateRazorpayOrder",
                { total },
                { withCredentials: true }
            );

            if (orderResponse.status !== 200) {
                toast.error("Failed to create Razorpay order. Please try again.");
                return;
            }

            const { id: orderId, currency } = orderResponse.data;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay key
                amount: total * 100, // Amount in paise
                currency: currency,
                name: "Cup N Crave",
                description: "Order Payment",
                order_id: orderId,
                handler: async function (response) {
                    const paymentData = {
                        orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    try {
                        // Verify payment on the backend
                        const verifyResponse = await axios.post(
                            "http://localhost:3000/CupnCrave/VerifyRazorpayPayment",
                            paymentData,
                            { withCredentials: true }
                        );

                        if (verifyResponse.status === 200) {
                            toast.success("Payment successful! Order placed.");
                            localStorage.removeItem("cartItems");
                            window.dispatchEvent(new Event("cartUpdated"));
                            navigate("/orderPlaced");
                        } else {
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        toast.error("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                },
                theme: {
                    color: "#F37254",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error initializing Razorpay payment:", error);
            toast.error("An error occurred during payment initialization. Please try again.");
        }
    };

    return (
        <div className="container-payment2">
            <ToastContainer />
            <form onSubmit={handleOrderPlacement}>
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
                    value="Pay with Razorpay"
                    className="loginbtn submit_btn"
                />
            </form>
        </div>
    );
};