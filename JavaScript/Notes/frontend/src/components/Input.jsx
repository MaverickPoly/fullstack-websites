import React from "react";

const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-3 rounded-sm border border-neutral-200 bg-white text-lg w-full focus:border-neutral-400 outline-none"
      required
    />
  );
};

export default Input;
