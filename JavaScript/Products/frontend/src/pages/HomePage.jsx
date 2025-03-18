import React, { useEffect } from "react";
import { useProducts } from "../context/products";
import { ShoppingCart } from "lucide-react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const { success, message } = await getProducts();
      console.log("Message:", message);
    };
    fetchProducts();
  }, []);

  return (
    <div className="">
      <span className="flex text-3xl font-semibold items-center gap-4 mb-10">
        Recent Products <ShoppingCart size={30} />
      </span>
      {products ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-3 gap-3 pb-4">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            No Products yet. <Link to="/create">Create One!</Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default HomePage;
