import React from "react";

const Button = ({ children, onClick, variant, type }) => {
  return (
    <button
      className={`px-5 py-2 text-md lg:text-lg rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-700`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
