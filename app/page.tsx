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
            setLoading(false);
        }, 2000); // 2 seconds delay
    }, []);

    if (loading)
        return (
            <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 100px)" }}
            >
                <Loader size={32} className="animate-spin" />
            </div>
        );

    return (
        <div className="container mx-auto px-1 py-5">
            <div className="flex flex-wrap justify-center gap-5">
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard link="/product/" id={product.id} productName={product.productname} productPrice={product.productprice} productImage={product.productimage} />
                    </div>
                ))}
            </div>
        </div>
    );
}
