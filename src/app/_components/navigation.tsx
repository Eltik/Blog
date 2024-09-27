import { SearchIcon } from "lucide-react";
import Link from "next/link";

export function Navigation() {
    return (
        <>
            <section className="px-12 flex flex-col py-8">
                <div className="flex flex-row justify-start items-center gap-5">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">Blog</h1>
                    </div>
                    <div className="flex flex-row items-center gap-5 mt-2">
                        <Link href="/features">
                            <span className="text-base text-gray-400 font-light">
                                Features
                            </span>
                        </Link>
                        <Link href="/collections">
                            <span className="text-base text-gray-400 font-light">
                                Collections
                            </span>
                        </Link>
                        <Link href="/posts">
                            <span className="text-base text-gray-400 font-light">
                                Posts
                            </span>
                        </Link>
                    </div>
                    <div className="relative max-w-md mt-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="search" placeholder="Search..." className="text-white bg-bg-search flex h-8 rounded-md border border-zinc-600 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pl-10 w-full" />
                    </div>
                </div>
                {/*
                Line at the very bottom
                */}
                <div className="w-full h-[2px] bg-zinc-500 mt-8 rounded-lg"></div>
            </section>
        </>
    );
}