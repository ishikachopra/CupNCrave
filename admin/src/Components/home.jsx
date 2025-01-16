import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminHome = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     checkAuthentication();
    // }, []);

    // const checkAuthentication = async () => {
    //     try {
    //         // Verify the authentication by calling the backend
    //        await axios.get("http://localhost:8000/CupnCrave/admin", {
    //             withCredentials: true, // Include cookies with the request
    //         });


    //     } catch (error) {

    //         console.error("Authentication check failed:", error);
    //         navigate('/login');
    //     }
    // };


    const cardData = [
        { title: "Cookies", description: "Manage cookies inventory", path: "/cookie" },
        { title: "Coffee", description: "Manage coffee menu", path: "/coffee" },
        { title: "Cakes", description: "Manage cakes menu", path: "/cake" },
        { title: "Orders", description: "View and manage user Orders", path: "/orders/allOrders" },
    ];

    return (
        <div className="admin-home">
            <h1>Admin Dashboard</h1>
            <div className="card-container">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="admin-card"
                        onClick={() => navigate(card.path)}
                    >
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
