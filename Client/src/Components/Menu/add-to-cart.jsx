import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerReviews from './reviews';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../toastStyles.css"

const AddToCartPage = () => {
    const location = useLocation();
    const product = location.state?.cake || location.state?.cookie || location.state?.item;// Handle both cakes and cookies
    const [selectedQuantity, setSelectedQuantity] = useState("0.5");
    const [displayedPrice, setDisplayedPrice] = useState(product ? product.price : 0);

    // If product is undefined, return a message or redirect to another page
    if (!product) {
        return <div>Product not found. Please go back to the menu and select a product.</div>;
    }
    

    const handleQuantityChange = (event) => {
        const quantity = event.target.value;
        setSelectedQuantity(quantity);

        switch (quantity) {
            case "0.5":
                setDisplayedPrice(product.price * 1);
                break;
            case "1":
                setDisplayedPrice(product.price * 2);
                break;
            case "2":
                setDisplayedPrice(product.price * 4);
                break;
            default:
                setDisplayedPrice(product.price);
        }
    };
    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === product.name && cartItem.size === selectedQuantity);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({
                img: product.img,
                name: product.name,
                price: displayedPrice,
                size: selectedQuantity,
                quantity: 1
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("cartUpdated"));

        // Display a toast notification
        toast.success("Item added to cart");
    };

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-images">
                    <img className="main-image" src={product.img} alt={product.name} />
                </div>
                <div className="product-details">
                    <div className="breadcrumbs">
                        Home / Menu / {product.name}
                    </div>
                    <h1>{product.name}</h1>
                    <p className="pricedetail">Rs. {displayedPrice} | {selectedQuantity} kg</p>
                    <p className="description">
                        Indulge in the rich flavors of our classic {product.name}, now available at a special discounted price. Perfect for birthdays, anniversaries, or simply as a delightful dessert, our {product.name} promises to make every celebration memorable. Don't miss out on this limited-time offer and savor the taste of luxury with every bite!
                    </p>
                    <div className="quantity-container">
                        <label htmlFor="quantity">Quantity</label>
                        <select value={selectedQuantity} onChange={handleQuantityChange}>
                            <option value="0.5">0.5 kg</option>
                            <option value="1">1 kg</option>
                            <option value="2">2 kg</option>
                        </select>
                    </div>
                    <div className="add-to-cart cart-add" onClick={handleAddToCart}>Add To Cart</div>
                    <ToastContainer />

                </div>
            </div>
            <CustomerReviews productId={product._id} />
        </div>
    );
};

export default AddToCartPage;
