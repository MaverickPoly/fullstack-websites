import { Link, useNavigate } from "react-router-dom";
import { CirclePlus, LogIn, Lock, LogOut, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    console.log("Logged out successfully!");
  };

  return (
    <nav className="flex py-3 px-8 rounded-md w-full bg-neutral-950 justify-between items-center">
      <Link to="/" className="text-xl font-bold lg:text-2xl">
        Flask + React = 📝🔥
      </Link>
      <div className="flex gap-3">
        {token ? (
          <>
            <Link
              to="/create"
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md "
            >
              <CirclePlus size={24} />
            </Link>
            <button
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={24} />
            </button>
            <Link
              to="/profile"
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md "
            >
              <User size={24} />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md "
            >
              <LogIn size={24} />
            </Link>
            <Link
              to="/register"
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md "
            >
              <Lock size={24} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
