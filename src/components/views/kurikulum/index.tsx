import Button from "@/components/ui/button";

export default function KurikulumView() {
  const kurikulum = [
    {
      title: "Kurikulum 2014",
      url: "https://drive.google.com/file/d/1aaBMkM-k26CSbRvOsSVSszHKqkoriGeE/preview",
    },
    {
      title: "Kurikulum 2017",
      url: "https://drive.google.com/file/d/1vNEAw5-1Lzequkh37rEKsZkr0KGa0n3F/preview",
    },
    {
      title: "Kurikulum 2020",
      url: "https://drive.google.com/file/d/1jo3z6J6R2l4enuvOUa8OBD1mM9cAWaEk/preview",
    },
  ];

  return (
    <div className="flex gap-8 p-3 flex-wrap justify-center">
      {kurikulum.map((kurikulum, index) => (
        <div key={index}>
          <Button
            type="button"
            onClick={() => window.open(kurikulum.url, "_blank")}
            className="text-center w-full text-xl uppercase font-bold"
          >
            {kurikulum.title}
          </Button>
          <iframe src={kurikulum.url} width={500} height={600} />
        </div>
      ))}
    </div>
  );
}
