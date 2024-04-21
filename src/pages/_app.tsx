import Footer from "@/components/fragment/footer";
import Navbar from "@/components/fragment/navbar/navbar";
import NavbarMenu from "@/components/fragment/navbarMenu";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const menuNavbar = [
  {
    id: 1,
    title: "Beranda",
    url: "/",
  },
  {
    id: 2,
    title: "Profil",
    url: "/",
    sub: [
      { title: "Identitas Prodi", url: "/identitas-prodi" },
      { title: "Visi Keilmuan Dan Tujuan", url: "/visi-dan-tujuan" },
      { title: "Sertifikat Akreditasi", url: "/sertifikat-akreditasi" },
      { title: "Struktur Organisasi", url: "/struktur-organisasi" },
      { title: "Dosen & Staff", url: "/dosen" },
      { title: "Sarana & Prasarana", url: "/sarana-prasarana" },
    ],
  },
  {
    id: 3,
    title: "Akademik",
    url: "/",
    sub: [
      { title: "Kurikulum", url: "/kurikulum" },
      {
        title: "Kalender Akademik",
        url: "/kalender-akademik",
      },
      {
        title: "SILAMTP",
        url: "/silamtp",
      },
    ],
  },
  {
    id: 4,
    title: "Kemahasiswaan",
    url: "/",
    sub: [
      { title: "MBKM", url: "/mbkm" },
      { title: "Prestasi Mahasiswa", url: "/prestasi-mahasiswa" },
      { title: "Himpunan Mahasiswa", url: "/himpunan-mahasiswa" },
      { title: "Beasiswa", url: "/beasiswa" },
    ],
  },
  {
    id: 5,
    title: "Tri Dharma",
    url: "/",
    sub: [
      {
        title: "Pengabdian",
        url: "/pengabdian",
      },
      { title: "Penelitian", url: "/penelitian" },
      { title: "Kerjasama", url: "/kerjasama" },
      {
        title: "Luaran",
        url: "/luaran",
      },
      { title: "Jurnal", url: "/jurnal" },
    ],
  },
  {
    id: 6,
    title: "Survei",
    url: "/",
    sub: [
      {
        title: "Pemahaman Visi Keilmuan dan Tujuan",
        url: "/visi-dan-tujuan",
      },
      {
        title: "Kepuasan Mahasiswa",
        url: "/kepuasan-mahasiswa",
      },
      {
        title: "Kepuasan Penggunaan Alumni",
        url: "/kepuasan-penggunaan-alumni",
      },
      {
        title: "Tracer Studi",
        url: "/tracer-studi",
      },
      {
        title: "Kepuasan Kerjasama",
        url: "/kepuasan-kerjasama",
      },
    ],
  },
  {
    id: 7,
    title: "Akreditasi",
    url: "/",
    sub: [
      { title: "Dokumen Kebijakan", url: "/dokumen-kebijakan" },
      { title: "AMI", url: "/ami" },
      { title: "GPM", url: "/gpm" },
    ],
  },
];

const disableNavbar = ["auth", "admin"];
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <div className={poppins.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && (
          <>
            <NavbarMenu lists={menuNavbar} />
          </>
        )}
        <Component {...pageProps} />
        {!disableNavbar.includes(pathname.split("/")[1]) && (
          <>
            <Footer />
          </>
        )}
      </div>
    </SessionProvider>
  );
}
