import Link from "next/link";

type PropsType = {
  children?: React.ReactNode;
  classname?: string;
  link: string;
};
export default function Card(props: PropsType) {
  const { children, link, classname } = props;

  return (
    <>
      <div
        className={`
          cursor-pointer p-3 m-5 border flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 transition ease-in-out max-w-sm border-gray-200 rounded-lg shadow
        ${classname}`}
      >
        {children}
      </div>
    </>
  );
}
