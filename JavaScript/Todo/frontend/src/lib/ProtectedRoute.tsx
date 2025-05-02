import {ReactNode} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const {accessToken} = useAuth();

    if (!accessToken) return <Navigate to="/auth/login" />
    return children;
}