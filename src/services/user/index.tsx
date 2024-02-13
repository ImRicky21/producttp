import instace from "@/lib/axios/instance";

const userService = {
  getAllUser: () => instace.get("/api/user"),
  updateUser: (id: string, data: any, token: string) =>
    instace.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instace.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userService;
