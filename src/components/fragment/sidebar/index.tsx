import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
function Sidebar(props: Propstypes) {
  const { lists } = props;
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex flex-col font-medium text-white sticky top-0 transition max-h-screen ${
        isOpen ? "w-64 bg-black " : "w-0"
      }`}
      style={{ zIndex: 1000 }}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`text-white m-2 w-min mb-0 ${isOpen ? "w-9" : " "}`}
      >
        <div
          className={`origin-top-left bg-black h-1 rounded-xl m-2 transition ${
            !isOpen
              ? "origin-top-left transition ease-in-out w-9  "
              : " origin-top-left rotate-45 w-9 bg-white"
          }  `}
        ></div>
        <div
          className={`bg-black w-10 h-1 rounded-xl m-2 transition opacity-100${
            !isOpen ? "opacity-0" : "opacity-0 bg-inherit "
          }`}
        ></div>
        <div
          className={`origin-bottom-left bg-black h-1 rounded-xl m-2 transition${
            !isOpen
              ? "origin-bottom-left transition w-9 "
              : " origin-bottom-left -rotate-45 w-9 bg-white"
          }`}
        ></div>
      </Button>
      <div
        className={`flex flex-col gap-4 w-full py-4 transition ${
          isOpen ? "" : "left-100 -translate-x-96"
        }`}
      >
        <h1 className="text-center text-2xl font-bold top-0 ">Admin Panel</h1>
        {lists.map((list, index) => (
          <Link
            href={list.url}
            key={list.title}
            className={`transition ease-in-out duration-300  ${"hover:bg-slate-300 p-3 mx-2 py-3 rounded-lg"} ${
              pathname === list.url ? "bg-slate-300 text-black" : ""
            } `}
          >
            <i className={`${list.icon}`} />

            <h2>{list.title}</h2>
          </Link>
        ))}
        <div className="p-7 text-black ">
          <Button
            type="button"
            onClick={() => signOut()}
            className="bg-white px-5 rounded-lg hover:bg-slate-300 font-semibold w-full"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
