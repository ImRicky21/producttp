import Sidebar from "@/components/fragment/sidebar";
import { url } from "inspector";
import { useRouter } from "next/router";
import { title } from "process";
import { useEffect, useState } from "react";
type Propstypes = {
  children: React.ReactNode;
  className?: string;
};

const listSideBar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  { title: "Berita", url: "/admin/products", icon: "bxs-box" },
  { title: "Dosen", url: "/admin/dosens", icon: "BsFillPeopleFill" },
  { title: "Users", url: "/admin/users", icon: "bxs-box" },
  {
    title: "Fasilitas",
    url: "/admin/facilities",
    icon: "bxs-box",
  },
  {
    title: "Sipam",
    url: "/admin/sipam",
    icon: "bxs-box",
  },
  {
    title: "Prestasi Mahasiswa",
    url: "/admin/prestasi-mahasiswa",
    icon: "bxs-box",
  },
];

function AdminLayout(props: Propstypes) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <div
      className="flex flex-row gap-8
    "
    >
      <Sidebar lists={listSideBar} />
      <div className="w-full p-6 m-9">
        {isLoading ? "loading tunggu sebentar" : children}
      </div>
    </div>
  );
}

export default AdminLayout;
