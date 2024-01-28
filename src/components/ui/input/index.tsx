type propsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};
function Input(props: propsTypes) {
  const { label, name, type, placeholder } = props;
  return (
    <div className="grid grid-cols-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 "
      />
    </div>
  );
}

export default Input;
