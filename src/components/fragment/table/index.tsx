import Image from "next/image";

type PropsTypes = {
  children: React.ReactNode;
  classname?: string;
};
export default function Table(data: any, props: PropsTypes) {
  const { children, classname } = props;
  return (
    <>
      <div>
        <h1>table</h1>
        <table className="table-row">
          <thead>{children}</thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}
