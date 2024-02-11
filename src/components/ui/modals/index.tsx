import { Dispatch, useEffect, useRef } from "react";

type PropsTypes = {
  children: React.ReactNode;
  name?: string;
  onClick?: Function;
  placeholder?: string;
  label?: string;
  className?: string;
  onClose: any;
};
export function Modal(props: PropsTypes) {
  const { children, name, label, onClick, placeholder, className, onClose } =
    props;
  const ref: any = useRef();
  useEffect(() => {
    const handlerClickOut = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handlerClickOut);
    return () => {
      document.removeEventListener("mousedown", handlerClickOut);
    };
  }, [onClose]);
  return (
    <div className={className}>
      <div
        className="flex flex-col justify-center items-center border-yellow-200"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
