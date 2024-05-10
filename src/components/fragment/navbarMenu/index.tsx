import Link from "next/link";
import { useEffect, useState } from "react";
import tekpend from "@/../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png";
import Image from "next/image";
import BannerTP from "@/../../public/icon/tekepnd-banner.png";
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
    <nav
      className={`flex justify-between ${
        isOpen ? "" : " items-center "
      } px-5 sticky top-0 z-50 bg-slate-200 transition-all ease-in-out ${
        isScrolled ? "bg-opacity-80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className=" p-3">
        {
          <Link href={"/"} className="md:hidden">
            <Image src={tekpend} alt="logo" width={50} height={50} />
          </Link>
        }
        {
          <Link href={"/"} className="hidden md:block">
            <Image src={BannerTP} alt="logo" width={350} height={350} />
          </Link>
        }
      </div>
      <div
        className={`md:flex md:flex-row justify-center align-middle justify-items-center top-0 text-center ${
          !isOpen ? "hidden" : "flex flex-col relative"
        }`}
      >
        {lists.map((list, index) => (
          <ul
            className="text-center items-center flex justify-center "
            key={list.id}
          >
            <li
              className="group mx-3 p-2"
              data-aos={hasAnimated ? "" : "fade-up"}
              data-aos-delay={`${index * 50}`}
            >
              <Link className="text-center " href={list.url}>
                {list.title}
              </Link>
              {list.sub && list.sub.length > 0 && (
                <ul className=" z-50 bg-slate-100 shadow-md md:absolute hidden group-hover:flex-col group-hover:flex justify-center rounded-lg p-2">
                  {list.sub.map((sub) => (
                    <li
                      key={sub.title}
                      className="pb-3 hover:bg-slate-200 text-center transition-all ease-in-out rounded-md items-center"
                    >
                      <Link className="px-5 py-2" href={sub.url}>
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
          className={`w-8 h-1 bg-black rounded-full m-1 transition ${
            !isOpen ? "origin-bottom-left" : "my-2 opacity-0 "
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-black m-1 rounded-full transition ${
            !isOpen ? "origin-bottom-left" : "origin-bottom-left -rotate-45"
          }`}
        ></div>
      </div>
    </nav>
  );
}
