import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditDialog from "./EditDialog";

const Card = ({ comment }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/${comment.id}/delete`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="flex flex-col items-start w-full bg-neutral-900 p-4 rounded-lg">
        <div className="flex justify-between items-start w-full mb-3">
          <div className="flex">
            <img
              src={comment.image_url}
              alt={comment.title}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex flex-col ml-4">
              <h3 className="text-md mb-1">{comment.title}</h3>
              <h5 className="text-sm text-neutral-400">{comment.created_at}</h5>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="cursor-pointer text-neutral-300 hover:text-neutral-50"
              onClick={handleEdit}
            >
              <Pencil size={18} />
            </button>
            <button
              className="cursor-pointer text-neutral-300 hover:text-neutral-50"
              onClick={handleDelete}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <h3 className="mb-1 text-lg">{comment.username}</h3>
        <p className="text-md font-normal text-neutral-300">
          {comment.comment}
        </p>
      </div>
      <EditDialog
        comment={comment}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
};

export default Card;
