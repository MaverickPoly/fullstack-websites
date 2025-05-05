interface ButtonProps {
    text: string;
    type: "submit" | "button";
    variant: "filled" | "outline";
    clasName: string;
    onClick?: () => void;
}

const TypeStyles = {
    "filled": "bg-amber-400 hover:bg-amber-500",
    "outline": "bg-amber-100 hover:bg-amber-400 duration-300 border border-amber-400",
}

export default function Button({text, type, variant, clasName, onClick}: ButtonProps) {
    return <button
        className={`w-full rounded-md text-xl p-2 cursor-pointer ${TypeStyles[variant]}  ${clasName}`}
        type={type}
        onClick={onClick}
    >{text}</button>
}