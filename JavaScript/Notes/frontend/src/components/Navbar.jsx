import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white backdrop-blur-xl sticky top-0 left-0 py-4 px-14 flex justify-between items-center border-b border-neutral-300 shadow-sm mb-4 z-40">
      <Link className="text-3xl font-bold" to="/">
        MERN = 🫠
      </Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link
              to="/create"
              className="text-lg text-neutral-800 hover:text-yellow-700"
            >
              Create
            </Link>
            <Link
              to="/profile"
              className="text-lg text-neutral-800 hover:text-yellow-700"
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg text-neutral-800 hover:text-yellow-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg text-neutral-800 hover:text-yellow-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
