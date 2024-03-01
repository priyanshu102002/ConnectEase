import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
        email,
    }) => {
        setLoading(true);
        try {
            // Form validation
            const success = handleInputErrors({
                fullName,
                userName,
                password,
                confirmPassword,
                gender,
                email,
            });
            if (!success) return;

            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    username: userName,
                    password,
                    confirmPassword,
                    gender,
                    email,
                }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Local storage logic (AuthContext hook)
            localStorage.setItem("chat-user", JSON.stringify(data));

            // Set user in context
            setAuthUser(data);
        } catch (error) {
            toast.error(
                "Something went wrong, User already exists",
                error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

// Form validation
function handleInputErrors({
    fullName,
    userName,
    password,
    confirmPassword,
    email,
}) {
    if (!fullName || !userName || !password || !confirmPassword || !email) {
        toast.error("All Fields are required");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }
    return true;
}
