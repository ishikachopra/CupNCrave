import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import EditProfile from "./editProfile";
import CircularProgressChart from "./circularProgress";

function Profile() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({}); // Store user info

    useEffect(() => {
        handleUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/CupnCrave/logout", {
                withCredentials: true, // Ensures cookies are sent
            });
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:3000/CupnCrave/profile/user-info", {
                withCredentials: true,
            });
            setInfo(response.data.user);
        } catch (error) {
            console.error("Error fetching Info:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="profile-page">
            {/* Profile Photo and Actions */}
            <div className="profile-sidebar">
                <div className="profile-img">
                    <img
                        src={
                            info.gender === "male"
                                ? "./images/male.avif" // Image for male
                                : "./images/female.avif" // Image for female
                        }
                        alt="profile-icon"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src =
                                info.gender === "male"
                                    ? "../images/male.avif" // Fallback image for male
                                    : "../images/female.avif"; // Fallback image for female
                        }}
                    />

                    <h1>{info.name}</h1>
                    <h5>{info.email}</h5>
                </div>
                <div className="profile-actions">
                    <NavLink to="/profile">
                        <i className="fas fa-star"></i> Your Points
                    </NavLink>
                    <NavLink to="user-info">  
                        <i className="fa-solid fa-circle-info"></i> User Info
                    </NavLink>
                    <NavLink to="/orders">
                        <i className="fas fa-box"></i> Your Orders
                    </NavLink>
                    <span>
                        <i className="fas fa-heart"></i> Favourites
                    </span>

                    <span onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </span>
                </div>
            </div>

            {/* Routes for different components */}
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<CircularProgressChart />} />
                {/* Route for User Info */}
                <Route path="/user-info" element={<EditProfile />} />
            </Routes>
        </div>
    );
}

export default Profile;
