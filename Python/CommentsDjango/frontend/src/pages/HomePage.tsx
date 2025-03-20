import { useEffect } from "react";
import { useComments } from "../contexts/CommentsContext";
import Card from "../components/Card";

const HomePage = () => {
  const context = useComments();

  useEffect(() => {
    const fetch = async( ) => {
      await context.fetchComments();
    }

    fetch();
  }, [])

  return <div className="max-w-6xl mx-auto">
    <div className="my-10">
      <h2 className="text-3xl font-bold text-pink-800">Most Recent Comments</h2>
    </div>

    {/* Comments List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 pb-6">
      {context.comments.map((comment) => (
        <Card comment={comment} key={comment.id} />
      ))}
    </div>
  </div>;
};

export default HomePage;
