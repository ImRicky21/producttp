import { Dispatch, SetStateAction } from "react";

type PropsType = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disable?: boolean;
  title: string;
  className?: string;
  id?: string;
  onChange?: (event: any) => void;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  uploadedImage: File | null;
};
function InputFile(props: PropsType) {
  const {
    label,
    name,
    type,
    placeholder,
    className,
    title,
    uploadedImage,
    setUploadedImage,
  } = props;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="text-center align-middle">
          {uploadedImage?.name ? <p>{uploadedImage?.name}</p> : <>{title}</>}
        </label>
      )}
      <input
        className={`${className} h-10 w-full border border-gray-100 rounded-md none hidden text-center align-middle`}
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        onChange={(event: any) => {
          event.preventDefault();
          setUploadedImage(event.currentTarget.files[0]);
        }}
      />
    </div>
  );
}

export default InputFile;
