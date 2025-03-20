import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full flex justify-between items-center bg-neutral-100 border-b border-neutral-400 py-3 px-6 mb-2">
      <Link to="/" className="text-2xl font-semibold">Django + React = 👻</Link>
      <div className="flex items-center gap-5 pr-8">
        <Link to="/create" className="text-lg text-neutral-800 hover:text-pink-900">Create</Link>
        <Link to="/about" className="text-lg text-neutral-800 hover:text-pink-900">About</Link>
      </div>
    </nav>
  )
}

export default NavBar