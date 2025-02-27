export async function getServerSideProps() {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();
    
    return { props: { products } };
  }
  
  export default function Products({ products }) {
    return (
      <div>
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  