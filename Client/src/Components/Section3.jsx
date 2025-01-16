import React from "react";

function Section3(){
    return(
        <section id="section3">
            <div className="bg">
                <div className="cont3 ">

                    <div className="img_logo"></div>

                    <div className="socicons">
                        <a href="https://maps.google.com"><i className="fa-solid fa-map-location-dot"></i></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://www.gmail.com"><i className="fa-solid fa-envelope"></i></a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>

                    </div>


                    <div className="getintouch">
                        <h2>GET IN <span>TOUCH</span></h2>

                        <div className="first-name">
                            <label for="first-name"></label>
                            <input type="text" id="first-name" name="first-name" placeholder="&#xf007;    Name :" className="fa"/>

                        </div>

                        <div>
                            <label for="email"></label>
                            <input type="email" id="email" name="email" placeholder="&#xf0e0;    Email Address:" className="fa"/>
                        </div>
                        <div>
                            <label for="phone"></label>
                            <input type="tel" id="phone" name="phone" placeholder="&#xf095;    Phone Number:" className="fa"/>
                        </div>
                        <div>
                            <label for="issue"></label>
                            <textarea id="issue" name="issue" placeholder="Message.."></textarea>
                        </div>
                        <div className="div"><button type="submit" className="loginbtn">Send</button></div>

                    </div>

                </div>
            </div>
        </section>

    );
}

export default Section3;