import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const register = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } =
            req.body;

        if (!fullName || !username || !email || !password || !confirmPassword) {
            return res.status(422).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(422).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 12);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture:
                gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        // generate token and set cookie to the response
        generateTokenAndSetCookie(user._id, res);

        const result = await user.save();

        // Send data to client without password
        const { password: userPassword, ...data } = result._doc;

        if (result) {
            res.status(201).json({
                message: "User registered successfully",
                data,
            });
        } else {
            res.status(500).json({ error: "Failed to register user" });
        }
    } catch (error) {
        console.log("Register error", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(422).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(422)
                .json({ error: "Invalid username or password" });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            return res
                .status(422)
                .json({ error: "Invalid username or password" });
        }

        // generate token and set cookie to the response
        generateTokenAndSetCookie(user._id, res);

        // Send data to client without password
        const { password: userPassword, ...data } = user._doc;

        res.status(200).json({
            message: "User logged in successfully",
            data,
        });
    } catch (error) {
        console.log("Login error", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        await res
            .clearCookie("token")
            .status(200)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Logout error", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
