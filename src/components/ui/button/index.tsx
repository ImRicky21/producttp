type propsTypes = {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  className?: string;
  href?: string;
};
export default function Button(props: propsTypes) {
  const { type, children, onClick, variant, className, href } = props;
  return (
    <button type={type} onClick={onClick} className={`${className} ${variant}`}>
      {children}
    </button>
  );
}
