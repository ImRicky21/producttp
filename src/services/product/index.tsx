import instace from "@/lib/axios/instance";

const productService = {
  getAllProduct: () => instace.get("/api/product"),

  addProduct: (data: any, token: string) =>
    instace.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, token: string) =>
    instace.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteProduct: (id: string, token: string) =>
    instace.delete(`/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default productService;
