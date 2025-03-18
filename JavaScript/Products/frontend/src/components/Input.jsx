const Input = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 rounded-md outline-none text-lg border border-neutral-200 focus:border-neutral-300 dark:border-neutral-600 dark:focus:border-neutral-500"
    />
  );
};

export default Input;
