import React from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  imagePath: string;
  name: string;
  price: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    return await client.fetch(
      `*[_type == 'products'] {
        _id,
        name,
        price,
        "imagePath": image.asset->url
      }`
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const ProductListAsync = async () => {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link key={product._id} href={`/Sidebar/${product._id}`}>
          <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <Image
              src={product.imagePath}
              alt={product.name}
              width={150}
              height={150}
              className="rounded-md object-cover"
            />
            <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
            <p className="text-blue-500">{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductListAsync;
