import { useState } from "react";

interface InputFileProps {
  title: string;
  id: string;
  type: string;
  className?: string;
  label?: string;
  name: string;
  setUploadedImage: (file: File | null) => void;
  uploadedImage: File | null;
}

const InputPhotoDosen: React.FC<InputFileProps> = ({
  title,
  id,
  type,
  className,
  label,
  name,
  setUploadedImage,
  uploadedImage,
}) => {
  const [resolutionWarning, setResolutionWarning] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 800 || img.height < 600) {
          setResolutionWarning("Resolution too low. Minimum 800x600 required.");
          setUploadedImage(null);
        } else {
          setResolutionWarning("");
          setUploadedImage(file);
        }
      };
    }
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1"
      />
      {resolutionWarning && <p className="text-red-500">{resolutionWarning}</p>}
    </div>
  );
};

export default InputPhotoDosen;
