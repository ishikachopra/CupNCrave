import React, { useEffect, useState } from 'react';
import { useNavigate,NavLink } from "react-router-dom";
import axios from 'axios';
import './admin.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import "../toastStyles.css"
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';


function CookieAdmin() {
    const navigate = useNavigate();
    const [cookies, setCookies] = useState([]);
    const [newCookie, setNewCookie] = useState({
        name: "",
        price: "",
        img: "",
    });

    const handleChange = (e) => {
        if (e.target.name === 'img') {
            setNewCookie({
                ...newCookie,
                img: e.target.files[0], // Save the selected file as the value for 'img'
            });
        } else {
            setNewCookie({
                ...newCookie,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleOutOfStock = async (id) => {
        await markAsOutOfStock(id);
        fetchCookies(); // Refresh the cake list
    };

    const handleInStock = async (id) => {
        await markAsInStock(id);
        fetchCookies(); // Refresh the cake list
    };


    useEffect(() => {
        checkAuthentication();
        fetchCookies();
    }, []);

    const checkAuthentication = async () => {
        try {
            // Verify the authentication by calling the backend
            await axios.get("http://localhost:3000/CupnCrave/admin/cookie", {
                withCredentials: true, // Include cookies with the request
            });


        } catch (error) {

            console.error("Authentication check failed:", error);
            navigate('/login');
        }
    };

    const fetchCookies = async () => {
        try {
            const response = await axios.get('http://localhost:3000/CupnCrave/admin/cookie', {
                withCredentials: true,
            });
            setCookies(response.data);
        } catch (error) {
            console.error('Error fetching cookies:', error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this cookie?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const handleDelete = async (id) => {
        try {
            // Verify the authentication by calling the backend
            console.log(id);
            await axios.delete(`http://localhost:3000/CupnCrave/admin/cookie/${id}`, {
                withCredentials: true,

            });
            //  Update the state to remove the deleted item from the list
            setCookies((prevCookie) => prevCookie.filter((item) => item._id !== id));

        } catch (error) {
            console.error("Authentication check failed:", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const validateName = (name) =>
            /^[a-zA-Z\s]+$/.test(name.trim()) &&
            name.trim().length > 0 &&
            name.trim().length <= 20;

        const validatePrice = (number) => {
            return number >= 50 && number <= 5000;
        };

        const { name, img, price } = newCookie;

        if (!name || !img || !price) {
            toast.info('All fields are required');
            return;
        }

        if (!validateName(name)) {
            toast.info('Name cannot be more than 20 chars');
            return;
        }
        if (!validatePrice(price)) {
            toast.info('Price needs to be between Rs.50 and Rs.5000');
            return;
        }
        
                       

        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/admin/cookie', newCookie, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Cookie added successfully');
            setNewCookie({ name: '', img: '', price: 0 });
            
        } catch (error) {
            toast.info('Failed to add cookie.');
        }
    }

    const markAsInStock = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/CupnCrave/admin/cookie/${id}/in-stock`, {}, {
                withCredentials: true, // Include credentials if authentication is required
            });
            console.log(response.data.message); // Log success message
            toast.success('Cookie marked as In Stock');
        } catch (error) {
            console.error('Error marking as in stock:', error);
            toast.info('Failed to mark as In Stock');
        }
    };

    const markAsOutOfStock = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/CupnCrave/admin/cookie/${id}/out-of-stock`, {}, {
                withCredentials: true, // Include credentials if authentication is required
            });
            console.log(response.data.message); // Log success message
          toast.success('Cookie marked as Out of Stock');
        } catch (error) {
            console.error('Error marking as out of stock:', error);
           toast.info('Failed to mark as Out of Stock');
        }
    };

    return (
        <>
            < NavLink to='/' className="back"><i class="fa-solid fa-arrow-left"></i> BACK</NavLink>
            <h1 className="cursive"><span className="cursive">~ </span>Cookie Menu <span className="cursive">~</span></h1>
            <ToastContainer />
            <section className="coffee adminmenu" >
                {cookies.map((cookie, index) => (
                    <div className="CoffeeItems" key={index}>
                        <div className="editing">
                            <span className='edit-buttons'>
                                {/* <i class="fa-solid fa-pen-to-square"></i> */}
                            </span>
                            <span className='edit-buttons' onClick={() => confirmDelete(cookie._id)}>
                                <i class="fa-solid fa-x"></i>
                            </span>

                        </div>
                        <div className="pic">
                            <img
                                src={cookie.img.startsWith('http') ? cookie.img : `http://localhost:3000${cookie.img}`}
                                alt={cookie.name}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = cookie.img; // Fallback to the relative path
                                }}
                            />
                        </div>

                        <div className="price">
                            <h3>{cookie.name}</h3>
                            <h2>Rs. {cookie.price.toFixed(2)}</h2>
                            <h4 className={cookie.inStock ? "in-stock" : "out-of-stock"}>Status: {cookie.inStock ? 'In Stock' : 'Out of Stock'}</h4>
                        </div>
                        {cookie.inStock ? (
                            <button className="add-to-cart" onClick={() => handleOutOfStock(cookie._id)}>Mark as Out of Stock</button>
                        ) : (
                            <button className="add-to-cart" onClick={() => handleInStock(cookie._id)}>Mark as In Stock</button>
                        )}
                    </div>
                ))}


            </section>
            <form className="cookie-form" onSubmit={handleCreate}>
                <h3>Add new cookie</h3>
                <div className="form-group">
                    <label htmlFor="name">Cookie Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCookie.name}
                        onChange={handleChange}
                        placeholder="Enter cookie name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (Rs):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newCookie.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Image:</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        // accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="loginbtn">Add Cookie</button>
            </form>
        </>
    );
}

export default CookieAdmin;
