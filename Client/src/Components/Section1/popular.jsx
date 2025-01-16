import React from "react";

function Popular() {
    const menuItems = [
        {
            image: `${process.env.PUBLIC_URL}/images/menu-1.png`,
            title: "Cappuccino",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, sed.",
            price: "Rs.230",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/menu-2.png`,
            title: "Chocolate Fudge",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
            price: "Rs.250",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/menu-3.png`,
            title: "Irish",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, sed.",
            price: "Rs.270",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/menu-4.png`,
            title: "Arabica",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
            price: "Rs.270",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/menu-5.png`,
            title: "Chat Tea",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, sed.",
            price: "Rs.100",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/menu-6.png`,
            title: "Macchiato",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, fugit.",
            price: "Rs.260",
        },
    ];

    return (
        <div className="spmenu" id="spmenu">
            <div className="imgbgsp">
                <h1 className="sphead" data-aos="zoom-in">our menu <span>popular menu</span></h1>

                <div className="popularmenu" data-aos="slide-up">
                    {menuItems.map((item, index) => (
                        <div className="spbox" key={index}>
                            <img src={item.image} alt={item.title} />
                            <div className="offers">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <span>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Popular;
