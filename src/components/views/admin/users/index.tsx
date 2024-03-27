import AdminLayout from "@/components/layout/adminLayout";
import Button from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteuser";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Users } from "@/types/users.type";

type PropsTypes = {
  users: Users[];
};

function UserAdminView(props: PropsTypes) {
  const { users } = props;
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 w-full p-4 px-6">
            <h2 className="text-xl text-center font-bold">Admin User Page</h2>
          </div>

          <table className="table-auto p-5 w-full text-center">
            <thead>
              <tr className="border border-slate-600">
                <th className="border border-slate-950">#</th>
                <th className="border border-slate-950">fullname</th>
                <th className="border border-slate-950">email</th>
                <th className="border border-slate-950">phone</th>
                <th className="border border-slate-950">role</th>
                <th className="border border-slate-950">action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr className="odd:bg-slate-50 even:bg-slate-300" key={user.id}>
                  <td className=" border border-slate-600">{index + 1}</td>
                  <td className=" border border-slate-600 text-left pl-2">
                    {user.fullname}
                  </td>
                  <td className=" border border-slate-600">{user.email}</td>
                  <td className=" border border-slate-600">{user.phone}</td>
                  <td className=" border border-slate-600">{user.role}</td>
                  <td className="border border-slate-600 ">
                    <div className="grid grid-cols-2 gap-4 m-3 text-center justify-items-center">
                      <Button
                        className=""
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                      >
                        <FaEdit className="text-sky-600 text-3xl" />
                      </Button>
                      <Button
                        className=""
                        type="button"
                        onClick={() => setDeletedUser(user)}
                      >
                        <FaTrashAlt className="text-red-700 text-3xl" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
}

export default UserAdminView;
