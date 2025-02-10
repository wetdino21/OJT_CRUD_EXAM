import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/actions/authActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();
    const authMessage = useSelector((state) => state.auth.message);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                },
                { withCredentials: true } // Use cookies for storing the token
            );

            if (response.status === 200 && response.data.user) {
                setMessage("Login successful!");
                dispatch(login(response.data.user)); // Ensure user data is dispatched

                // Redirect to UpdateUser component after login success
                navigate("/update-profile"); // Replace with the actual route for UpdateUser
            } else {
                setMessage(response.data.user);
                setMessage("Login failed.");
            }
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
            <p>{authMessage}</p>
        </div>
    );
};

export default Login;
