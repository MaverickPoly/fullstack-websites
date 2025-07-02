import { Link, Navigate } from "react-router";
import type { JSX } from "react";
import { useAuth } from "../context/auth.context.tsx";

function StyledLink({ to, title }: { to: string; title: string }): JSX.Element {
  return (
    <Link to={to} className="text-lg text-stone-700 hover:text-violet-800">
      {title}
    </Link>
  );
}

export default function Navbar() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <nav className="sticky top-0 left-0 w-full px-8 py-2 flex justify-center gap-16 lg:gap-32 items-center border-b border-stone-400 shadow-md bg-stone-50">
      <StyledLink to="/" title="Articles" />
      <StyledLink to="/new" title="Create" />
      <StyledLink to={`/user/${user._id}`} title="Profile" />
    </nav>
  );
}
