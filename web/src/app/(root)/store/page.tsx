"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Product {
  _id: string;
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price?: string;
  currency: string;
  product_star_rating?: number;
  product_url: string;
  product_photo: string;
  is_best_seller: boolean;
  delivery?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session} = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/store");
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to render star ratings
  const renderStarRatings = (rating: number | undefined) => {
    const filledStars = rating || 0;
    const totalStars = 5;
    const emptyStars = totalStars - filledStars;

    return (
      <div className="flex items-center">
        {/* Filled Stars */}
        {Array.from({ length: filledStars }, (_, index) => (
          <span key={index} className="text-yellow-500 text-lg">
            ★
          </span>
        ))}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={index} className="text-gray-300 text-lg">
            ☆
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Our Products
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="w-full h-56 relative">
                <Image
                  src={product.product_photo}
                  alt={product.product_title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Content */}
              <div className="p-5">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.product_title}
                </h2>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-green-600 font-bold text-lg">
                     {product.product_price}
                  </span>
                  {product.product_original_price && (
                    <span className="line-through text-gray-500 text-sm">
                       {product.product_original_price}
                    </span>
                  )}
                </div>
                 

                {/* Star Ratings */}
                <div className="mb-2">
                  {renderStarRatings(product.product_star_rating)}
                </div>

                {/* Best Seller Badge */}
                {product.is_best_seller && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                    Best Seller
                  </span>
                )}

                { session &&
                <a
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Buy Now
                </a>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
