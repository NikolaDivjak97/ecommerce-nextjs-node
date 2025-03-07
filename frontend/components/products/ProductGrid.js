import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export default function ProductGrid({ products }) {
  //   const products = [
  //     { id: 1, name: "test testtest test test testttt", price: 50, slug: "test", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80" },
  //     { id: 2, name: "test1", price: 50, slug: "test1", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80" },
  //     { id: 3, name: "test2", price: 50, slug: "test2", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80" },
  //     { id: 4, name: "test3", price: 50, slug: "test3", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80" },
  //   ];

  return (
    <div className="container w-[70%] mx-auto mb-12">
      <h1 className="text-[3rem] leading-[3rem] font-serif font-normal text-gray-800 my-16 text-center">Explore are new products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="block bg-white shadow-md rounded overflow-hidden transition hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
      </div>

      <Link href="/shop" className="mx-auto mt-12 flex w-64 mt-2 rounded justify-center items-center gap-2 p-3 bg-[#000] hover:bg-[#222] text-[#fefefe] text-[24px] font-semibold">
        To Shop
        <FaAngleRight />
      </Link>
    </div>
  );
}
