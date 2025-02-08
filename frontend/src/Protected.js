// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Protected = () => {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchProtectedData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:5000/api/protected", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setMessage(response.data.message);
//             } catch (err) {
//                 setMessage(err.response ? err.response.data.error : "Access denied.");
//             }
//         };

//         fetchProtectedData();
//     }, []);

//     return <div>{message}</div>;
// };

// export default Protected;
