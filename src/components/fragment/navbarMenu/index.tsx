import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    sub?: Array<{
      title: string;
      url: string;
    }>;
  }>;
};

export default function NavbarMenu(props: Propstypes) {
  const { lists } = props;
  return (
    <>
      <nav className="flex justify-between p-1 m-4 sticky">
        <div>Image</div>
        <div className="flex gap-9 mx-4">
          {lists.map((list) => (
            <ul key={list.title}>
              <li className="group px-1 ">
                <Link href={list.url}>{list.title}</Link>
                {list.sub && list.sub.length > 0 && (
                  <ul className="hidden group-hover:block absolute z-50">
                    {list.sub.map((sub) => (
                      <li
                        key={sub.title}
                        className="p-1 hover:bg-slate-200 m-1 transition-all ease-in-out"
                      >
                        <Link href={sub.url}>{sub.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          ))}
        </div>
      </nav>
    </>
  );
}
