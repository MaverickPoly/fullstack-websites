import React from "react";

const Input = ({ placeholder, name, type, onChange, required, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      className="w-full px-3 py-2 bg-neutral-800 outline-none rounded-md border border-neutral-800 focus:border-neutral-700"
      required={required}
    />
  );
};

export default Input;
