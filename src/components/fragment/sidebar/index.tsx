import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  return (
    <div className="flex flex-col justify-between font-medium min-h-screen w-64 bg-black text-white">
      <div className="flex flex-col gap-4 w-full py-4 ">
        <h1 className="text-center text-2xl font-bold top-0 ">Admin Panel</h1>
        {lists.map((list, index) => (
          <Link
            href={list.url}
            key={list.title}
            className={`transition ease-in-out duration-300  ${"hover:bg-slate-300 p-3 mx-2 py-3 rounded-lg"} ${
              pathname === list.url ? "bg-slate-300 text-black" : ""
            } `}
          >
            <i className={`bx ${list.icon}`} />

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
