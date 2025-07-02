import { useAuth } from "../context/auth.context.tsx";
import { Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { UserType } from "../types";
import ArticleCard from "../components/ArticleCard.tsx";
import { useArticles } from "../context/article.context.tsx";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { fetchUserProfile } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const { deleteArticle } = useArticles();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!userId) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetch = async () => {
      const { success, message, data } = await fetchUserProfile(userId);

      if (success && data) {
        console.log(message);
        setCurrentUser(data);
      } else {
        console.error(message);
      }
    };
    fetch();
  }, []);

  if (!currentUser || !user) {
    return null;
  }

  const handleDelete = async (id: string) => {
    const { success, message } = await deleteArticle(id);

    if (success) {
      console.log(message);
      setCurrentUser({
        ...currentUser,
        articles: currentUser.articles.filter((a) => a._id !== id),
      });
    } else {
      console.error(message);
    }
  };

  const handleLogout = async () => {
    const { success, message } = await logout();
    if (success) {
      console.log(message);
      navigate("/auth/login");
    } else {
      console.error(message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Basic Info about user */}
      <div className="bg-stone-100 rounded-lg my-6 p-4">
        <h1 className="text-3xl font-bold mb-2">{currentUser.username}</h1>
        <h2 className="text-xl font-semibold">{currentUser.email}</h2>
        <h5 className="text-stone-700">
          {currentUser.createdAt.split("T")[0]}
        </h5>
        {currentUser._id === user._id && (
          <button
            className="bg-red-600 hover:bg-red-700 rounded-lg text-white px-5 py-2 mt-4 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {/*  User's articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUser.articles.map((article) => (
          <ArticleCard
            article={article}
            showUser={currentUser._id !== user._id}
            key={article._id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
