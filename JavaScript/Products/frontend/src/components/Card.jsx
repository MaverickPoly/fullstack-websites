import { Pencil, Trash } from "lucide-react";
import { useProducts } from "../context/products";
import EditDialog from "./EditDialog";
import { useState } from "react";

const Card = ({ product }) => {
  const { deleteProduct } = useProducts();
  const [isOpen, setIsOpen] = useState(false); // Is Edit Dialog Open?

  const handleDelete = async () => {
    try {
      const { success, message } = await deleteProduct(product._id);
      console.log(success);
      if (success) {
      } else {
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert(`Error1: ${error}`);
    }
  };

  const handleUpdate = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full rounded-md bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.imageUrl}
        className="w-full h-40 object-cover"
      />
      <div className="p-3 flex flex-col">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <span className="mb-2">${product.price}</span>
        <div className="flex items-center gap-2 mb-2">
          <button
            className="p-2 rounded-md hover:bg-orange-400 bg-orange-500  cursor-pointer text-white"
            onClick={handleUpdate}
          >
            <Pencil size={17} />
          </button>
          <button
            className="p-2 rounded-md hover:bg-red-400 bg-red-500 cursor-pointer text-white"
            onClick={handleDelete}
          >
            <Trash size={17} />
          </button>
        </div>
      </div>

      <EditDialog
        closeDialog={() => setIsOpen(false)}
        isOpen={isOpen}
        product={product}
      />
    </div>
  );
};

export default Card;
