import type { ArticleType } from "../types";
import { Link } from "react-router";
import { Trash } from "lucide-react";

export default function ArticleCard({
  article,
  showUser,
  handleDelete,
}: {
  article: ArticleType;
  showUser: boolean;
  handleDelete?: (id: string) => Promise<void>;
}) {
  return (
    <div className="relative rounded-lg p-4 border border-stone-300 hover:border-stone-500 w-full transition-colors duration-200 flex flex-col items-start">
      {!showUser && (
        <button
          onClick={() => handleDelete && handleDelete(article._id)}
          className="absolute top-2 right-2 bg-red-700 hover:bg-red-800 rounded-lg cursor-pointer p-2 text-white"
        >
          <Trash size={20} />
        </button>
      )}

      <Link
        to={`/article/${article._id}`}
        className="flex flex-col gap-2 w-full"
      >
        <h2 className="text-2xl font-semibold">{article.title}</h2>
        <h3 className="px-4 py-1 rounded-full bg-violet-600 text-white w-fit">
          {article.category}
        </h3>
        {showUser && (
          <Link
            to={`/user/${article.userId._id}`}
            className="text-xl font-bold text-stone-600 hover:text-stone-900"
          >
            {article.userId.username}
          </Link>
        )}
        <h5 className="text-sm text-stone-700">
          Created: {article.createdAt.split("T")[0]}
        </h5>
      </Link>
    </div>
  );
}
