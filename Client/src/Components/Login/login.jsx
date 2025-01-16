import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const [emailForReset, setEmailForReset] = useState(""); // For password reset
    const [isResetRequested, setIsResetRequested] = useState(false); // To toggle between login and reset views
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { password, email } = formData;

        if (!password || !email) {
            setMessage("All fields are required for login.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/login', formData, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setMessage("Login successful!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server error. Please try again later.");
            }
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!emailForReset) {
            setMessage("Please enter your email.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/forgot-password', { email: emailForReset });
            setMessage(response.data.message);
            setIsResetRequested(true); // Show message that the reset link has been sent
            navigate('/forgot-password',{state:{emailForReset}});
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="lcontainer">
                <div className="lrow">
                    <img src="./images/loginimg.png" alt='' />
                    <div className="login-container">
                        

                        {!isResetRequested ? (
                            <form onSubmit={handleLogin}>
                                <h2>Login</h2>
                                {message && <p>{message}</p>}
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password || ""}
                                    onChange={handleChange}
                                />
                                <NavLink
                                    to="#"
                                    onClick={() => setIsResetRequested(true)}
                                    style={{ marginRight: "auto", textAlign: "left", color: "rgb(85, 26, 139)" }}
                                >
                                    Forgot Password?
                                </NavLink>
                                <button type="submit" className="loginbtn">Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleForgotPassword}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={emailForReset}
                                    onChange={(e) => setEmailForReset(e.target.value)}
                                />
                                <button type="submit" className="loginbtn">Send Reset Link</button>
                            </form>
                        )}

                        <p>Don't have an account? <NavLink to="/signup">Sign up here</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
