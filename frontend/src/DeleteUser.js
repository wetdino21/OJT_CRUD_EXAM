import React, { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        try {
            // No need to send userId manually, backend should extract it from the authenticated session
            const response = await axios.post(
                "http://localhost:5000/api/auth/delete",
                {}, // No need for request body
                { withCredentials: true }
            );

            setMessage(response.data.message); // Success message
        } catch (error) {
            setMessage(error.response ? error.response.data.error : "Deletion failed.");
        }
    };

    return (
        <div>
            <h1>Delete Account</h1>
            <button onClick={handleDelete}>Delete Account</button>
            <p>{message}</p>
        </div>
    );
};

export default DeleteUser;
