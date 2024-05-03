import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
type PropsType = {
  children?: React.ReactNode;
  title: string;
  form?: any;
};
export default function Accordion(props: PropsType) {
  const { children, title, form } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded">
      <div
        className="flex justify-between items-center cursor-pointer transition-all ease-in-out duration-300 px-9 m-1 uppercase "
        onClick={toggleAccordion}
      >
        <div>{title}</div>
        <div className="transform transition-transform ">
          {isOpen ? <FaMinus /> : <FaPlus className="text-lg" />}
        </div>
      </div>
      {isOpen && (
        <div className="overflow-hidden transition-height ease-in-out duration-300">
          <div className="py-9 bg-gray-100">{children}</div>
        </div>
      )}
    </div>
  );
}
