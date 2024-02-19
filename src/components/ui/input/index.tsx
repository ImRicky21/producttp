type propsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disable?: boolean;
  className?: string;
  id?: string;
};
function Input(props: propsTypes) {
  const {
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
    <div className="grid grid-cols-1 gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
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
