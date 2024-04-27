import Image from "next/image";
import logoTp from "../../../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png";

export default function ProfileView() {
  return (
    <div className="flex flex-col  m-4 justify-between gap-12">
      <div>
        <h1 className=" text-center font-bold text-2xl mt-9 uppercase">
          Latar Belakang
        </h1>
      </div>
      <div className="flex justify-center">
        <Image src={logoTp} alt="latarbelakang" width={400} height={400} />
      </div>
      <div className="text-justify grid grid-cols-1 gap-8 mx-8 p-4 text-lg ">
        <p>
          Perkembangan ilmu pengetahuan dan teknologi akhir-akhir ini semakin
          massive atau tak terbendung lagi sejalan dengan ditandainya Revolusi
          Industri 4.0. Perubahan-perubahan yang diterima oleh seluruh aspek
          kehidupan manusia sangatlah radikal, bebas, dan tak terarah/terukur,
          sehingga dunia pendidikan perlu dituntut untuk dapat berinovasi dalam
          mengimbangi era distruptive ini. Distruftif Innovation merupakan
          sesuatu yang menggeser teknologi yang telah mapan dan menggoyangkan
          industri atau produk yang kemudian melahirkan generasi industri baru
          4.0 atau generasi millenial ( Zaman Now). Fenomena itu kini semakin
          dirasakan oleh banyak orang dan menjadi fenomena yang bersifat global.
          Distruptive Innovation teknologi telah melanda hampir ke semua bidang
          kehidupan manusia, termasuk dalam dunia pendidikan (Clayton, M
          Christensen, 1997).
        </p>
        <p>
          Program Studi Teknologi Pendidikan merupakan Program Studi (Prodi)
          yang ditunjuk oleh Kemenristekdikti yang dalam penyelenggaraannya
          dituntut untuk dapat berinovasi dalam dunia pendidikan dan mengimbangi
          era distruptive saat ini. Prodi ini mengkaji Dasar-Dasar Ilmu
          Pendidikan dan Pembelajaran (Pedagogik & Androgogik), ISD
          (Instructional System Design), seperti Pengembangan Kurikulum dan
          Manajemen Diklat, Pengembangan Teknologi Pembelajaran dan Pengembangan
          Teknologi Kinerja, Wawasan Teknologi Pendidikan dalam mengimbangi era
          distruptive ini, tidak hanya sebatas materi/teoritis saja, akan tetapi
          adanya praktik etis dalam memfasilitasi proses pembelajaran dan
          memanfaatkan dan mengelola sumber-sumber belajar dan proses teknologi
          pembelajaran yang sesuai atau tepat guna.
        </p>
      </div>
    </div>
  );
}
