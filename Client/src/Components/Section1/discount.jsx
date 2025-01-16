import React from "react";
import { NavLink } from "react-router-dom";

function Discount(){
    return (
        <>
            <div className="discount" >
                <div className="imgbg">
                    <div className="distext">
                        <div className="disicon"><img src="/CupnCrave/images/cup.png" alt="" /> </div>
                        <div className="dish3">Enjoy 20% off on all drinks</div>
                        <h1 className="dish1">Every Thrusday , 4pm-7pm</h1>
                        <NavLink to="/Menu" className="order-now">
                            <span className="span1"></span><span className="span2">Order now</span>
                        </NavLink>

                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Discount;