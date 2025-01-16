import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerReviews from './reviews';
import 'react-toastify/dist/ReactToastify.css';
import "../toastStyles.css"
import { toast, ToastContainer } from 'react-toastify';

const AddToCartCoffeePage = () => {
    const location = useLocation();
    const item = location.state?.item;

    const [selectedSize, setSelectedSize] = useState("Small");
    const [displayedPrice, setDisplayedPrice] = useState(item ? item.price : "");

    if (!item) {
        return <div>Item not found. Please go back to the menu and select an item.</div>;
    }

    const getImagePath = (path) => {
        // Ensure path is consistent
        if (path.startsWith('../')) {
            return path.replace('../', './');
        }
        return path;
    };

    const handleSizeChange = (event) => {
        const size = event.target.value;
        setSelectedSize(size);
        switch (size) {
            case "Small":
                setDisplayedPrice(item.price);
                break;
            case "Large":
                setDisplayedPrice(parseInt(item.price) + 50);
                break;
            case "Venti":
                setDisplayedPrice(parseInt(item.price) + 100);
                break;
            default:
                setDisplayedPrice(item.price);
                break;
        }
    };
    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name && cartItem.size === selectedSize);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({
                img: getImagePath(item.img),
                name: item.name,
                price: displayedPrice,
                size: selectedSize,
                quantity: 1
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success('Item added to cart!');
    };

    return (
        <>
            <div className="product-page">
                <div className="product-container">
                    <div className="product-images">
                        <img className="main-image" src={getImagePath(item.img)} alt={item.name} />
                    </div>
                    <div className="product-details">
                        <div className="breadcrumbs">
                            Home / Menu / {item.name}
                        </div>
                        <h1>{item.name}</h1>
                        <p className="pricedetail">Rs.{displayedPrice} | {selectedSize}</p>
                        <p className="description">
                            Indulge in the rich flavors of our {item.name}. {item.description}. Now available at a special discounted price!
                        </p>
                        <div className="quantity-container">
                            <label htmlFor="size">Size</label>
                            <select id="size" value={selectedSize} onChange={handleSizeChange}>
                                <option value="Small">Small</option>
                                <option value="Large">Large</option>
                                <option value="Venti">Venti</option>
                            </select>
                        </div>
                        <div className="add-to-cart cart-add" onClick={handleAddToCart}>Add To Cart</div>
                        <ToastContainer />

                    </div>
                </div>

                <CustomerReviews productId={item._id} />
            </div>
        </>
    );
};

export default AddToCartCoffeePage;


