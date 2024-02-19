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
  { title: "News", url: "/admin/news", icon: "bxs-box" },
  { title: "Users", url: "/admin/users", icon: "bxs-box" },
];
function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSideBar} />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default AdminLayout;
