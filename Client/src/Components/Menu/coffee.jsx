import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Coffee() {
    const [coffee, setCoffee] = useState([]);

    useEffect(() => {
        fetchCoffee();
    }, []);

    const fetchCoffee = async () => {
        try {
            const response = await axios.get('http://localhost:3000/CupnCrave/Menu/coffee');
            setCoffee(response.data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
        }
    };
    return (
        <>
            <h1 className="cursive"><span className="cursive" >~ </span>Coffee Menu <span className="cursive">~</span></h1>
            <section className="coffee" id="coffee">
                {coffee.map((item, index) => (
                    <div className="CoffeeItems" key={index}>
                        <div className="pic">
                            <img src={item.img} alt={item.name} />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="price">
                            <h2>Rs.{item.price}</h2>
                        </div>
                        <NavLink
                            to="/add-to-cart-coffee"
                            state={{ item }}
                            className="add-to-cart"
                        >
                            Add Item
                        </NavLink>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Coffee;
