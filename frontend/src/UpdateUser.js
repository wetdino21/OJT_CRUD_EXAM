import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { update } from "./redux/actions/authActions";

const UpdateUser = () => {
    const user = useSelector((state) => state.auth.user);
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/update", {
                userId: user.id,
                name,
                email,
            }, { withCredentials: true });
            if (response.status === 200) {
                dispatch(update(response.data.user));
                setMessage("Update successful!");
            } else {
                setMessage("Update failed.");
            }
        } catch (err) {
            setMessage(err.response ? err.response.data.error : "Update failed.");
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
            <p>{user ? `Current user: ${user.name}` : "No user data"}</p>
        </div>
    );
};

export default UpdateUser;
