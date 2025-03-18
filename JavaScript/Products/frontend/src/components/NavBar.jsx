import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { SquarePlus } from "lucide-react";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-3 px-8 rounded-lg bg-neutral-100 dark:bg-neutral-950 mb-5">
      <Link to="/" className=" text-2xl font-bold">
        MERN Masterclass 🕶️
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link to="/create">
          <button className="p-2 rounded-md bg-neutral-200 hover:bg-neutral-300  cursor-pointer dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white">
            <SquarePlus />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
