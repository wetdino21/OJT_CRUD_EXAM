require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const JWT_SECRET = process.env.JWT_SECRET;

// Register Route
app.post("/api/auth/register", async (req, res) => {
    console.log("Register route hit");
    try {
        const { name, email, password } = req.body;
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) return res.status(400).json({ error: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
    console.log("Login route hit");
    try {
        const { email, password } = req.body;
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) return res.status(401).json({ error: "User not found" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        console.info("User logged in:", user.id);
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: "Strict", expires: new Date(Date.now() + 3600000) });

        res.json({ message: "Login successful", user: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User
app.post("/api/auth/update", verifyToken, async (req, res) => {
    console.log("Update route hit");
    try {
        const { userId, name, email, password } = req.body;
        if (req.user.id !== parseInt(userId)) return res.status(403).json({ error: "You can only update your own account" });

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const query = hashedPassword ? "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?" : "UPDATE users SET name = ?, email = ? WHERE id = ?";
        const values = hashedPassword ? [name, email, hashedPassword, userId] : [name, email, userId];

        await db.execute(query, values);
        const [updatedUser] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [userId]);
        res.status(200).json({ message: "User updated successfully", user: updatedUser[0] });
        console.info("User updated successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete User
app.post("/api/auth/delete", verifyToken, async (req, res) => {
    console.log("Delete route hit");
    try {
        const userId = req.user.id; // Get userId directly from the verified token

        console.info("Authenticated User ID:", userId);

        const [deleteUser] = await db.execute("DELETE FROM users WHERE id = ?", [userId]);

        if (deleteUser.affectedRows === 0) return res.status(404).json({ error: "User not found." });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected Route
app.post("/api/auth/protected", verifyToken, async (req, res) => {
    console.log("Protected route hit");
    try {
        const userId = req.user.id;
        const [users] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [userId]);

        if (users.length === 0) return res.status(404).json({ error: "User not found." });
        res.json(users[0]);
    } catch (err) {
        console.error("error server Protected");
        res.status(500).json({ error: "Server error" });
    }
});

// Logout Route
app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
});

// Middleware to Verify JWT Token
function verifyToken(req, res, next) {
    console.log("token verification");
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Access denied, token missing" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
}

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
