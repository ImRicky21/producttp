import Button from "@/components/ui/button";
import Link from "next/link";

export default function VideoProfileSection() {
  const data = [{ Mahasiswa: 325 }, { Dosen: 8 }, { Tendik: 2 }];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-8 p-5 items-center">
        <div
          className="md:[height:400px] md:[width:1800px] m-3 p-4 bg-sky-400 rounded-lg"
          data-aos="fade-up"
        >
          <iframe
            className=" md:w-full md:h-full self-center rounded-md"
            src="https://www.youtube.com/embed/w6CeGZAeyA0"
            title="VIDEO PROFIL PROGRAM STUDI TEKNOLOGI PENDIDIKAN FKIP ULM 2024"
          ></iframe>
        </div>
        <div className="m-3 p-3" data-aos="fade-up" data-aos-delay="300 ">
          <div className="flex flex-col gap-5 w-full ">
            <div className="text-lg flex flex-col gap-5 border-4 border-solid border-sky-400 m-5 p-4 rounded-lg">
              <h2 className="text-3xl font-bold uppercase text-teal-400">
                Profil program studi teknologi pendidikan
              </h2>
              <p className="text-justify">
                Program Studi Teknologi Pendidikan merupakan Program Studi
                (Prodi) yang ditunjuk oleh Kemenristekdikti yang dalam
                penyelenggaraannya dituntut untuk dapat berinovasi dalam dunia
                pendidikan dan mengimbangi era distruptive saat ini.
              </p>
              <div>
                <Link href="/identitas-prodi">
                  <Button
                    type="button"
                    className="border-4 border-solid  hover:border-sky-500 text-sky-500 font-bold p-2 rounded-lg transition-all border-teal-300"
                  >
                    selengkapnya
                  </Button>
                </Link>
              </div>
              <div>
                <div className=" text-lg font-bold text-center uppercase grid md:grid-cols-3">
                  {data.map((item: any) => {
                    const category = Object.keys(item)[0];
                    const value = item[category];
                    return (
                      <div key={category}>
                        <h2 className="text-3xl font-bold text-sky-700">
                          {value}
                        </h2>
                        <h2 className="text-3xl font-extrabold text-teal-400">
                          {category}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
