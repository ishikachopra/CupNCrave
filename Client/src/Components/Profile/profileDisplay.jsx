import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileDisplay() {
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Verify the authentication by calling the backend
                const response = await axios.get("http://localhost:3000/CupnCrave/profile-display", {
                    withCredentials: true, // Include cookies with the request
                });

                if (response.status === 200) {
                    navigate("/profile"); // Navigate to the profile page if authenticated
                } else {
                    navigate("/login"); // Navigate to the login page if not authenticated
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                navigate("/login"); // Navigate to the login page if an error occurs
            } finally {
                setIsLoading(false); // Stop the loading state
            }
        };

        checkAuthentication();
    }, [navigate]);

    if (isLoading) {
        return <p>Loading...</p>; // Show a loading state while checking authentication
    }

    return null; // Return nothing as navigation has already occurred
}

export default ProfileDisplay;
