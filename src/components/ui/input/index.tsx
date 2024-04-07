type propsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disable?: boolean;
  className?: string;
  id?: string;
  onChange?: () => void;
};
function Input(props: propsTypes) {
  const {
    onChange,
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disable,
    className,
    id,
  } = props;
  return (
    <div className={`flex flex-col ${className} h-7 `}>
      {label && <label htmlFor={name}></label>}
      {label}
      <input
        onSubmit={onChange}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disable}
        className={`border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 ${className}`}
      />
    </div>
  );
}

export default Input;
