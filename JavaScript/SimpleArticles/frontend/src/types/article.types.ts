import type { ReturnType, UserType } from "./auth.types.ts";

export interface ArticleType {
  _id: string;
  title: string;
  content: string;
  category: string;
  userId: UserType;
  createdAt: string;
  updatedAt: string;
}

// Context
export interface ArticleContextType {
  articles: ArticleType[];

  fetchAllArticles: () => Promise<ReturnType>;
  createArticle: (params: CreateArticleType) => Promise<ReturnType>;
  getArticle: (articleId: string) => Promise<GetArticleType>;
  updateArticle: (
    articleId: string,
    fields: UpdateArticleFields,
  ) => Promise<ReturnType>;
  deleteArticle: (articleId: string) => Promise<ReturnType>;
}

export interface CreateArticleType {
  title: string;
  content: string;
  category: string;
}

export interface GetArticleType {
  success: boolean;
  message: string;
  data: ArticleType | null;
}

export interface UpdateArticleFields {
  title?: string;
  content?: string;
  category?: string;
}
