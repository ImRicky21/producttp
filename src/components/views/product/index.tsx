import Card from "@/components/fragment/card";
import { Products } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";

type PropsTypes = {
  products: Products[];
};

export default function ProductView(props: PropsTypes) {
  const { products } = props;

  return (
    <div className="text-center grid grid-cols-1 justify-items-center">
      <div>{products.length}</div>
      <div className="flex flex-wrap gap-9 justify-items-center justify-center">
        {products
          .filter((product) => product.status !== "draft")
          .map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={` text-wrap
          cursor-pointer justify-center items-center border flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 transition-all ease-in-out max-w-sm border-gray-200 rounded-lg shadow hover:bg-gradient-to-l from-cyan-500 to-blue-500`}
            >
              <div className="justify-center items-center flex flex-col">
                <div className="flex justify-self-end items-end justify-items-end">
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
                    style={{ objectFit: "cover" }}
                    alt={product.title}
                  />
                </div>
                <div className="text-wrap">
                  <h1 className="text-xl capitalize font-bold line-clamp-3 text-white">
                    {product.title}
                  </h1>
                  <p className="text-sm line-clamp-2">{product.description}</p>
                  <div className="flex flex-col">
                    <p className="text-sm line-clamp-4">{product.createdBy}</p>
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
              </div>
              {/* <Card
                key={product.id}
                classname="text-center  h-96 md:w-4/5 flex p-3 m-6"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
              > */}
              {/* tag */}
              {/* </Card> */}
            </Link>
          ))}
      </div>
    </div>
  );
}
