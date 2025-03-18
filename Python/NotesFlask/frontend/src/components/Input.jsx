import React from "react";

const Input = ({ name, type, placeholder, value, onChange, required }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="p-2 rounded-md outline-none border border-neutral-700 hover:border-neutral-600 focus:border-neutral-600"
    />
  );
};

export default Input;
