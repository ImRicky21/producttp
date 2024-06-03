import { Html, Head, Main, NextScript } from "next/document";
import favicon from "../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="../../public/icon/logo-Teknologi-Pendidikan-FKIP-ULM.png"
        />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect to Google APIs/SDKs */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* Preconnect to YouTube */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link
          rel="preload"
          as="image"
          href="https://firebasestorage.googleapis.com/..."
        />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
