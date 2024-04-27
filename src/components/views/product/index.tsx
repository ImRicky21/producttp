import Card from "@/components/fragment/card";
import { Products } from "@/types/products.type";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PropsTypes = {
  products: Products[];
};
export default function ProductView(props: PropsTypes) {
  const { products } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginateTable = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <div className="text-center p-10 m-9 grid grid-cols-1 justify-items-center bg-slate-100">
        <div>{products.length}</div>
        <div className="flex flex-wrap gap-9 justify-items-center justify-center ">
          {currentPosts.length > 0 ? (
            productsData
              .filter((product) => product.status !== "draft")
              .map((product) => (
                <Card
                  key={product.id}
                  link={`/product/${product.id}`}
                  classname="text-center justify-center items-center h-96 md:w-4/5 flex p-3 m-6"
                >
                  <div className="flex justify-self-end items-end justify-items-end  ">
                    <h2
                      className={`capitalize text-right self-end ${
                        product.tag !== "berita" ? `bg-teal-300` : `bg-red-500`
                      } px-2 mx-2 rounded-lg`}
                    >
                      {product.tag}
                    </h2>
                  </div>
                  <div className="flex w-5/6 h-5/6 items-center justify-center">
                    <Image
                      src={product.image}
                      width={450}
                      height={450}
                      objectFit="cover"
                      alt={product.title}
                    />
                  </div>
                  <div className="">
                    <h1 className="text-xl capitalize font-bold line-clamp-3 text-white">
                      {product.title}
                    </h1>
                    <p className="text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-col">
                      <p className="text-sm line-clamp-4">
                        {product.createdBy}
                      </p>

                      <p className="text-sm line-clamp-4">
                        {product.date
                          ? product.date
                          : product.createdAt &&
                            new Date(
                              parseInt(product.createdAt)
                            ).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
          ) : (
            <div>tidak ada berita / pengumuman</div>
          )}
        </div>
      </div>
    </>
  );
}
