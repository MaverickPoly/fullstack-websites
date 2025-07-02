import { type ChangeEvent, useEffect, useState } from "react";
import { useArticles } from "../context/article.context.tsx";
import ArticleCard from "../components/ArticleCard.tsx";
import Input from "../components/Input.tsx";
import type { ArticleType } from "../types";

export default function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const { fetchAllArticles, articles } = useArticles();

  useEffect(() => {
    const fetch = async () => {
      const { success, message } = await fetchAllArticles();

      if (success) {
        console.log(message);
        setFilteredArticles(articles);
      } else {
        console.error(message);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((a) =>
          a.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [articles, search]);

  console.log(articles);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-8">
      <div className="w-full mb-6">
        <Input
          type="text"
          name="search"
          className="w-full"
          value={search}
          placeholder="Search Articles ..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredArticles.map((article) => (
          <ArticleCard key={article._id} article={article} showUser={true} />
        ))}
      </div>
    </div>
  );
}
