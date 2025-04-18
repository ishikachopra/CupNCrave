import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import 'react-toastify/dist/ReactToastify.css';
import "../toastStyles.css"
import { toast, ToastContainer } from 'react-toastify';
import './forgotpassword.css'; 

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.emailForReset;

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword || !otp || !email) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm password must be the same.");
      return;
    }
    try {
      const response = await axios.post(
        "/verify",
        {
          email,
          newPassword,
          confirmPassword,
          getotp: otp,
        }
      );

      if (response.data.nextPage) {
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err.response.data.msg || "An error occurred. Please try again."
      );
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      const input = e.target.value;
      const otpRegex = /^[0-9]{6}$/;

      if (otpRegex.test(input)) {
        console.log("Valid OTP:", input);
        toast.success("Valid OTP!");
      } else {
        console.log("Invalid OTP");
        toast.success("Invalid OTP!");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer/>
      <div className="forgot-password-form">
        <div className="left-section">
          <img src={"./images/login_img.jpg"} alt="Form Illustration" />
        </div>
        <div className="right-section">
          <div className="form-header">
            <h1>Hello, Again</h1>
            <p>We are happy to have you back.</p>
          </div>
          <div className="form-body">
            <input
              type="text"
              className="input-field"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              onKeyUp={handleInputEnter}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <button className="submit-button" onClick={handlePasswordReset}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
