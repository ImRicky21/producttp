import TracerStudy from "@/components/views/survei/surveiTracerStudy";
import Head from "next/head";
import Link from "next/link";

export default function TracerStudyPage() {
  return (
    <>
      <Head>
        <title>Survei Tracer Study</title>
      </Head>
      <main>
        <div>
          <div className="mt-10 text-center">
            <h1 className="text-center text-3xl text-teal-400 font-bold">
              Survei Tracer Study
            </h1>
            <Link
              href="https://tracerstudy.ulm.ac.id/"
              className="text-sky-400 hover:font-semibold border-b-2 hover:border-sky-400 ease-in-out duration-300 "
            >
              klik disini untuk mengisi Tracer Study
            </Link>
          </div>
          <div>
            <TracerStudy />
          </div>
        </div>
      </main>
    </>
  );
}
