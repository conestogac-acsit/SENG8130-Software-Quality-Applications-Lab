import React from "react";

const ProfilePage = () => {
  const userName = "Yash Ketanbhai Shah";
  const userEmail = "yash.shah@example.com";
  const userRole = "professor"; // Options: "professor", "ta", "dean"

  const getRoleDescription = () => {
    switch (userRole.toLowerCase()) {
      case "professor":
        return "You are a Professor";
      case "ta":
      case "teaching assistant":
        return "You are a Teaching Assistant";
      case "dean":
        return "You are the Dean";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome, Yash</h1>
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-200"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800">{userName}</p>
            <p className="text-sm text-gray-500 mt-1">{getRoleDescription()}</p>
            <p className="text-sm text-gray-500 mt-1">📧 {userEmail}</p>
          </div>
        </div>
        <div className="mt-6 text-gray-700 text-sm leading-relaxed">
          <p>
            This is your personal profile page. You can customize your settings, view your details,
            or manage your account from here. More features will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
