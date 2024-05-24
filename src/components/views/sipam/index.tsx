import Card from "@/components/fragment/card";
import Button from "@/components/ui/button";
import sipamService from "@/services/sipam";
import { Sipam } from "@/types/sipam.type";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type PropsTypes = {
  sipams: Sipam[];
};
export default function SipamView(props: PropsTypes) {
  const { sipams } = props;
  const [sipamData, setSipamData] = useState<Sipam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const getAllSipam = async () => {
      const { data } = await sipamService.getAllSipam();
      setSipamData(data.data);
      setIsLoading(false);
    };
    getAllSipam();
  }, [sipams]);
  useEffect(() => {
    setHasAnimated(false);
  }, [sipams]);
  console.log(sipamData);
  return (
    <>
      <div
        className=" flex flex-wrap justify-center align-middle items-center"
        data-aos="fade-up"
      >
        {sipamData.map((sipam, index) => (
          <Link
            data-aos="fade-up"
            data-aos-delay={index * 100}
            href={`${sipam.link}`}
            target="_blank"
            key={sipam.id}
            className=" transition w-72 ease-in-out text-center text-white bg-sky-400 m-6 p-5 rounded-md hover:bg-teal-400 hover:shadow-xl hover:transform  "
          >
            <h3 className="font-semibold">{sipam.title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
