import { createContext, type ReactNode, useContext, useState } from "react";
import type {
  ArticleContextType,
  ArticleType,
  CreateArticleType,
  UpdateArticleFields,
} from "../types";
import { api } from "../util/axios.ts";

const ArticlesContext = createContext<ArticleContextType | undefined>(
  undefined,
);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const fetchAllArticles = async () => {
    try {
      const res = await api.get("/articles");
      setArticles(res.data.data);
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error fetching articles!",
      };
    }
  };

  const createArticle = async (params: CreateArticleType) => {
    try {
      const res = await api.post("/articles", params);
      setArticles([...articles, res.data.data]);
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error creating article!",
      };
    }
  };

  // Fetch Article By Id
  const getArticle = async (articleId: string) => {
    try {
      const res = await api.get(`/articles/${articleId}`);
      return { success: true, message: res.data.message, data: res.data.data };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error fetching article!",
        data: null,
      };
    }
  };

  const updateArticle = async (
    articleId: string,
    fields: UpdateArticleFields,
  ) => {
    try {
      const res = await api.put(`/articles/${articleId}`, fields);
      const article: ArticleType = res.data.data;
      setArticles(articles.map((a) => (a._id === article._id ? article : a)));
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error updating article!",
      };
    }
  };

  const deleteArticle = async (articleId: string) => {
    try {
      const res = await api.delete(`/articles/${articleId}`);
      const article: ArticleType = res.data.data;
      setArticles(articles.filter((a) => a._id !== article._id));
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error deleting article!",
      };
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        fetchAllArticles,
        createArticle,
        getArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within useAuth");
  }
  return context;
};
