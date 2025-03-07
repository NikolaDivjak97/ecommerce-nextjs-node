import ProductGrid from "@/components/products/ProductGrid";
import Slider from "@/components/Slider";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/api/pages/home`);

  if (!res.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { products } = await res.json();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
  const images = [
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  ];

  return (
    <div>
      <Slider images={images} />
      <ProductGrid products={products} />
    </div>
  );
}
