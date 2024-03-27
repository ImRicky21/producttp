import { Dispatch, SetStateAction } from "react";

type PropsType = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disable?: boolean;
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
    uploadedImage,
    setUploadedImage,
  } = props;

  return (
    <div className="grid grid-cols-1 gap-2">
      {label && (
        <label htmlFor={name}>
          {uploadedImage?.name ? (
            <p>{uploadedImage?.name}</p>
          ) : (
            <>Upload Image</>
          )}
        </label>
      )}
      <input
        className={`${className} h-10 w-full border border-gray-300 rounded-md none`}
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
