// ResetPassword.jsx (React component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Optionally, check if the token is valid when the page loads
        // You could also show a loading spinner here while the token is being validated
        axios
            .get(`http://localhost:3000/CupnCrave/reset-password/${token}`)
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setMessage('Invalid or expired reset token.');
            });
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/CupnCrave/reset-password/${token}`,
                { password: newPassword }
            );
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/login'); // Redirect to login after password reset
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error resetting password.');
        }
    };

    return (
        <div className="reset-password-page">
            <h2>Reset Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
