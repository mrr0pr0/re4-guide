import Image from "next/image";

export default function Chapter1_1Page() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">Chapter 1-1</h1>
                <p className="text-lg text-gray-600">
                    Leon arrives in a desolate village in search of the President's daughter.
                </p>
            </div>

            <div className="relative w-full max-w-2xl h-64 rounded-lg shadow-lg mb-8">
                <Image
                    src="https://placehold.co/600x400?text=Chapter+1-1"
                    alt="Chapter 1-1"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <div className="prose max-w-none">
                <h2>The Village</h2>
                <p>
                    Leon S. Kennedy arrives at the outskirts of a rural village in Spain.
                    The locals are hostile.
                </p>
            </div>
        </div>
    );
}
