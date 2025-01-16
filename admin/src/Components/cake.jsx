import React, { useEffect, useState } from 'react';
import { useNavigate,NavLink } from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import "../toastStyles.css"
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const CakeAdmin = () => {
    const navigate = useNavigate();
    const [cakes, setCakes] = useState([]);
    const [newCake, setNewCake] = useState({
        name: "",
        img: "",
        price: 0,
    });

    const handleChange = (e) => {
            setNewCake({
                ...newCake,
                img: e.target.files[0],
            });
    };

    const handleOutOfStock = async (id) => {
        await markAsOutOfStock(id);
        fetchCakes(); // Refresh the cake list
    };

    const handleInStock = async (id) => {
        await markAsInStock(id);
        fetchCakes(); // Refresh the cake list
    };

    useEffect(() => {
        checkAuthentication();
        fetchCakes();
    }, []);

    const checkAuthentication = async () => {
        try {
            // Verify the authentication by calling the backend
            await axios.get("http://localhost:3000/CupnCrave/admin/cake", {
                withCredentials: true, // Include cookies with the request
            });


        } catch (error) {

            console.error("Authentication check failed:", error);
            navigate('/login');
        }
    };


    const fetchCakes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/CupnCrave/admin/cake', {
                withCredentials: true,
            });
            setCakes(response.data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
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
            await axios.delete(`http://localhost:3000/CupnCrave/admin/cake/${id}`, {
                withCredentials: true, // Include cookies with the request
            });
            // toast.success('Cake deleted successfully');
            setCakes((prevCake) => prevCake.filter((item) => item._id !== id));

        } catch (error) {
            console.error("Authentication check failed:", error);
        }
    }
    const handleCreate = async (e) => {
        e.preventDefault();
        const validateName = (name) =>
            /^[a-zA-Z\s]+$/.test(name.trim()) &&
            name.trim().length > 0 &&
            name.trim().length <= 20;

        const validatePrice = (number) => {
            return number >= 50 && number <= 5000;
        };

        const { name, img, price } = newCake;

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
            const response = await axios.post('http://localhost:3000/CupnCrave/admin/cake', newCake, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Cake added successfully');
                setNewCake({ name: '', img: '', price: 0 });
            }
        } catch (error) {
            toast.info('Failed to add cake.');
        }
    }


    const markAsInStock = async (id) => {
        try {
            console.log('button Clicked.')
            const response = await axios.patch(`http://localhost:3000/CupnCrave/admin/cake/${id}/in-stock`, {}, {
                withCredentials: true, // Include credentials if authentication is required
            });
            console.log(response.data.message); // Log success message
            toast.success('Cake marked as In Stock');
        } catch (error) {
            console.error('Error marking as in stock:', error);
            toast.info('Failed to mark as In Stock');
        }
    };

    const markAsOutOfStock = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/CupnCrave/admin/cake/${id}/out-of-stock`, {}, {
                withCredentials: true, // Include credentials if authentication is required
            });
            console.log(response.data.message); // Log success message
            toast.success('Cake marked as Out of Stock');
        } catch (error) {
            console.error('Error marking as out of stock:', error);
            toast.info('Failed to mark as Out of Stock');
        }
    };

    return (
        <div>
            < NavLink to='/' className="back"><i class="fa-solid fa-arrow-left"></i> BACK</NavLink>
            <h1 className="cursive"><span>~</span> Cake Menu <span>~</span></h1>
            <ToastContainer />
            <section className="coffee adminmenu" >
                {cakes.map((cake, index) => (
                    <div className="CoffeeItems" key={index}>
                        <div className="editing">
                            <span className='edit-buttons' >
                                {/* <i class="fa-solid fa-pen-to-square"></i> */}
                            </span>
                            <span className='edit-buttons' onClick={() => confirmDelete(cake._id)}><i class="fa-solid fa-x"></i></span>
                        </div>
                        <div className="pic">
                            <img
                                src={cake.img}
                                alt={cake.name}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = cake.img; // Fallback to the relative path
                                }}
                            />
                        </div>
                        <h3>{cake.name}</h3>
                        <div className="price">
                            <h2> Rs. {cake.price}</h2>
                            <h4 className={cake.inStock ? "in-stock" : "out-of-stock"}>Status: {cake.inStock ? 'In Stock' : 'Out of Stock'}</h4>
                        </div>
                     
                        {cake.inStock ? (
                            <button className="add-to-cart"  onClick={() => handleOutOfStock(cake._id)}>Mark as Out of Stock</button>
                        ) : (
                                <button className="add-to-cart"  onClick={() => handleInStock(cake._id)}>Mark as In Stock</button>
                        )}
                    </div>
                ))}

            </section>
            <form className="cookie-form" onSubmit={handleCreate}>
                <h3>Add new cake</h3>
                <div className="form-group">
                    <label htmlFor="name">Cake Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCake.name}
                        onChange={handleChange}
                        placeholder="Enter cake name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (Rs):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newCake.price}
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

                <button type="submit" className="loginbtn">Add Cake</button>
            </form>
        </div>
    );
};

export default CakeAdmin;
