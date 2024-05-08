export default function VisiKeilmuanView() {
  return (
    <>
      <div className="flex flex-wrap w-full justify-center gap-11">
        <div className="grid md:grid-cols-2 gap-2 p-7">
          <div className="" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-3xl font-bold uppercase text-center m-5 text-teal-400">
              Visi Keilmuan
            </h2>
            <p className="text-justify m-3 text-lg">
              Mengembangkan pembelajaran dan Riset yang terkemuka untuk
              menghasilkan teknolog pendidikan yang mampu mengembangkan,
              memanfaatkan dan mengelola proses dan sumber teknologi pendidikan
              yang berwawasan lingkungan lahan basah.
            </p>
          </div>
          <div
            className="flex flex-col flex-wrap m-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="text-3xl font-bold uppercase text-center text-teal-400">
              Tujuan Program
            </h2>
            <ul className="list-decimal text-justify text-lg">
              <li>
                Menghasilkan teknolog pendidikan yang mampu melakukan kajian
                teori dan praktek etis bidang teknologi pendidikan dalam rangka
                memfasilitasi pembelajaran dan meningkatkan kinerja.
              </li>
              <li>
                Menghasilkan penelitian dan pengembangan dalam teori, model,
                konsep, prinsip pembelajaran, dan sumber teknologi yang sesuai
                dengan wawasan lingkungan lahan basah.
              </li>
              <li>
                Menghasilkan pengabdian masyarakat dengan menerapkan hasil
                kajian teori dan praktek bidang teknologi pendidikan dalam
                rangka memfasilitasi pembelajaran dan meningkatkan kinerja.
              </li>
              <li>
                Menjalin kerjasama dalam bidang pendidikan dan pelatihan,
                penelitian, serta pengabdian kepada masyarakat dengan PTN/PTS di
                dalam dan di luar negeri, instansi-instansi pemerintah, dunia
                usaha, dan industri, serta lembaga- lembaga kemasyarakatan
                lainnya.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
