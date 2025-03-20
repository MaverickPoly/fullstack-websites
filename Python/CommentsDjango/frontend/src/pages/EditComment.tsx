import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useComments } from "../contexts/CommentsContext";
import Input from "../components/Input";
import { useToast } from "../contexts/ToastContext";

const EditComment = () => {
  const { commentId } = useParams();
  const [currentComment, setCurrentComment] = useState({
    title: "",
    content: "",
    username: "",
    image_url: "",
  });
  const commentsContext = useComments();
  const navigate = useNavigate();
  const toastsContext = useToast();

  if (!commentId) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetch = async () => {
      const id = parseInt(commentId);

      if (isNaN(id)) {
        toastsContext.toastError("Invalid ID")
        return <Navigate to="/" />;
      }
      const { success, message, data } = await commentsContext.getComment({
        id: id,
      });

      if (success && data) {
        setCurrentComment({
          title: data.title,
          content: data.content,
          username: data.username,
          image_url: data.image_url,
        });
      } else {
        toastsContext.toastError(message);
      }
    };

    fetch();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentComment({ ...currentComment, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { success, message } = await commentsContext.updateComment({
      id: parseInt(commentId),
      ...currentComment,
    });

    if (success) {
      toastsContext.toastInfo(message)
      navigate(-1);
    } else {
      toastsContext.toastWarn(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        onSubmit={handleEdit}
        className="flex flex-col px-5 py-8 rounded-md shadow-md max-w-lg w-full mx-4 bg-neutral-100 mt-14 gap-4"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Edit Comment
        </h2>

        <Input
          name="title"
          type="text"
          value={currentComment.title}
          placeholder="Edit Title..."
          onChange={onChange}
        />
        <textarea
          name="content"
          placeholder="Comment Content..."
          className="p-3 rounded-md outline-none bg-white border border-neutral-200 focus:border-neutral-400 h-[130px] resize-none"
          value={currentComment.content}
          onChange={onChange}
        ></textarea>
        <Input
          name="username"
          type="text"
          value={currentComment.username}
          placeholder="Edit Username..."
          onChange={onChange}
        />
        <Input
          name="image_url"
          type="url"
          value={currentComment.image_url}
          placeholder="Edit Image URL..."
          onChange={onChange}
        />
        <div className="flex gap-5 mt-5">
          <button
            className="flex-1 p-3 text-white text-lg bg-pink-700 hover:bg-pink-800 rounded-md cursor-pointer"
            type="submit"
          >
            Save
          </button>
          <button
            className="flex-1 p-3 text-white text-lg bg-pink-700 hover:bg-pink-800 rounded-md cursor-pointer"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
