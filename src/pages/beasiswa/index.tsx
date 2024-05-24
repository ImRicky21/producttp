import BeasiswaView from "@/components/views/beasiswa";
import Head from "next/head";

export default function BeasiswaPage() {
  return (
    <>
      <Head>
        <title>Beasiswa</title>
      </Head>
      <div>
        <BeasiswaView />
      </div>
    </>
  );
}
