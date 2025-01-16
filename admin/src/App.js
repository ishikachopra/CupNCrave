import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CookieAdmin from "./Components/cookie";
import CakeAdmin from './Components/cake';
import AdminHome from "./Components/home";
import LoginAdmin from "./Components/login";
import CoffeeAdmin from './Components/coffee';
import Orders from './Components/orders';

function App() {
  return (
    <>
      <BrowserRouter basename="/CupnCrave/admin">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/cake" element={<CakeAdmin />} />
          <Route path="/cookie" element={<CookieAdmin />} />
          <Route path="/coffee" element={<CoffeeAdmin />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/orders/allOrders" element={<Orders />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
