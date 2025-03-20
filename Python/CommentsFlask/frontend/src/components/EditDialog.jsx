import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const EditDialog = ({ isOpen, onClose, comment }) => {
  const [formData, setFormData] = useState({
    username: comment.username,
    image_url: comment.image_url,
    comment: comment.comment,
    title: comment.title,
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const updateComment = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`${import.meta.env.VITE_API_URL}/${comment.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <form
        className="bg-neutral-900 rounded-lg p-6 shadow-lg w-full max-w-lg mx-3 space-y-2"
        onSubmit={updateComment}
      >
        <h2 className="text-2xl font-bold mb-4">Update Comment</h2>
        <div className="flex gap-4">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            onChange={onInputChange}
            required
            value={formData.username}
          />
          <Input
            name="title"
            placeholder="Title"
            type="text"
            onChange={onInputChange}
            required
            value={formData.title}
          />
        </div>
        <Input
          name="image_url"
          placeholder="Image Url"
          type="url"
          onChange={onInputChange}
          required
          value={formData.image_url}
        />
        <Input
          name="comment"
          placeholder="Comment"
          type=""
          onChange={onInputChange}
          required
          value={formData.comment}
        />

        {/* Buttons */}
        <div className="mt-5 flex justify-end space-x-2 items-center">
          <Button onClick={onClose} type="button" variant="filled">
            Cancel
          </Button>
          <Button onClick={() => {}} type="submit" variant="filled">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditDialog;
