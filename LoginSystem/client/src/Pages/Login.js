

// npx create-react-app . // setups react in client side 

import React, { useState } from "react";
import Axios from "axios"
import '../App.css';
import Navbar from '../Components/Navbar/Navbar';



function App() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].username)
            }
        })
    }

    return (
        <div>

            <section className="loginHome">
                <div className="loginNavBanner">
                    <Navbar />
                    <div className="loginBanner">
                        <p>Login</p>
                    </div>
                </div>
                <div className="loginCard">
                    <div className="login">
                        <h1>Account Login</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <button onClick={login}>Login</button>
                    </div>
                </div>

                <h1>{loginStatus}</h1>
            </section>


        </div>

    );
}

export default App;
