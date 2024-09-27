import Image from "next/image";

export function Posts() {
    return (
        <>
            <div className="flex space-x-4 p-6 bg-gray-200 rounded-3xl w-full h-full">
                <div className="relative max-w-sm w-full bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="h-56 overflow-hidden">
                        <Image src="/posts/temp.jpeg" alt="A Kid Called Beast" className="object-cover w-full h-full" width={50} height={50} />
                    </div>

                    <div className="relative p-6 bg-white">
                    <div className="absolute top-[-40px] left-[-40px] bg-gray-200 w-32 h-32 rounded-full blur-xl opacity-30 z-0" />
                    <div className="absolute bottom-[-30px] right-[-30px] bg-gray-200 w-40 h-40 rounded-full blur-lg opacity-20 z-0" />

                    <div className="relative z-10">
                        <div className="mb-2">
                            <span className="text-xs font-semibold uppercase bg-black text-white px-3 py-1 rounded-full">
                                Latest
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold leading-tight">
                            Title 1
                        </h2>
                        <p className="mt-2 text-gray-700">
                            We are very excited to introduce you to aKidCalledBeast. Join us
                            to learn all about the game and the upcoming private sale...
                        </p>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                            <span>Announcements</span>
                            <span>20 Mar 2023 • 5 min read</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="relative max-w-sm w-full bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="h-56 overflow-hidden bg-red-200 flex items-center justify-center">
                        <Image src="/path/to/your/crypto-image.png" alt="MultiNFT Launches" className="object-cover w-full h-full" width={50} height={50} />
                    </div>

                    <div className="relative p-6 bg-white">
                        <div className="absolute top-[-40px] left-[-40px] bg-red-200 w-32 h-32 rounded-full blur-xl opacity-30 z-0" />
                        <div className="absolute bottom-[-30px] right-[-30px] bg-red-200 w-40 h-40 rounded-full blur-lg opacity-20 z-0" />

                        <div className="relative z-10">
                            <div className="mb-2">
                                <span className="text-xs font-semibold uppercase bg-black text-white px-3 py-1 rounded-full">
                                    News
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold leading-tight">
                                Title 2
                            </h2>
                            <p className="mt-2 text-gray-700">
                                Over the next weeks, we will release info on the 8 playable races
                                in Mist’s metaverse.
                            </p>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                                <span>News</span>
                                <span>19 Mar 2023 • 2 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}