import React from "react";
import CarouselWithChildren from "../../fragment/carouselwtCard";
const KaryaMahasiswa: React.FC = () => {
  const data = [
    { link: "pSPIlX_SLJM?si=fQmWwRGAOgo17Nhf" },
    { link: "ocgyCtmS9fw?si=LzK4PO0werDUejT4" },
    { link: "t9xO9FOsPw0?si=qbGFn2kZockN14g7" },
    { link: "K52N_-fAnfY?si=dpdbzcr43oEk_kxe" },
    { link: "oDvoKl7y81E?si=wfyozXyusgoaOC46" },
    { link: "ue_Te1zH7pg?si=wU8DQvupDQUDwos_" },
    { link: "fC6ITi-Z6zQ?si=BFt8KPUD4x_CI_u7" },
    {
      link: "3ctebwd7d4I?si=IC-9ya4klU6unbTo",
    },
    {
      link: "ZQMREVgrscQ?si=2cK-agyAhS25_VoA",
    },
    {
      link: "4-a38X7FoTM?si=rG9NqGPEJxzkMvqG",
    },
    {
      link: "ENFV8HgETNo?si=eM_XrMl6sxHLwrAj",
    },
    {
      link: "wWgca7VRcno?si=Up4POwKtSPCQuZ_l",
    },
    {
      link: "XFCZTbYK2eg?si=SfqZCjp63e1OD-JA",
    },
  ];
  return (
    <div className="p-4">
      <CarouselWithChildren>
        {data.map((item, index) => {
          // Group items into chunks of 3 for desktop and 2 for mobile
          if (index % 3 === 0) {
            return (
              <div
                key={index}
                className="w-full flex-shrink-0 aspect-video group relative transition ease-in-out duration-300 justify-center align-middle"
              >
                <div className="flex gap-2 border border-solid border-slate-300">
                  {/* Render the current item and the next two items */}
                  {data.slice(index, index + 3).map((subItem, subIndex) => (
                    <iframe
                      key={subIndex}
                      className="w-full md:w-1/2 lg:w-1/3" // Adjust width for responsiveness
                      height="315"
                      src={`https://www.youtube.com/embed/${subItem.link}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </CarouselWithChildren>
    </div>
  );
};

export default KaryaMahasiswa;
