"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productcard";

interface Product {
    id: string;
    productname: string;
    productprice: number;
    productimage: string;
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Simulate a delay for fetching data
        setTimeout(() => {
            const mockData: Product[] = [
                {
                    id: "1",
                    productname: "Smartphone",
                    productprice: 699,
                    productimage: "https://via.placeholder.com/150",
                },
                {
                    id: "2",
                    productname: "Laptop",
                    productprice: 1199,
                    productimage: "https://via.placeholder.com/150",
                },
                {
                    id: "3",
                    productname: "Headphones",
                    productprice: 199,
                    productimage: "https://via.placeholder.com/150",
                },
                {
                    id: "4",
                    productname: "Smartwatch",
                    productprice: 249,
                    productimage: "https://via.placeholder.com/150",
                },
                {
                    id: "5",
                    productname: "Camera",
                    productprice: 999,
                    productimage: "https://via.placeholder.com/150",
                },
            ];
            setProducts(mockData);
            setFilteredProducts(mockData);
            setLoading(false);
        }, 2000); // 2 seconds delay
    }, []);

    // Filter logic
    useEffect(() => {
        const lowerPrice = priceRange[0];
        const upperPrice = priceRange[1];

        const filtered = products.filter((product) => {
            const matchesSearch = product.productname
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesPrice =
                product.productprice >= lowerPrice &&
                product.productprice <= upperPrice;
            return matchesSearch && matchesPrice;
        });

        setFilteredProducts(filtered);
    }, [searchQuery, priceRange, products]);

    if (loading)
        return (
            <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 150px)" }}>
                <Loader size={32} className="animate-spin" />
            </div>
        );

    return (
        <div className="container mx-auto px-1 py-5">
            {/* Search and Filter Options */}
            <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm" />
                <div className="flex gap-2 items-center">
                    <label className="text-sm font-medium">Price Range:</label>
                    <input type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="border border-gray-300 rounded-md px-2 py-1 w-20" />
                    <span className="mx-1">-</span>
                    <input type="number" placeholder="Max" value={priceRange[1] === Infinity ? "" : priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || Infinity,])} className="border border-gray-300 rounded-md px-2 py-1 w-20" />
                </div>
            </div>

            {/* Product List */}
            <div className="flex flex-wrap justify-center gap-5">
                {filteredProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard link="/product/" id={product.id} productName={product.productname} productPrice={product.productprice} productImage={product.productimage} />
                    </div>
                ))}
            </div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
}
