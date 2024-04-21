import Sidebar from "@/components/fragment/sidebar";
import { url } from "inspector";
import { title } from "process";
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
];
function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div
      className="flex flex-row gap-11
    "
    >
      <Sidebar lists={listSideBar} />
      <div className="max-w-full mx-4 px-2">{children}</div>
    </div>
  );
}

export default AdminLayout;
