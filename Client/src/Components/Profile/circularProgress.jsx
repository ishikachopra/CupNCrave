import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./circularProgress.css";

const CircularProgressChart = () => {
  const [progress, setProgress] = useState(0);
  const [count,setCount]=useState(0);

  const fetchCount = async () => {
    try {
      const response = await axios.get("http://localhost:3000/CupnCrave/profile", {
        withCredentials: true, // Include cookies with the request
      });
      const orderCount = Number(response.data.orderCount); // Convert orderCount to a number
      const calculatedCount = (orderCount /10) * 100;
      setCount(calculatedCount);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  useEffect(() => {
    fetchCount();
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= count) {
          clearInterval(interval); // Stop progress at count%
          return count;
        }
        return prev + 1;
      });
    }, 50); // Adjust speed as needed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [count]);

  return (
    <>
     <div className="profile-info">
       <div className="profile-heading profile-heading-points">
          <img src="./images/money.png" alt=""/>
          <h1>COFFEE BUCKS</h1>
        </div>
    <div className="chart">
       
      <div
        className="progress-container"
        style={{
          background: `conic-gradient(rgba(101, 69, 31) ${progress * 3.6}deg,rgb(230, 228, 228) 0deg)`,
        }}
      >
        <div className="progress-inner">{progress}%</div>
      </div>
      <div>
            <h4>Earn a free coffee after every 10th order (Rs.500 or above) </h4>
            <h2>You are {100 - count} Points away from a free coffee! <img src="./images/cup.png"></img></h2>
      </div>
      
    </div>
    
      </div>
    </>
  );
};

export default CircularProgressChart;
