import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import PaymentGateway from "./Payment/payment";
import axios from "axios";

function Checkout() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` while checking

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            // Verify the authentication by calling the backend
            const response = await axios.get("http://localhost:3000/CupnCrave/Checkout", {
                withCredentials: true, // Include cookies with the request
            });
           
            if (response.status === 200) {
                setIsAuthenticated(true); // User is authenticated
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
        } catch (error) {
            setIsAuthenticated(false); // Handle error and consider as unauthenticated
            console.error("Authentication check failed:", error);
        }
    };

    

    if (isAuthenticated === null) {
        return <p>Loading...</p>; // Show a loading state while checking authentication
    }

    return (
        <section>
            {isAuthenticated ? (
                <div className="Checkoutpg">
                    {/* <h1>Review Your Order</h1> */}
                    <PaymentGateway/>
                   
                </div>
            ) : (
                    <div className="Checkoutpg">
                    <img src="./images/goLogin.png" alt="Successful"></img>
                    <h1>Login </h1>
                    <p>You need to log in to proceed.</p>
                    <NavLink to="/login" className="add-to-cart">Go to Login</NavLink>
                </div>
            )}
        </section>
    );
}

export default Checkout;
