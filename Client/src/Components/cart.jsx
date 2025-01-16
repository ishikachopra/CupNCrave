import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
    }, []);

    const updateCartItemsInLocalStorage = (items) => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        window.dispatchEvent(new Event("cartUpdated"));
        setCartItems(items);
    };

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const decreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            updateCartItemsInLocalStorage(updatedCartItems);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemAmount = item.price ? parseInt(item.price) : 0;
            const itemQuantity = item.quantity ? item.quantity : 1;
            return total + itemAmount * itemQuantity;
        }, 0);
    };

    const calculateTax = (total) => {
        const taxRate = 0.15;
        return total * taxRate;
    };

    const totalAmount = calculateTotal();
    const tax = calculateTax(totalAmount);
    const grandTotal = totalAmount + tax;

    return (
        <main>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <div className="cart-items empty-cart">
                    <img src={process.env.PUBLIC_URL + '/images/cart-empty.jpg'} alt='Your cart is empty..' />
                    <NavLink to="/menu"> Start Shopping</NavLink>
                </div>
            ) : (
                <div className="cart-container">
                    
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.img} alt={item.name} />
                                <div className="product-infocart">
                                    <p>{item.name}</p>
                                    <p className="product-color">{item.size}</p>
                                </div>
                                <div className="pricecart">Rs.{item.price}</div>
                                <div className="quantitycart">
                                    <button onClick={() => decreaseQuantity(index)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(index)}>+</button>
                                </div>
                                <div className="totalcart">Rs.{parseInt(item.price) * item.quantity}</div>
                                <button className="remove-btn" onClick={() => removeFromCart(index)}>&times;</button>
                            </div>
                        ))}
                    </div>
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-details">
                            <div className="summary-item">
                                <span>Subtotal</span>
                                <span>Rs.{totalAmount}</span>
                            </div>
                            <div className="summary-item">
                                <span>Tax</span>
                                <span>Rs.{tax}</span>
                            </div>
                            <div className="summary-item">
                                <span>Delivery</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-item">
                                <span><a href="www.google.com">Add coupon code</a></span>
                            </div>
                            <div className="summary-item total">
                                <span>Total</span>
                                <span>Rs.{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                            <NavLink to="/Checkout" className="loginbtn checkout-btn"
                               >Checkout</NavLink>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;








