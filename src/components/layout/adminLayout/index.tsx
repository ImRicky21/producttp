import Sidebar from "@/components/fragment/sidebar";
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
  { title: "News", url: "/admin/products", icon: "bxs-box" },
  { title: "Dosen", url: "/admin/dosens", icon: "BsFillPeopleFill" },
  { title: "Users", url: "/admin/users", icon: "bxs-box" },
];
function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div className="flex flex-row gap-11">
      <Sidebar lists={listSideBar} />
      <div className="max-w-full mx-4 px-2">{children}</div>
    </div>
  );
}

export default AdminLayout;
