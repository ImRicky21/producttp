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
    <div
      className="text-center grid grid-cols-1 justify-items-center"
      data-aos="fade-up"
    >
      <div className="flex flex-wrap gap-9 justify-items-center justify-center">
        {products
          .filter((product) => product.status !== "draft")
          .map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition ease-in-out"
            >
              <div className="">
                <Image
                  className="rounded-t-lg"
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  width={400}
                  height={300}
                />
              </div>

              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-3">
                    {product.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-3">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between p-3 text-slate-400">
                <p>{product.date}</p>
                <p>{product.createdBy}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
