import React, { useState, useEffect } from 'react';
import { useLocation, NavLink ,useNavigate} from 'react-router-dom';
import axios from 'axios';

function SearchMenu() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract query parameter
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/CupnCrave/search`, {
                    params: { q: searchTerm }
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchTerm) {
            fetchItems();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);


    return (
        <>
            <h1 className="cursive"><span className="cursive">~ </span> Menu <span className="cursive">~</span></h1>
            <section className="coffee" id="coffee">
                {searchResults.map((item, index) => (
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
                            to={item.category === "Coffee" ? "/add-to-cart-coffee" : "/add-to-cart"}
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

export default SearchMenu;
