import { useState } from "react";
import Input from "../components/Input";
import { useComments } from "../contexts/CommentsContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    username: "",
    image_url: "",
  });
  const commentsContext = useComments();
  const navigate = useNavigate();
  const toastsContext = useToast();

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, message } = await commentsContext.createComment({
      title: formData.title,
      content: formData.content,
      username: formData.username,
      image_url: formData.image_url,
    });

    if (success) {
      toastsContext.toastSuccess(message)
      navigate("/");
    } else {
      toastsContext.toastError(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-lg w-full bg-neutral-100 px-6 py-8 rounded-md mt-16 shadow-md"
      >
        <h2 className="text-center text-3xl font-semibold mb-6 text-pink-800">
          Create Comment
        </h2>

        <Input
          name="title"
          type="text"
          placeholder="Comment Title..."
          value={formData.title}
          onChange={onChange}
        />
        <textarea
          name="content"
          placeholder="Comment Content..."
          className="p-3 rounded-md outline-none bg-white border border-neutral-200 focus:border-neutral-400 h-[130px] resize-none"
          value={formData.content}
          onChange={onChange}
        ></textarea>
        <Input
          name="username"
          type="text"
          placeholder="Comment Username..."
          value={formData.username}
          onChange={onChange}
        />
        <Input
          name="image_url"
          type="url"
          placeholder="User Image URL..."
          value={formData.image_url}
          onChange={onChange}
        />

        <button
          type="submit"
          className="mt-5 bg-pink-700 hover:bg-pink-800 cursor-pointer text-white p-2 rounded-md text-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
