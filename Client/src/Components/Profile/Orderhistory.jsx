import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Progress from '../Tracking/progress';

const History = () => {
    const [history, setHistory] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        fetchHistory();
    }, []);

    // Fetch current status for a specific order
    const fetchStatus = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:3000/CupnCrave/orders/status/${orderId}`, {
                withCredentials: true, // Include cookies if needed
            });
            setStatus(response.data.status);
        } catch (error) {
            console.error("Error fetching status:", error);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3000/CupnCrave/orders", {
                withCredentials: true, // Include cookies with the request
            });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleTrackOrder = (orderId) => {
        fetchStatus(orderId); // Fetch the status for the selected order
        setShowProgress(true); // Show the Progress modal
    };

    const closeProgressModal = () => {
        setShowProgress(false); // Close the Progress modal
    };

    return (
        <div className="orderHis">
            <h1>Your Orders</h1>

            {history.length > 0 ? (
                history.map((order) => (
                    <div className="orders" key={order._id}>
                        <div className="order">
                            {order.items.map((item, index) => (
                                <div className="orderInfo" key={index}>
                                    <img src={item.img} alt="orderImg" />
                                    <p className="orderName">
                                        <li><span>Item : </span>{item.name} ({item.size}) </li>
                                        <li><span>Price : </span>Rs.{item.price}</li>
                                        <li><span>Quantity : </span>{item.quantity}</li>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p><span>Total: </span> Rs.{order.total}</p>
                        <p><span>Ordered On:</span> {new Date(order.createdAt).toLocaleString()}</p>
                        <button
                            className="add-to-cart"
                            onClick={() => handleTrackOrder(order._id)}
                        >
                            Track Order
                        </button>
                    </div>
                ))
            ) : (
                <div className="noOrders">
                    <p className="empty-Order">
                        <img src="./images/noOrders.jpg" alt="No Orders" />
                        <NavLink to="/menu"> Start Shopping</NavLink>
                    </p>
                </div>
            )}
            {showProgress && (
                <div className="progressOverlay" onClick={closeProgressModal}>
                    <div className="progressModalContent" onClick={(e) => e.stopPropagation()}>
                        <Progress status={status} />
                        <button className="add-to-cart" onClick={closeProgressModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
