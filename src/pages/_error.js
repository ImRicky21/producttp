import React from "react";
import racoon from "@/../../public/404Meme/pedro-raccoon-raccoon.gif";
import pcRacoon from "@/../../public/404Meme/pedro.jpg";
import Image from "next/image";
import Head from "next/head";

function Error({ statusCode }) {
  return (
    <>
      <div className="text-center  h-screen">
        {statusCode ? (
          <div className="text-center flex flex-wrap justify-center items-center p-5 m-5 gap-8 text-white">
            <Image
              loading="lazy"
              src={pcRacoon}
              alt="PedroRacoon"
              width={800}
              height={800}
              className="hidden md:block absolute top-5 pt-8"
            />
            <h1 className="text-5xl font-bold text-teal-400 uppercase z-30">
              {`HEHEHE Kode ${statusCode} halaman sedang diperbaiki`}
            </h1>

            <Image
              loading="lazy"
              src={racoon}
              alt="PedroRacoon"
              width={800}
              height={800}
              className="md:hidden"
            />
          </div>
        ) : (
          <div>
            <h3>An error occurred on client</h3>
          </div>
        )}
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
