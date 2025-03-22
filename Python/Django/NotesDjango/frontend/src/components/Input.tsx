import { ChangeEvent } from "react"

interface InputProps {
    name: string,
    type: "password" | "text" | "email" | "url",
    placeholder: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Input = (props: InputProps) => {
  return (
    <input 
        name={props.name}
        type={props.type} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="bg-neutral-800 border border-neutral-700 p-2 w-full outline-none text-neutral-300 shadow-sm focus:shadow-neutral-700"
        required
    />
  )
}

export default Input