import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const {accessToken} = useAuth();

  return (
    <nav className="flex sticky top-0 left-0 w-full px-10 py-4 justify-between items-center bg-neutral-950 shadow-lg shadow-neutral-800">
      <Link className="text-2xl font-bold" to="/">
        Django + React = 🤠
      </Link>

      <div className="flex gap-6 items-center">
        {accessToken ? (
          <>
            <Link
              to="/create"
              className="text-lg relative text-neutral-300 hover:text-emerald-600 group transition-colors duration-300 pb-1"
            >
              Create
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              {/* <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-700 group-hover:w-full transition-all duration-300"></span> */}
            </Link>
            <Link
              to="/profile"
              className="text-lg relative text-neutral-300 hover:text-emerald-600 group transition-colors duration-300 pb-1"
            >
              Profile
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg relative text-neutral-300 hover:text-emerald-600 group transition-colors duration-300 pb-1"
            >
              Login
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
            <Link
              to="/register"
              className="text-lg relative text-neutral-300 hover:text-emerald-600 group transition-colors duration-300 pb-1"
            >
              Register
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </Link>
          </>
        )}

        <Link
          to="/about"
          className="text-lg relative text-neutral-300 hover:text-emerald-600 group transition-colors duration-300 pb-1"
        >
          About
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
