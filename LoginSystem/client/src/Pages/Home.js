import React from "react";
import Navbar from '../Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
    import '../Pages/styles.css';


const Home = () => {

    return (
        <div className="main">
            <Navbar />
            <div className="title">
                <p> Movie Tracker</p>
            </div>
            
        </div>
    );
}



export default Home