import React from "react";

interface InputProps {
    type: "text" | "email" | "password";
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    return <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="outline-none w-full rounded-md bg-amber-100 text-lg p-2 border border-amber-300 focus:border-amber-600"
    />
}