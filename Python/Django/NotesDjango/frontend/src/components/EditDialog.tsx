import { ChangeEvent, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Note } from "../types";
import { useNotes } from "../contexts/NoteContext";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
}

const EditDialog = ({ isOpen, onClose, note, setNote }: EditDialogProps) => {
  const [formData, setFormData] = useState({
    title: note.title,
    description: note.description,
  });
  const {updateNote} = useNotes();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    const {success, message, data} = await updateNote({id: note.id, ...formData});

    // TODO: Toast
    if (success) {
        alert(message);
        setNote({...note, ...data})
        onClose();
    } else {
        alert(message);
    }
  }


  return (
    <div className={`fixed top-0 left-0 w-full h-screen bg-black/55 flex items-center justify-center transition-opacity duration-200 ease-in-out ${!isOpen ? 'opacity-0 -z-30' : 'opacity-100'}`}>
      <div className="rounded-md bg-neutral-900 border border-neutral-700 p-4 max-w-md w-full mx-2">
        {/* Top */}
        <div className="flex items-center justify-between">
          <h3 className="text-[21px] font-semibold">Edit Note</h3>
          <button className="cursor-pointer" onClick={onClose}>
            <IoIosClose
              size={33}
              className="text-neutral-400 hover:text-neutral-100"
            />
          </button>
        </div>
        {/* Info */}
        <p className="text-neutral-400 text-[15px] mt-3 font-medium">
          Make changes to your note here. Click save when you're done.
        </p>

        {/* Form */}
        <div className="my-10 flex flex-col gap-4">
          <div className="flex justify-end items-center gap-4">
            <h4 className="text-[17px] text-neutral-200 font-semibold">
              Title
            </h4>
            <input
              name="title"
              type="text"
              placeholder="Title..."
              value={formData.title}
              onChange={onChange}
              className="p-2 border border-neutral-700 focus:border-neutral-400 outline-none rounded-md w-[310px]"
            />
          </div>
          <div className="flex justify-end items-center gap-4">
            <h4 className="text-[17px] text-neutral-200 font-semibold">
              Description
            </h4>
            <textarea
              name="description"
              placeholder="Description..."
              value={formData.description}
              onChange={onChange}
              className="p-2 border border-neutral-700 focus:border-neutral-400 outline-none rounded-md w-[310px] h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          {/* Action */}
          <button className="px-5 py-2 rounded-md text-[15px] font-semibold bg-neutral-50 text-neutral-700 cursor-pointer hover:bg-neutral-200 duration-75" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
