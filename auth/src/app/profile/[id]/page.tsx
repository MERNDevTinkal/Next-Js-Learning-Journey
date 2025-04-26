"use client";

import React from "react";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const params = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Profile Page</h1>
      <h2 className="text-2xl bg-gray-700 px-6 py-3 rounded-lg shadow-md">
        {params.id}
      </h2>
    </div>
  );
};

export default ProfilePage;
