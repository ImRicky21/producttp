import { Products } from "@/types/products.type";
import Image from "next/image";
import { useState } from "react";

type PropsTypes = {
  product: Products | any;
};
export default function DetailProductView(props: PropsTypes) {
  const { product } = props;
  const paragraphs = product?.description.split("\n\n" || "\n");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-center text-teal-400 mb-4">
        {product?.title}
      </h1>
      <div className="flex justify-center mb-4">
        <Image
          src={product?.image}
          alt={product?.title}
          width={450}
          height={450}
          layout=""
          objectFit="contain"
          sizes="100vw"
          className="rounded-lg"
        />
      </div>
      <div className="text-justify">
        {paragraphs?.map((paragraph: any, index: any) => (
          <p key={index} className="mb-2 p-2 text-justify">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="text-right text-gray-500">{product?.date}</div>
        <div className="text-left text-gray-500">{product?.createdBy}</div>
      </div>
    </div>
  );
}
