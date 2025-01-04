import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
    { name: 'Characters', icon: '🧑' },
    { name: 'Environments', icon: '🏞️' },
    { name: 'Vehicles', icon: '🚗' },
    { name: 'Props', icon: '🪑' },
    { name: 'Architecture', icon: '🏛️' },
    { name: 'Animals', icon: '🐘' },
]

const popularModels = [
    { id: 1, name: 'Sci-Fi Spaceship', category: 'Vehicles', price: 49.99 },
    { id: 2, name: 'Fantasy Castle', category: 'Architecture', price: 79.99 },
    { id: 3, name: 'Cyberpunk Character', category: 'Characters', price: 39.99 },
    { id: 4, name: 'Tropical Island', category: 'Environments', price: 59.99 },
    { id: 5, name: 'Futuristic Weapon', category: 'Props', price: 29.99 },
    { id: 6, name: 'Ancient Dragon', category: 'Animals', price: 89.99 },
]

export default function Home() {
    return (
        <div className="h-full">
            <main>
                {/* Hero Section */}
                <section className="bg-blue-600 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing 3D Models</h1>
                        <p className="text-xl mb-8">High-quality 3D assets for your projects</p>
                        <Button size="lg" variant="secondary">Explore Models</Button>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="bg-gray-400 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-2">{category.icon}</div>
                                    <h3 className="font-semibold">{category.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Models Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">Popular Models</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularModels.map((model) => (
                                <Card key={model.id}>
                                    <CardHeader>
                                        <CardTitle>{model.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="aspect-square relative mb-4">
                                            <Image src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(model.name)}`} alt={model.name} layout="fill" objectFit="cover" className="rounded-md" />
                                        </div>
                                        <p className="text-sm text-gray-500">{model.category}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <span className="text-lg font-bold">${model.price}</span>
                                        <Button>Add to Cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
