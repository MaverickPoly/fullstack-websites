import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ArticlesPage from "./pages/ArticlesPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { useAuth } from "./context/auth.context.tsx";
import CreatePage from "./pages/CreatePage.tsx";

export default function App() {
  const { accessToken, loading } = useAuth();
  return (
    <main className="">
      <BrowserRouter>
        {!loading && accessToken && <Navbar />}
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ArticlesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/article/:articleId"
            element={
              <ProtectedRoute>
                <ArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
