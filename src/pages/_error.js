import React from "react";
import racoon from "@/../../public/404Meme/pedro-raccoon-raccoon.gif";
import pcRacoon from "@/../../public/404Meme/pedro.jpg";
import Image from "next/image";

function Error({ statusCode }) {
  return (
    <div className="text-center  h-screen">
      {statusCode ? (
        <div
          className="text-center flex flex-wrap justify-center items-center p-5 m-5 gap-8 text-white"
          style={{
            backgroundImage: `url(${pcRacoon.src})`,
            backgroundRepeat: "repeat",
          }}
        >
          <h1 className="text-5xl font-bold uppercase">
            {`HEHEHE Kode ${statusCode} banh halaman belum dibikin lagi `}
          </h1>

          <Image src={racoon} alt="PedroRacoon" width={400} height={400} />
        </div>
      ) : (
        <div>
          <h3>An error occurred on client</h3>
        </div>
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
