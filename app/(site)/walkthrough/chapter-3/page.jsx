import Image from "next/image";

export default function Chapter1_3Page() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">Chapter 3</h1>
                <p className="text-lg text-gray-600">The lake monster awaits.</p>
            </div>

            <div className="relative w-full max-w-2xl h-64 rounded-lg shadow-lg mb-8">
                <Image
                    src="https://placehold.co/600x400?text=Chapter+1-3"
                    alt="Chapter 1-3"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <div className="prose max-w-none">
                <h2>Del Lago</h2>
                <p>
                    Leon must cross the lake to reach the church, but a giant creature
                    stands in his way.
                </p>
            </div>
        </div>
    );
}
