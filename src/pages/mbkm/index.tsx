import MbkmView from "@/components/views/mbkm";
import Head from "next/head";

export default function MbkmPage() {
  return (
    <>
      <Head>
        <title>MBKM</title>
      </Head>
      <div className="text-center">
        <h1 className="text-teal-400 font-bold text-3xl">MBKM</h1>
      </div>
      <MbkmView />
    </>
  );
}
