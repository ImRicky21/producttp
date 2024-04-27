import Link from "next/link";
import { useEffect, useState } from "react";

type Propstypes = {
  lists: Array<{
    id: number;
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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsSrcolled] = useState(false);
  useEffect(() => {
    function handleScrolled() {
      const scrollTop = window.scrollY;
      const scrollTreshold = 50;
      setIsSrcolled(scrollTop > scrollTreshold);
    }
    window.addEventListener("scroll", handleScrolled);
    return () => {
      window.removeEventListener("scroll", handleScrolled);
    };
  }, []);
  return (
    <>
      <nav
        className={` flex w-full gap-8 justify-between p-3 mt-1 sticky top-0 z-50 transition-all ease-in-out ${
          isScrolled ? "bg-opacity-80 backdrop-blur-md shadow-md" : ""
        }`}
      >
        <div>Image</div>
        <div
          className={`md:flex md:flex-row justify-end p-1 top-0  ${
            !isOpen ? "hidden" : "flex flex-col"
          }`}
        >
          {lists.map((list) => (
            <ul key={list.id}>
              <li className="group text-center mx-4 ">
                <Link className="md:p-7" href={list.url}>
                  {list.title}
                </Link>
                {list.sub && list.sub.length > 0 && (
                  <ul className=" z-50 bg-slate-100 shadow-md md:absolute hidden group-hover:block justify-center rounded-lg">
                    {list.sub.map((sub) => (
                      <li
                        key={sub.title}
                        className="pb-3 hover:bg-slate-200 m-2 px-2 transition-all ease-in-out rounded-md items-center"
                      >
                        <Link className="p-3" href={sub.url}>
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          ))}
        </div>
        <div
          className="cursor-pointer md:hidden "
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-8 h-1 bg-black m-1 rounded-full transition ${
              !isOpen
                ? "origin-bottom-left rotate-0"
                : "origin-bottom-left rotate-45"
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-black rounded-full transition ${
              !isOpen ? "origin-bottom-left" : "opacity-0 m-1"
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-black m-1 rounded-full transition ${
              !isOpen ? "origin-bottom-left" : "origin-bottom-left -rotate-45"
            }`}
          ></div>
        </div>
      </nav>
    </>
  );
}
