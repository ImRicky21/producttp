export default function SurveiVisiMisiPdfView(props: any) {
  return (
    <>
      <div className="container mx-auto p-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-center">
          <div>
            <div>
              <h2 className="text-3xl text-teal-300 m-5 p-2 font-semibold">
                - 2021 -
              </h2>
            </div>
            <div>
              <iframe
                src="https://drive.google.com/file/d/1DYDB7D0cFanzK4wtknUVcvZKl7p0_VRz/preview"
                className="w-full h-96 md:h-[calc(100vh)]"
                allow="autoplay"
              ></iframe>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-3xl text-teal-300 m-5 p-2 font-semibold">
                - 2022 -
              </h2>
            </div>
            <div>
              <iframe
                src="https://drive.google.com/file/d/1e-FAMl7wh8Te2Pv3rDbqXZg2VA069fsp/preview"
                className="w-full h-96 md:h-[calc(100vh)]"
                allow="autoplay"
              ></iframe>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-3xl text-teal-300 m-5 p-2 font-semibold">
                - 2023 -
              </h2>
            </div>
            <div>
              <iframe
                src="https://drive.google.com/file/d/1iCA7A5QfMLyublklb3n-ViqgRp0YFX5h/preview"
                className="w-full h-96 md:h-[calc(100vh)]"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
