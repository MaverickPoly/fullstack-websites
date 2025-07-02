import { useNavigate, useParams } from "react-router";
import { useArticles } from "../context/article.context.tsx";
import { useEffect, useState } from "react";
import type { ArticleType } from "../types";
import { useAuth } from "../context/auth.context.tsx";
import MarkdownIt from "markdown-it";

export default function ArticlePage() {
  // Hooks
  const { articleId } = useParams<{ articleId: string }>();
  const { getArticle, deleteArticle } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();

  // States
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [markdownContent, setMarkdownContent] = useState<TrustedHTML | string>(
    "",
  );

  if (!articleId) return null;

  useEffect(() => {
    const fetch = async () => {
      const { success, message, data } = await getArticle(articleId);

      if (success && data) {
        console.log(message);
        setArticle(data);
        const md = new MarkdownIt();
        const renderedMarkdown = md.render(data.content);
        setMarkdownContent(renderedMarkdown);
        console.log("Markdown content:", renderedMarkdown);
      } else {
        console.error(message);
      }
    };

    fetch();
  }, []);

  const handleDelete = async () => {
    const { success, message } = await deleteArticle(articleId);

    if (success) {
      console.log(message);
      navigate("/");
    } else {
      console.error(message);
    }
  };

  if (!article) return null;
  if (!user) return null;

  console.log("Userid:");
  console.log(article.userId);

  return (
    <div className="max-w-4xl mx-auto my-4 bg-stone-50 rounded-lg p-5 flex flex-col">
      <h2 className="text-4xl font-bold mb-6">{article.title}</h2>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-2xl font-semibold text-violet-700">
          {article.category}
        </h4>
        <h4 className="text-stone-700 text-sm">
          Created at: {article.createdAt.split("T")[0]}
        </h4>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-2xl">{article.userId.username}</h3>
        {article.userId._id === user._id && (
          <button
            onClick={handleDelete}
            className="px-5 py-1 rounded-lg text-white text-lg bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
      <div className="h-[1px] bg-stone-500 my-8" />
      <div
        className="prose lg:promse-lg"
        dangerouslySetInnerHTML={{ __html: markdownContent }}
      />
    </div>
  );
}
