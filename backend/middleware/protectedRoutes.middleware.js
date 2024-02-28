import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res
                .status(401)
                .json({ error: "Unauthorized - No token Provided" });
        }

        // agar token shi hai to userId nikal lo user ka
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified)
            return res
                .status(401)
                .json({ message: "Unauthorized - Invalid token" });

        const user = await User.findById(verified.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - No user found with this token",
            });
        }

        // req me user ka data dal do taki routes verify karne time use kar sake
        // user ka data hum use kar shkte hai agar routes verified hai to
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoutes", error.message);
        res.status(500).json({ message: error.message });
    }
};

export default protectedRoutes;
