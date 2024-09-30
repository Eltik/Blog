import Image from "next/image";

export function Posts() {
    return (
        <>
            <div className="flex h-full w-full space-x-4 rounded-3xl bg-gray-200 p-6">
                <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg">
                    <div className="h-56 overflow-hidden">
                        <Image src="/posts/temp.jpeg" alt="A Kid Called Beast" className="h-full w-full object-cover" width={50} height={50} />
                    </div>

                    <div className="relative bg-white p-6">
                        <div className="absolute left-[-40px] top-[-40px] z-0 h-32 w-32 rounded-full bg-gray-200 opacity-30 blur-xl" />
                        <div className="absolute bottom-[-30px] right-[-30px] z-0 h-40 w-40 rounded-full bg-gray-200 opacity-20 blur-lg" />

                        <div className="relative z-10">
                            <div className="mb-2">
                                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase text-white">Latest</span>
                            </div>
                            <h2 className="text-2xl font-bold leading-tight">Title 1</h2>
                            <p className="mt-2 text-gray-700">We are very excited to introduce you to aKidCalledBeast. Join us to learn all about the game and the upcoming private sale...</p>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                <span>Announcements</span>
                                <span>20 Mar 2023 • 5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg">
                    <div className="flex h-56 items-center justify-center overflow-hidden bg-red-200">
                        <Image src="/path/to/your/crypto-image.png" alt="MultiNFT Launches" className="h-full w-full object-cover" width={50} height={50} />
                    </div>

                    <div className="relative bg-white p-6">
                        <div className="absolute left-[-40px] top-[-40px] z-0 h-32 w-32 rounded-full bg-red-200 opacity-30 blur-xl" />
                        <div className="absolute bottom-[-30px] right-[-30px] z-0 h-40 w-40 rounded-full bg-red-200 opacity-20 blur-lg" />

                        <div className="relative z-10">
                            <div className="mb-2">
                                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase text-white">News</span>
                            </div>
                            <h2 className="text-2xl font-bold leading-tight">Title 2</h2>
                            <p className="mt-2 text-gray-700">Over the next weeks, we will release info on the 8 playable races in Mist’s metaverse.</p>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                <span>News</span>
                                <span>19 Mar 2023 • 2 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
