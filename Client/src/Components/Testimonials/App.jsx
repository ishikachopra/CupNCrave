import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "./data";
import PreviousBtn from "./PreviousBtn";
import NextBtn from "./NextBtn";
import Card from "./Card";

function cards(data) {
  return (
    <Card
      key={data.id}
      img={data.avatar}
      name={data.name}
      message={data.message}
      designation={data.designation}
      location={data.location}
    />
  );
}
function App() {
  const settings = {
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,   //transition speed
    autoplaySpeed: 4000,    //each slide is displayed for 4 sec
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextBtn icon="fas fa-chevron-right" />,
    prevArrow: <PreviousBtn icon="fas fa-chevron-left" />,
  };
  return (
    <div className="testimonial">
      <div style={{ width: "80%" }}>
        <h1 className="heading-test">Testimonials</h1>
        <Slider {...settings}>{data.map(cards)}</Slider>
      </div>
    </div>
  );
}
export default App;
