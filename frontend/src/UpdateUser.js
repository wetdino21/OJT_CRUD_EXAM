import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            // const response = await axios.post(
            //     "http://localhost:5000/api/auth/protected",
            //     {}, // Empty body (if not required)
            //     { withCredentials: true } // Send cookies
            // );

            // setUserId(response.data.id);
            // setName(response.data.name);
            // setEmail(response.data.email);
            // setLoading(false);


            try {
                const response = await axios.post(
                    "http://localhost:5000/api/auth/protected",
                    {}, // Empty body (if not required)
                    { withCredentials: true } // Send cookies
                );

                setUserId(response.data.id);
                setName(response.data.name);
                setEmail(response.data.email);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setMessage("You must be logged in to update your profile.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("You must be logged in to update your profile.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/update`,
                { userId, name, email, password },
                { withCredentials: true }
            );

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.error : "Update failed.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (userId === null) {
        return <h1>You must be logged in to update your profile.</h1>;
    }


    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <h3>User ID: {userId}</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                />
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default UpdateUser;
