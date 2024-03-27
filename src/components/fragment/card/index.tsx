type PropsType = {
  children: React.ReactNode;
  classname?: string;
};
export default function Card(props: PropsType) {
  const { children } = props;

  return (
    <>
      <div className="p-3 border flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 transition ease-in-out max-w-sm border-gray-200 rounded-lg shadow ">
        {children}
      </div>
    </>
  );
}
