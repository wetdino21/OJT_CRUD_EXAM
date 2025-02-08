import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Protected from "./Protected";
import Home from "./Home";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/update">update</Link>
            </li>
            <li>
              <Link to="/delete">delete</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>

          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/delete" element={<DeleteUser />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/update-profile" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
