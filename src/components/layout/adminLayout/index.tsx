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
  {
    title: "Sipam",
    url: "/admin/sipam",
    icon: "bxs-box",
  },
];
function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div
      className="flex flex-row gap-8
    "
    >
      <Sidebar lists={listSideBar} />
      <div className="w-full p-6 m-9">{children}</div>
    </div>
  );
}

export default AdminLayout;
