import KurikulumView from "@/components/views/kurikulum";
import Head from "next/head";

export default function KurikulumPage() {
  return (
    <>
      <Head>
        <title>Kurikulum</title>
      </Head>
      <div className="p-10 m-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-teal-400 uppercase">
          Kurikulum
        </h1>
        <div className="flex justify-center">
          <KurikulumView />
        </div>
      </div>
    </>
  );
}
