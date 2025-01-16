import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import MenuList from "./Menu/menulist";
import Footer from "./footer";
import AddToCartPage from "./Menu/add-to-cart";
import AddToCartCoffeePage from "./Menu/add-to-cart-coffee";
import Cart from "./cart";
// import LoginPage from "./loginpage";
import Login from "./Login/login";
import Signup from "./Login/signup";
// import CakeMenu from "./Menu/cake";
import Checkout from "./Checkout";
import Profile from "./Profile/userProfile";
import ProfileDisplay from "./Profile/profileDisplay";
import OrderSuccess from "./orderPlaced";
import History from "./Profile/Orderhistory";
import ForgotPassword from "./Login/ForgotPassword";
import CircularProgressChart from "./Profile/circularProgress";
import SearchMenu from "./Menu/search";


function HomePage() {
    // const [selectedCake, setSelectedCake] = useState(null);
    return (
        <>
            <BrowserRouter basename="/CupnCrave">
                <Nav />
                <Routes>
                    <Route path="/" element={<Section1 />} />
                    <Route path="/about" element={<Section2 />} />
                    <Route path="/contact" element={<Section3 />} />
                    <Route path="/menu/*" element={<MenuList />} />
                    <Route path="/add-to-cart-coffee" element={<AddToCartCoffeePage />} />
                    <Route path="/add-to-cart" element={<AddToCartPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/orderPlaced" element={<OrderSuccess />} />
                    <Route path="/orders" element={<History />} />
                    <Route path="/profile/*" element={<Profile />} />
                    <Route path="/points" element={<CircularProgressChart />} />
                    <Route path="/profile-display" element={<ProfileDisplay />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/search" element={<SearchMenu />} />
                    
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default HomePage;