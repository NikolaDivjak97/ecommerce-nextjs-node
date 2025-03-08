import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductGrid({ products }) {
  return (
    <div className="container w-[70%] mx-auto mb-12">
      <h1 className="text-[3rem] leading-[3rem] font-serif font-normal text-gray-800 my-16 text-center">Explore are new products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="block bg-white shadow-md rounded overflow-hidden transition hover:shadow-lg">
              <img src={product.images ? API_URL + product.images[0].path : ""} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
