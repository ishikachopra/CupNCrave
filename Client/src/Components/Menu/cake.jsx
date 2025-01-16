import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CakeMenu = () => {
    const [cakes, setCakes] = useState([]);   //initially its an empty array

    useEffect(() => {
        fetchCakes();
    }, []);

    const fetchCakes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/CupnCrave/Menu/cake');
            setCakes(response.data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
        }
    };

    return (
        <div>
            <h1 className="cursive"><span>~</span> Cake Menu <span>~</span></h1>
            <section className="Cakes" id="Cakes">
                <div className="cakemenu">
                    {cakes.map((cake, index) => (
                        <div className="half-capsule" key={index}>
                            <div className="cake-img">
                                <img src={cake.img} alt={cake.name} />
                            </div>
                            <div className="price">
                                <h3>{cake.name}</h3>
                                <h2> Rs. {cake.price}</h2>
                            </div>
                            <NavLink
                                to="/add-to-cart"
                                state={{ cake }}
                                className="add-to-cart"
                            >
                                Add Item
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CakeMenu;
