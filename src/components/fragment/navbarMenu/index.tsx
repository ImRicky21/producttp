import Link from "next/link";
import { useEffect, useState } from "react";
import tekpend from "@/../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png";
import Image from "next/image";

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
  const [hasAnimated, setHasAnimated] = useState(false);

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
  useEffect(() => {
    setHasAnimated(true);
  }, [lists]);
  return (
    <>
      <nav
        className={` flex w-screen gap-8 justify-between py-3 px-5 mt-1 sticky top-0 z-50 bg-slate-200 transition-all ease-in-out ${
          isScrolled ? "bg-opacity-80 backdrop-blur-md shadow-md" : ""
        }`}
      >
        <div className="px-3">
          {
            <Link href={"/"}>
              <Image src={tekpend} alt="logo" width={50} height={50} />
            </Link>
          }
        </div>
        <div
          className={`md:flex md:flex-row justify-end justify-items-center p-1 top-0  ${
            !isOpen ? "hidden" : "flex flex-col"
          }`}
        >
          {lists.map((list, index) => (
            <ul key={list.id}>
              <li
                className="group text-center mx-5"
                data-aos={hasAnimated ? "" : "fade-up"}
                data-aos-delay={`${index * 50}`}
              >
                <Link className="md:" href={list.url}>
                  {list.title}
                </Link>
                {list.sub && list.sub.length > 0 && (
                  <ul className=" z-50 bg-slate-100 shadow-md md:absolute hidden group-hover:block justify-center rounded-lg">
                    {list.sub.map((sub) => (
                      <li
                        key={sub.title}
                        className="pb-3 hover:bg-slate-200 m-2 text-center transition-all ease-in-out rounded-md items-center"
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
