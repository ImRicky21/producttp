type Option = {
  label: string;
  value: string;
};
type propsTypes = {
  label?: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  disable?: boolean;
  className?: string;
};
const Select = (props: propsTypes) => {
  const { label, name, defaultValue, disable, className, options } = props;
  return (
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disable}
        className={`border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 ${className}`}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label} className={className}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
