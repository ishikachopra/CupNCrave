import React from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Coffee from "./coffee";
import CakeMenu from "./cake";
import Cookie from "./cookie";

function MenuList() {
    return (
        <>
            <div className="menu-list">              
                <NavLink to="coffee" >Coffee</NavLink>
                <NavLink to="cake" >Cakes</NavLink>
                <NavLink to="cookie" >Cookies</NavLink>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="coffee" />} />
                    <Route path="/coffee" element={<Coffee />} />
                    <Route path="/cake" element={<CakeMenu />} />
                    <Route path="/cookie" element={<Cookie />} />
                </Routes>
            </div>
        </>
    );
}

export default MenuList;
