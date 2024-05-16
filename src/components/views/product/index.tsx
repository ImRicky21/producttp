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
      <div>{products.length}</div>
      <div className="flex flex-wrap gap-9 justify-items-center justify-center">
        {products
          .filter((product) => product.status !== "draft")
          .map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition ease-in-out"
            >
              <Image
                className="rounded-t-lg"
                src={product.image}
                alt={product.title}
                width={400}
                height={200}
              />

              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-3">
                  {product.description}
                </p>
              </div>
            </Link>
            //   <Link
            //     key={product.id}
            //     href={`/product/${product.id}`}
            //     classNameName={`text-wrap hover:shadow-lg bg-teal-300
            // cursor-pointer justify-center items-center border
            // transition-all ease-in-out max-w-sm border-gray-200 rounded-lg`}
            //   >
            //     <div classNameName="justify-center items-center flex flex-col">
            //       <div classNameName="flex justify-self-end items-end justify-items-end">
            //         <h2
            //           classNameName={`capitalize text-right self-end ${
            //             product.tag !== "berita" ? `bg-teal-300` : `bg-red-500`
            //           } px-2 mx-2 rounded-lg`}
            //         >
            //           {product.tag}
            //         </h2>
            //       </div>

            //       <div classNameName="">
            //         <Image
            //           src={product.image}
            //           layout="responsive"
            //           width={150}
            //           height={150}
            //           alt={product.title}
            //           classNameName="rounded-t-lg"
            //           priority
            //         />
            //       </div>

            //       <div classNameName="text-wrap">
            //         <h1 classNameName="text-xl capitalize font-bold line-clamp-3 text-white">
            //           {product.title}
            //         </h1>
            //         <p classNameName="text-sm line-clamp-2">{product.description}</p>
            //         <div classNameName="flex flex-col">
            //           <p classNameName="text-sm line-clamp-4">{product.createdBy}</p>
            //           <p classNameName="text-sm line-clamp-4">
            //             {product.date
            //               ? product.date
            //               : product.createdAt &&
            //                 new Date(
            //                   parseInt(product.createdAt)
            //                 ).toLocaleDateString("id-ID", {
            //                   weekday: "long",
            //                   year: "numeric",
            //                   month: "long",
            //                   day: "numeric",
            //                 })}
            //           </p>
            //         </div>
            //       </div>
            //     </div>
            //     {/* <Card
            //       key={product.id}
            //       classNamename="text-center  h-96 md:w-4/5 flex p-3 m-6"
            //       data-aos="fade-up"
            //       data-aos-delay={`${(index + 1) * 100}`}
            //     > */}
            //     {/* tag */}
            //     {/* </Card> */}
            //   </Link>
          ))}
      </div>
    </div>
  );
}
