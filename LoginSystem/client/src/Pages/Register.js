

// npx create-react-app . // setups react in client side 

import React, { useState } from "react";
import Axios from "axios"
import '../App.css';
import Navbar from '../Components/Navbar/Navbar';



function App() {

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div>

            {/* <h1>registration</h1> */}
            <section className="registerHome">
                <div className="registerNavBanner">
                    <Navbar />
                    <div className="registerBanner">
                        <p>Register</p>
                    </div>
                </div>
                <div className="registerCard">
                    <div className="register">
                        <h1>Create Account</h1>
                        <input 
                            type="text"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsernameReg(e.target.value)
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            onChange={(e) => {
                                setPasswordReg(e.target.value)
                            }}
                        />
                        <button onClick={register}>Register</button>
                    </div>
                </div>

            </section>


        </div>

    );
}

export default App;
