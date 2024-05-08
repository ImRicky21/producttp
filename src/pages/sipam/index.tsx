import SipamView from "@/components/views/sipam";
import sipamService from "@/services/sipam";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function SipamPage() {
  const [sipams, setSipams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await sipamService.getAllSipam();
      setSipams(data.data);
      setIsLoading(false);
    };
    getAlldosens();
  }, []);
  console.log(sipams);
  return (
    <>
      <Head>
        <title>SIPAM</title>
      </Head>
      <div className="">
        <h3>Sistem Informasi</h3>
      </div>
      <SipamView sipams={sipams} />
    </>
  );
}
