export default function SurveiMahsiswaFormView() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-sky-400 font-bold text-center text-xl sm:text-2xl md:text-3xl">
          Silahkan isi form survei kepuasan mahasiswa berikut ini
        </h1>
        <div className="">
          <div className="">
            <iframe
              style={{ border: "none" }}
              src="https://docs.google.com/forms/d/e/1FAIpQLSfNPSQxSQTf9SowpakVjGRPswg-m7AMDvCaLQRwAhp8_D0lHQ/viewform?embedded=true"
              width="100%"
              height="1080"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
