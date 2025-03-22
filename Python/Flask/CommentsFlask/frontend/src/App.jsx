import { useEffect, useState } from "react";
import IconButton from "./components/IconButton";
import { SunMoon, Plus } from "lucide-react";
import CreateDialog from "./components/CreateDialog";
import Card from "./components/Card";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [comments, setComments] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const notify = (text) => toast(text);

  useEffect(() => {
    fetchComments();
    console.log(comments);
  }, []);

  const fetchComments = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/all`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleTheme = () => {
    notify("Toggle Theme");
  };

  const addComment = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto pt-2">
      <div className="w-full flex justify-between items-center bg-neutral-900 px-4 py-3 rounded-lg">
        <h3 className="text-xl font-bold">Python + JavaScript = 🔥</h3>
        <div className="flex items-center gap-2">
          <IconButton callback={toggleTheme}>
            <SunMoon />
          </IconButton>
          <IconButton callback={addComment}>
            <Plus />
          </IconButton>
        </div>
      </div>
      {/* Comments List */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {comments.map((comment) => (
          <Card key={comment.id} comment={comment} />
        ))}
      </div>

      <CreateDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        fetchComments={fetchComments}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
