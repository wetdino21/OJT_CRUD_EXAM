import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteUser } from "./redux/actions/authActions";

const DeleteUser = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleDelete = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/delete", {}, { withCredentials: true });
            if (response.status === 200) {
                dispatch(deleteUser(user.id));
                setMessage("Delete successful!");
            } else {
                setMessage("Delete failed.");
            }
        } catch (err) {
            setMessage(err.response ? err.response.data.error : "Delete failed.");
        }
    };

    return (
        <div>
            <h1>Delete User</h1>
            {user ? (
                <div>
                    <p>Are you sure you want to delete user: {user.name}?</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <p>No user data</p>
            )}
            <p>{message}</p>
        </div>
    );
};

export default DeleteUser;
