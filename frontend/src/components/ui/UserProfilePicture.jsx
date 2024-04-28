import React from "react";

const UserProfilePicture = ({ username }) => {
  username = username[0].toUpperCase() || "";
  return (
    <div className="w-10 h-10 text-2xl flex justify-center items-center bg-primary rounded-full">
      {username}
    </div>
  );
};

export default UserProfilePicture;
