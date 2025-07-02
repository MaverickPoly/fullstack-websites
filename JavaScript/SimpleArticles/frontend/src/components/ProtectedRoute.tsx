import type { ReactNode } from "react";
import { useAuth } from "../context/auth.context.tsx";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { accessToken, loading } = useAuth();

  if (loading) {
    console.log("Loading...");
    return <h1>Loading..</h1>;
  }

  if (!accessToken) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
