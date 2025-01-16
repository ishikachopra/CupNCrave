import './App.css';
import './index.css';
import HomePage from './Components/Homepage';
import React,{useState,useEffect} from 'react';
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  const[loading,setloading]=useState(false);
  useEffect(()=>{
    setloading(true)
    setTimeout(()=>{
      setloading(false)
    },2000)
  },[])
  return (
    <div >{
      loading?
      <div className="loading">
          <PulseLoader
            color={'#402c13'}
            loading={loading}
            size={25}
          />
      </div>
        :
      <HomePage />
      }
    </div>
    
  );
}

export default App;
