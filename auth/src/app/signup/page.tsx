"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loader, setLoader] = useState(false);

    const validateFields = () => {
        const trimmedUserName = user.userName.trim();
        const trimmedEmail = user.email.trim();
        const trimmedPassword = user.password.trim();

        const newErrors = { userName: "", email: "", password: "" };

        if (!trimmedUserName) {
            newErrors.userName = "Username is required.";
        }

        if (!trimmedEmail) {
            newErrors.email = "Email is required.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedEmail)) {
                newErrors.email = "Invalid email format.";
            }
        }

        if (!trimmedPassword) {
            newErrors.password = "Password is required.";
        } else if (trimmedPassword.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        // Check if any error message exists
        for (const errorMsg of Object.values(newErrors)) {
            if (errorMsg) {
                return false; 
            }
        }
        return true; 
    };

    const onSignup = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setLoader(true);
            setButtonDisabled(true);

            const payload = {
                userName: user.userName.trim(),
                email: user.email.trim(),
                password: user.password.trim(),
            };

            const response = await axios.post("/api/users/signup", payload);
            console.log("Signup successful", response.data);

            toast.success("Signup successful! Redirecting...");
           // setTimeout(() => {
               router.push("/login");
         //   }, 1500);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Signup failed", error);
                toast.error(error.message || "Signup failed. Please try again.");
            }

        } finally {
            setLoader(false);
            setButtonDisabled(false);  
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <Toaster position="top-center" />
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

                {/* Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${errors.userName ? "ring-red-500" : "focus:ring-blue-500"}`}
                        value={user.userName}
                        onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    />
                    {errors.userName && <p className="text-red-400 text-sm mt-1">{errors.userName}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "ring-red-500" : "focus:ring-blue-500"}`}
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "ring-red-500" : "focus:ring-blue-500"}`}
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Signup Button */}
                <button
                    onClick={onSignup}
                    disabled={buttonDisabled || loader}
                    className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors duration-300 
                        ${buttonDisabled || loader ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"}`}
                >
                    {loader ? "Signing up..." : "Sign Up"}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline hover:text-blue-500">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
