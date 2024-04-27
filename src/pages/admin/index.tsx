import Loader from "@/components/fragment/loader";
import DashboardAdminView from "@/components/views/admin/dashboard";
import dosenService from "@/services/dosen";
import productService from "@/services/product";
import { useEffect, useState } from "react";

function AdminPage() {
  const [dosens, setDosens] = useState([]);
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await dosenService.getAllDosens();
      setDosens(data.data);
      setIsLoading(false);
    };
    getAlldosens();
  }, []);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productService.getAllProduct();
      setProducts(data.data);
      setIsLoading(false);
    };
    getAllProducts();
  }, []);
  useEffect(() => {
    const getAllData = async () => {
      const dosenData = await dosenService.getAllDosens();
      const productData = await productService.getAllProduct();
      setAllData(dosenData.data.data.concat(productData.data.data));
      setIsLoading(false);
    };
    getAllData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="mt-20 flex justify-center items-center w-screen h-screen">
          <h1>Sedang Memuat...</h1>
          <Loader
            loaderColor="#C08B5C"
            className="mt-20 flex justify-center items-center w-screen h-screen"
          />
        </div>
      ) : (
        <DashboardAdminView
          dosens={dosens}
          products={products}
          allData={allData}
        />
      )}
    </>
  );
}

export default AdminPage;
