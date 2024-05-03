import Link from "next/link";

type Propstypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText: string;
};
function AuthLayout(props: Propstypes) {
  const { error, title, children, link, linkText } = props;
  return (
    <div className="flex flex-col gap-4 items-center p-4 m-6 border-2 ">
      <h1>{title}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>{children}</div>

      <div>
        <Link href={link} className="bg-teal-400 px-3 rounded-lg">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default AuthLayout;
