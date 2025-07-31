import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
}

const Contact = () => {
  const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then(setProducts);
//   }, []);

  return (
    <main className="mt-20 p-4">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Our Store</h2>
      <p className="mb-4">Here are some fake products from an API:</p>
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((prod) => (
          <div key={prod.id} className="p-4 border rounded shadow bg-white dark:bg-gray-800 transition">
            <h3 className="font-bold">{prod.title}</h3>
            <p className="text-sm">{prod.description.substring(0, 80)}...</p>
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default Contact;
