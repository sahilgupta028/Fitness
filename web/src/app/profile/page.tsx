"use client";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to log in to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.email || "User"}!</h1>
        <p className="text-gray-600">Email: {session.user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
