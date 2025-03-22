import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserType } from "../types";

const ProfilePage = () => {
  const { fetchProfile, logout } = useAuth();
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      const { success, message, user } = await fetchProfile();

      // TODO: Toast
      if (success) {
        console.log(user);
        setUser(user);
      } else {
        alert(message);
      }
    };

    fetch();
  }, []);

  const handleLogout = () => {
    logout();

    // TODO: Toast
    alert("Logged out successfully!")
  }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg w-full border border-neutral-700 shadow-md shadow-neutral-800 flex flex-col p-5 items-center mt-20">
        <h2 className="text-4xl font-bold text-neutral-100">
          {user?.username}
        </h2>
        <h3 className="text-lg font-semibold text-neutral-400">
          {user?.email}
        </h3>
        <h3 className="text-lg font-medium text-neutral-400 mt-2">
          Total Notes: 0
        </h3>

        <button
          className="rounded-md mt-4 px-6 py-2 cursor-pointer bg-red-800 hover:bg-red-900 duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
