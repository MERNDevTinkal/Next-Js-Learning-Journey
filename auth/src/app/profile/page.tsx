"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.error("Logout Error:", error.message);
            toast.error(error.message || "Logout failed");
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log("User details:", res.data);
            setUserId(res.data.data._id);
        } catch (error: any) {
            console.error("User Details Error:", error.message);
            toast.error(error.message || "Failed to fetch user details");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <h1>Profile page</h1>

            <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center w-full max-w-md">
                <h2 className="text-xl mb-4 font-semibold">User ID</h2>
                <div className="p-3 mb-6 bg-green-500 rounded-lg text-black break-all">
                    {userId ? (
                        <Link href={`/profile/${userId}`} className="hover:underline">{userId}</Link>
                    ) : (
                        "No user details loaded."
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={getUserDetails}
                        className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg font-semibold transition-all"
                    >
                        Get User Details
                    </button>

                    <button
                        onClick={logout}
                        className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg font-semibold transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
