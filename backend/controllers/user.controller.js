import User from "../models/user.model.js";

export const getUserForSiderbar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        // Get all users except the logged in user
        const filteredUser = await User.find({
            _id: { $ne: loggedInUser },
        }).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.log(`Error occurred at getUserForSiderbar: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
