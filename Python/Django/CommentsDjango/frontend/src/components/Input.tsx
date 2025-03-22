interface InputParams {
  name: string;
  type: "text" | "url" | "email";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputParams) => {
  return (
    <input
      name={props.name}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className="p-3 rounded-md outline-none bg-white border border-neutral-200 focus:border-neutral-400"
    />
  );
};

export default Input;
