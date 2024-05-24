import Link from "next/link";

export default function MbkmView() {
  const data = [
    {
      title: "Kampus Mengajar",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/mengajar",
    },
    {
      title: "Magang MSIB",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/magang/detail",
    },
    {
      title: "Studi Independen",
      link: "https://kampusmerdeka.kemdikbud.go.id/program/studi-independen/detail",
    },
    {
      title: "Pertukaran Mahasiswa Merdeka",
      link: "https://pmm.kampusmerdeka.kemdikbud.go.id/pages/info/program/pmm_4/",
    },
    {
      title: "Wirausaha Merdeka",
      link: "https://wirausahamerdeka.kampusmerdeka.kemdikbud.go.id/info/",
    },
    {
      title: "Indonesian International Student Mobility Awards ",
      link: "https://iisma.kemdikbud.go.id/",
    },
    {
      title: "Praktisi Mengajar",
      link: "https://praktisimengajar.kampusmerdeka.kemdikbud.go.id/",
    },
    {
      title: "Bangkit By Google, GOTO, and Traveloka",
      link: "https://grow.google/intl/id_id/bangkit/?tab=machine-learning",
    },
    {
      title: "Indonesia Cyber Education Institute",
      link: "https://icei.ac.id/",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 align-middle justify-center justify-items-center ">
      {data.map((item) => (
        <div key={item.title} className="bg-sky-400 m-2 rounded-sm">
          <Link href={item.link} className=" text-white p-5">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
