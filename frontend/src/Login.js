import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                },
                { withCredentials: true } // Use cookies for storing the token
            );

            setMessage("Login successful!");

            // Redirect to UpdateUser component after login success
            navigate("/update-profile"); // Replace with the actual route for UpdateUser
        } catch (error) {
            setMessage(error.response ? error.response.data.error : "Login failed.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
