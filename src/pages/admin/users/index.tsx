import UserAdminView from "@/components/views/admin/users";
import userService from "@/services/user";
import { useEffect, useState } from "react";

function AdminUserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userService.getAllUser();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <UserAdminView users={users} />
    </>
  );
}

export default AdminUserPage;
