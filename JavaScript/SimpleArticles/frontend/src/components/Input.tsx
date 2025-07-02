import { type ChangeEvent } from "react";

interface InputParams {
  type: "text" | "email" | "password";
  name: string;
  className: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(params: InputParams) {
  return (
    <input
      className={`text-lg rounded-lg p-2 outline-none border border-stone-200 focus:border-stone-400 ${params.className}`}
      name={params.name}
      type={params.type}
      value={params.value}
      placeholder={params.placeholder}
      onChange={params.onChange}
    />
  );
}
