import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
import Progress from './Tracking/progress';

const Orders = () => {
     const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    const [status, setStatus] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        checkAuthentication();
        fetchHistory();
    }, []);

    const checkAuthentication = async () => {
        try {
            // Verify the authentication by calling the backend
            await axios.get("http://localhost:3000/CupnCrave/admin/orders/allOrders", {
                withCredentials: true, // Include cookies with the request
            });
        } catch (error) {
            console.error("Authentication check failed:", error);
            navigate('/login');
        }
    };

    // Fetch current status for a specific order
    const fetchStatus = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:3000/CupnCrave/admin/orders/status/${orderId}`, {
                withCredentials: true,
            });
            setStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3000/CupnCrave/admin/orders/allOrders", {
                withCredentials: true,
            });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleTrackOrder = (orderId) => {
        fetchStatus(orderId);
        setSelectedOrderId(orderId);
        setShowProgress(true);
    };

    const closeProgressModal = () => {
        setShowProgress(false);
    };

    const incrementOrderStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/CupnCrave/admin/orders/status/${selectedOrderId}`, {}, {
                withCredentials: true, // Correct placement for the credentials option
            });
            setStatus(response.data.order.status); // Update the local state
        } catch (error) {
            console.error('Error incrementing status:', error);
        }
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
                                        <li><span>Item : </span>{item.name} ({item.size})</li>
                                        <li><span>Price : </span>Rs.{item.price}</li>
                                        <li><span>Quantity : </span>{item.quantity}</li>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p><span>Total: </span> Rs.{order.total}</p>
                        <p><span>Ordered On:</span> {new Date(order.createdAt).toLocaleString()}</p>
                        <button className="add-to-cart" onClick={() => handleTrackOrder(order._id)}>
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
                        <button className="add-to-cart" onClick={closeProgressModal}>
                            Close
                        </button>
                        <button className="add-to-cart" onClick={incrementOrderStatus}>
                            Update Status
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
