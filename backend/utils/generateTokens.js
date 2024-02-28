import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    // Set cookie for the client to store the token in the browser
    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevents XSS attacks cross site scripting attacks
        sameSite: "strict", // Prevents CSRF attacks cross site request forgery attacks
        secure: process.env.NODE_ENV === "development" ? true : false,
    });
};

export default generateTokenAndSetCookie;
