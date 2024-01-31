import Sidebar from "@/components/fragment/sidebar";
type Propstypes = {
  children: React.ReactNode;
};

const listSideBar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  { title: "Products", url: "/admin/product", icon: "bxs-box" },
];
function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSideBar} />
      {children}
    </div>
  );
}

export default AdminLayout;
