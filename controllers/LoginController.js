import User from "../models/UserModel.js";
import bcrypt from ("bcrypt");
import jsonwebtoken from ("jsonwebtoken");

export const getLogin = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = User.find((u) => u.username === username);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jsonwebtoken.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.log(error.message);
    }
}

export const getProtected = async(req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jsonwebtoken.verify(token, SECRET_KEY);
        res.json({ message: "Access granted", user: decoded });
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
}