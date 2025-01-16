import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "../toastStyles.css"
import { toast, ToastContainer } from 'react-toastify';

const CustomerReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        user: '',
        email: '',
        message: '',
    });

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/CupnCrave/reviews/${productId}`);
            setReviews(response.data);
        } catch (err) {
            setError('Failed to fetch reviews. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!productId) return;
        fetchReviews();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the name length
        if (formData.user.length > 20) {
            toast.error("Name should not exceed 30 characters.");
            return; // Prevent form submission if validation fails
        }
        if (formData.message.length > 250) {
            toast.error("Message should not exceed 250 characters.");
            return; // Prevent form submission if validation fails
        }
        try {
            await axios.post('http://localhost:3000/CupnCrave/reviews', {
                ...formData,
                productId,
            });
            toast.success('Review added successfully!');
            setShowPopup(false); // Close popup after submission
            // fetchReviews();
        } catch (err) {
            console.log(err);
            toast.info('Failed to submit review.');
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="reviews-container">
            <div className="reviews-header">
                <h1 className="customer-reviews">Customer Reviews</h1>
                <button className="add-review-btn" onClick={() => setShowPopup(true)}>
                    Add Review
                </button>
                
            </div>
            <ToastContainer />
            <div className="cards-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <div className="review-grid-container">
                                <div className="review-icon">{review.user[0]?.toUpperCase()}</div>
                                <h4>{review.user}</h4>
                                <span>{review.email}</span>
                            </div>
                            <p>{review.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to leave a review!</p>
                )}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Add Review</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="user">Name:</label>
                            <input
                                type="text"
                                id="user"
                                name="user"
                                value={formData.user}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="reviewButtons">
                                <button type="submit" className='add-review-btn'>Submit</button>
                                <button className='add-review-btn' type="button" onClick={() => setShowPopup(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerReviews;
