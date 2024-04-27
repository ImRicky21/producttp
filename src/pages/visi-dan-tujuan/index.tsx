import VisiKeilmuanView from "@/components/views/visiKeilmuan";
import Head from "next/head";

export default function VisiDanTujuanPage() {
  return (
    <>
      <Head>
        <title>Visi dan Tujuan</title>
      </Head>
      <div>
        <div className=" m-10 p-7 text-center">
          <h1 className="text-3xl uppercase font-bold">visi keilmuan</h1>
          <h3 className="text-2xl">
            Mengembangkan Pembelajaran dan Riset yang terkemuka untuk
            menghasilkan teknolog pendidikan yang mampu mengembangkan,
            memanfaatkan dan mengelola proses dan sumber Teknologi Pendidikan
            yang berwawasan lingkungan lahan basah
          </h3>
          <div className="m-4 p-4 text-justify text-lg">
            <ul className="list-decimal flex gap-3 flex-col">
              <h2 className="text-2xl text-center uppercase font-bold">
                penjelasan
              </h2>
              <li>
                Terkemuka memiliki makna lebih tinggi, mumpuni, dan menunjukkan
                kelebihan dibandingkan yang lainnya. Konteks ini berkaitan
                dengan kualitas penyelenggaraan pendidikan dan pembelajaran
                serta riset yang lebih terarah dan memiliki kelebihan dari sisi
                perencanaan, proses, bentuk evaluasi, dan tindak lanjut dalam
                rangka meningkatkan mutu pendidikan. Terkemuka memiliki atribut
                atau ciri-ciri yang menunjukkan “kelebihan” sesuatu dibandingkan
                yang lainnya. Pemaknaan terhadap manusia unggul yang seperti
                ini, lebih melihat kualitas unggul dalam dimensi teknologi
                pendidikan. Terkemuka merupakan perbandingan ataupun posisi
                relatif sesuatu yang “lebih” dibandingkan dengan yang lainnya,
                terutama pada kelompoknya.
              </li>
              <li>
                Mengembangkan, memanfaatkan, mengelola adalah kualitas seorang
                individu dalam rangka menunjukkan karakteristik tertentu yang
                menjadi representasi positif. Terkhususnya profesional skill
                untuk memenuhi standar profesi yang dibutuhkan oleh program atau
                jabatan khususnya pengembang teknologi pembelajaran.
              </li>
              <li>
                Proses dan sumber teknologi yang dimaksud adalah segala
                pengalaman dan stimulan belajar yang memfasilitasi terjadinya
                proses belajar, rumusan ini konsisten dimasukkan setiap Rumusan
                teknologi pendidikan yang dikeluarkan AECT.
              </li>
              <li>
                Berwawasan lingkungan lahan basah adalah wawasan yang
                berorientasikan kepada kearifan lokal (lahan basah/wetlands;
                daerah air rawa) yang secara geografis dapat dijadikan sebagai
                faktor kekuatan dan peluang prodi dalam mempromosikan dan atau
                mengatasi masalah kearifan lokal berwawasan lingkungan basah
                baik pada tingkat Regional itu sendiri maupun untuk
                mempromosikan dan atau mengatasi masalah yang sama pada tingkat
                Nasional/Internasional. Peletakkan pengetahuan lingkungan lahan
                basah sebagai input dalam pengembangan keilmuan teknologi
                pendidikan. Dalam hal ini usaha memecahkan masalah belajar perlu
                menempatkan lingkungan lahan basah sebagai input dalam kebijakan
                memfasilitasi belajar dan meningkat SDM.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-3xl font-bold uppercase ">tujuan program</h1>
            <ul className="list-decimal text-justify text-lg m-4 p-3 flex gap-3 flex-col">
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
