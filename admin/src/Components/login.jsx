import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

function LoginAdmin() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
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
            setMessage("Both fields are required for login.");
            return;
        }



        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/admin/login', formData, {
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

    return (
        <div className="login-page">

            <div className="lrow">
                <img src="./images/loginimg.png" alt='' />
                <div className="login-container admin-login-container">
                    <h2>Admin Login</h2>
                    {message && <p>{message}</p>}
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="loginbtn">Login</button>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default LoginAdmin;
