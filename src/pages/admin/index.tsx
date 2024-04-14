import Loader from "@/components/fragment/loader";
import DashboardAdminView from "@/components/views/admin/dashboard";
import dosenService from "@/services/dosen";
import productService from "@/services/product";
import { useEffect, useState } from "react";

function AdminPage() {
  const [dosens, setDosens] = useState([]);
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const getAlldosens = async () => {
      const { data } = await dosenService.getAllDosens();
      setDosens(data.data);
    };
    getAlldosens();
  }, []);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productService.getAllProduct();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);
  useEffect(() => {
    const getAllData = async () => {
      const dosenData = await dosenService.getAllDosens();
      const productData = await productService.getAllProduct();
      setAllData(dosenData.data.data.concat(productData.data.data));
    };
    getAllData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader loaderColor="#C08B5C" />
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
