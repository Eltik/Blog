import Link from "next/link";
import { Dot } from "lucide-react";
import { api } from "~/utils/api";

export function Hero() {
    const categories = api.category.getCategories.useQuery();

    return (
        <>
            <section className="flex flex-col px-11 py-5">
                <div>
                    <h1 className="text-8xl font-bold tracking-wide text-white">Eltik&apos;s Blog</h1>
                </div>
                <div className="ml-2 mt-7">
                    <p className="text-xs font-light text-gray-400">FILTERS</p>
                    <div className="mt-3 flex max-w-[65%] flex-row flex-wrap gap-4">
                        <Link href={`/blogs/all`}>
                            <div className="flex flex-row items-center rounded-full bg-white px-5 py-2 text-sm text-black">
                                <p className="font-semibold">All</p>
                                <Dot strokeWidth={2} />
                                <p>28</p>
                            </div>
                        </Link>
                        {(categories.data?.length ?? 0) > 0 ? (
                            categories.data?.map((category) => (
                                <Link key={category.id} href={`/blogs/${category.name.toLowerCase()}`}>
                                    <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white transition-all duration-100 hover:bg-white hover:text-black hover:backdrop-blur-lg active:bg-zinc-200">
                                        <p>{category.name}</p>
                                        <Dot strokeWidth={2} />
                                        <p>12</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex flex-row space-x-4">
                                {[...(Array(3) as number[])].map((_, index) => (
                                    <div key={index} className="flex h-10 w-32 animate-pulse flex-row items-center rounded-full bg-gray-300 px-5 py-2 text-sm text-white">
                                        <div className="h-4 w-16 rounded-md bg-gray-400"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
