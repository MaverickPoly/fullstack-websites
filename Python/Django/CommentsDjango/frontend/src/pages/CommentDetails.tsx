import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Comment } from "../types";
import { useComments } from "../contexts/CommentsContext";
import { useToast } from "../contexts/ToastContext";

const CommentDetails = () => {
  const { commentId } = useParams();
  const [currentComment, setCurrentComment] = useState<Comment | undefined>(
    undefined
  );
  const commentsContext = useComments();
  const navigate = useNavigate();
  const toastsContext = useToast();

  if (!commentId) {
    toastsContext.toastError("Invalid Comment ID!");
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetch = async () => {
      const id = parseInt(commentId);

      if (isNaN(id)) {
        toastsContext.toastError("Invalid Comment ID!");
        return <Navigate to="/" />;
      }
      const { success, message, data } = await commentsContext.getComment({
        id: id,
      });

      if (success && data) {
        setCurrentComment(data);
      } else {
        toastsContext.toastError(message)
      }
    };

    fetch();
  }, []);

  const handleDelete = async () => {
    const { success, message } = await commentsContext.deleteComment({
      id: parseInt(commentId),
    });

    if (success) {
      toastsContext.toastSuccess(message)
      navigate("/");
    } else {
      toastsContext.toastWarn(message)
    }
  };

  if (!currentComment) return null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top */}
      <div className="bg-neutral-100 rounded-sm shadow-lg p-5">
        <div className="flex justify-between border-b border-neutral-400 pb-6">
          <div className="flex flex-col items-start">
            <div className="flex gap-6">
              <img
                src={currentComment.image_url}
                alt={`${currentComment.username} Image`}
                className="w-36 h-36 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold text-pink-700">
                  {currentComment.title}
                </h2>
                <h3 className="text-lg font-medium text-neutral-700">
                  {currentComment.username}
                </h3>
              </div>
            </div>
            <span className="text-sm text-neutral-800 mt-6">
              Created At: {currentComment.created_at.split("T")[0]}
            </span>
            <span className="text-sm text-neutral-800">
              Updated At: {currentComment.updated_at.split("T")[0]}
            </span>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <Link
              to={`/${commentId}/edit`}
              className="rounded-md text-white text-center px-4 py-2 text- cursor-pointer bg-amber-600 hover:bg-amber-700"
            >
              Edit
            </Link>
            <button
              className="rounded-md text-white px-4 py-2 text- cursor-pointer bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-800">
          {currentComment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentDetails;
