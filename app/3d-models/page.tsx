"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productcard";

interface Product {
    id: string;
    productname: string;
    productprice: number;
    productimage: string;
    category: string; // New category field
}

export default function Model() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
                    category: "Electronics",
                },
                {
                    id: "2",
                    productname: "Laptop",
                    productprice: 1199,
                    productimage: "https://via.placeholder.com/150",
                    category: "Electronics",
                },
                {
                    id: "3",
                    productname: "Headphones",
                    productprice: 199,
                    productimage: "https://via.placeholder.com/150",
                    category: "Accessories",
                },
                {
                    id: "4",
                    productname: "Smartwatch",
                    productprice: 249,
                    productimage: "https://via.placeholder.com/150",
                    category: "Accessories",
                },
                {
                    id: "5",
                    productname: "Camera",
                    productprice: 999,
                    productimage: "https://via.placeholder.com/150",
                    category: "Photography",
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
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);
            return matchesSearch && matchesPrice && matchesCategory;
        });

        setFilteredProducts(filtered);
    }, [searchQuery, priceRange, selectedCategories, products]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    if (loading)
        return (
            <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 150px)" }}>
                <Loader size={32} className="animate-spin" />
            </div>
        );

    // Get unique categories for the filter
    const categories = Array.from(new Set(products.map((product) => product.category)));

    return (
        <div className="flex p-4 sm:p-6 lg:p-8">
            {/* Sidebar Filter */}
            <div className="w-[200px] border-r">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                {/* Category Filter */}
                <div className="mb-5">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category}>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} className="form-checkbox" />
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full pl-4 container mx-auto">
                {/* Search and Price Filter */}
                <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
                    <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm" />
                    <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium">Price Range:</label>
                        <input type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="border border-gray-300 rounded-md px-2 py-1 w-20" />
                        <span className="mx-1">-</span>
                        <input type="number" placeholder="Max" value={priceRange[1] === Infinity ? "" : priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || Infinity])} className="border border-gray-300 rounded-md px-2 py-1 w-20" />
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
                    <div className="text-center mt-10 text-gray-500">No products found.</div>
                )}
            </div>
        </div>
    );
}
