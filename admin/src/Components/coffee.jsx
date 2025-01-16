import React, { useEffect, useState } from 'react';
import { useNavigate ,NavLink} from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import "../toastStyles.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

function CoffeeAdmin() {
    const navigate = useNavigate();
    const [coffee, setCoffee] = useState([]);
    const [newCoffee, setNewCoffee] = useState({
        name: "",
        img: "",
        price: 0,
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "img" && files && files[0]) {
            setNewCoffee({
                ...newCoffee,
                img: files[0], // Save the selected file as the value for 'img'
            });
        } else {
            setNewCoffee({
                ...newCoffee,
                [name]: value, // Update the respective field (name, price, etc.)
            });
        }
    };

    useEffect(() => {
        checkAuthentication();
        fetchCoffee();
    }, []); // Ensures the effect runs only once after the component mounts.

    const handleOutOfStock = async (id) => {
        await markAsOutOfStock(id);
        fetchCoffee();
    };

    const handleInStock = async (id) => {
        await markAsInStock(id);
        fetchCoffee();
    };

    const handleCreateCoffee = async () => {
        await handleCreate();
        fetchCoffee();
    };

    const checkAuthentication = async () => {
        try {
            // Verify the authentication by calling the backend
            await axios.get("http://localhost:3000/CupnCrave/admin/coffee", {
                withCredentials: true, // Include cookies with the request
            });
        } catch (error) {
            console.error("Authentication check failed:", error);
            navigate('/login');
        }
    };

    const fetchCoffee = async () => {
        try {
            const response = await axios.get('http://localhost:3000/CupnCrave/admin/coffee', {
                withCredentials: true, // Include cookies with the request
            });
            setCoffee(response.data);
        } catch (error) {
            console.error('Error fetching coffee:', error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this coffee?',
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
            await axios.delete(`http://localhost:3000/CupnCrave/admin/coffee/${id}`, {
                withCredentials: true,
            });
            setCoffee((prevCoffee) => prevCoffee.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Error deleting coffee:", error);
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

                const validateDescription=(des)=>{
                    return des.length>5 && des.length<50;
                }

                const { name, img, description, price } = newCoffee;

                if (!name || !img || !description || !price) {
                    toast.info('All fields are required');
                    return;
                }
                if(!validateName(name)){
                    toast.info('Name cannot be more than 20 chars');
                    return;
                }
                if(!validatePrice(price)){
                    toast.info('Price needs to be between Rs.50 and Rs.5000');
                    return;
                }

                if(!validateDescription(description)){
                    toast.info('Description should more than 5 chars and less than 50');
                    return;
                }


        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/admin/coffee', newCoffee, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Coffee added successfully');
                setNewCoffee({ name: '', img: '', price: 0, description: '' });
            }
        } catch (error) {
            toast.error('Failed to add coffee.');
        }
    };

    const markAsInStock = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/CupnCrave/admin/coffee/${id}/in-stock`, {}, {
                withCredentials: true,
            });
            toast.success('Coffee marked as In Stock');
        } catch (error) {
            console.error('Error marking as in stock:', error);
            toast.error('Failed to mark as In Stock');
        }
    };

    const markAsOutOfStock = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/CupnCrave/admin/coffee/${id}/out-of-stock`, {}, {
                withCredentials: true,
            });
            toast.success('Coffee marked as Out of Stock');
        } catch (error) {
            console.error('Error marking as out of stock:', error);
            toast.error('Failed to mark as Out of Stock');
        }
    };

    return (
        <>
            < NavLink to='/' className="back"><i class="fa-solid fa-arrow-left"></i> BACK</NavLink>
            <h1 className="cursive"><span className="cursive">~ </span>Coffee Menu <span className="cursive">~</span></h1>
            <ToastContainer />
            <section className="coffee adminmenu">
                {coffee.map((item) => (
                    <div className="CoffeeItems" key={item._id}>
                        <div className="editing">
                            <span className='edit-buttons' onClick={() => confirmDelete(item._id)}>
                                <i className="fa-solid fa-x"></i>
                            </span>
                        </div>
                        <div className="pic">
                            <img
                                src={item.img}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="price">
                            <h2>Rs.{item.price}</h2>
                            <h4 className={item.inStock ? "in-stock" : "out-of-stock"}>Status: {item.inStock ? 'In Stock' : 'Out of Stock'}</h4>
                        </div>
                        {item.inStock ? (
                            <button className="add-to-cart" onClick={() => handleOutOfStock(item._id)}>Mark as Out of Stock</button>
                        ) : (
                            <button className="add-to-cart" onClick={() => handleInStock(item._id)}>Mark as In Stock</button>
                        )}
                    </div>
                ))}
            </section>
            <form className="cookie-form" onSubmit={handleCreate}>
                <h3>Add new coffee</h3>
                <div className="form-group">
                    <label htmlFor="name">Coffee Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCoffee.name}
                        onChange={handleChange}
                        placeholder="Enter coffee name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (Rs):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newCoffee.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={newCoffee.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="img">Image:</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="loginbtn">Add Coffee</button>
            </form>
        </>
    );
}

export default CoffeeAdmin;

