import React from "react";

interface InputProps {
    type: "text" | "email" | "password";
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    return <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="p-2 bg-stone-800 border border-stone-600 rounded-md outline-none focus:border-stone-500"
    />
}