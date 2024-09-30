import { SearchIcon } from "lucide-react";
import Link from "next/link";

export function Navigation() {
    return (
        <>
            <section className="flex flex-col px-12 py-8">
                <div className="flex flex-row items-center justify-start gap-5">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">Blog</h1>
                    </div>
                    <div className="mt-2 flex flex-row items-center gap-5">
                        <Link href="/features">
                            <span className="text-base font-light text-gray-400">Features</span>
                        </Link>
                        <Link href="/collections">
                            <span className="text-base font-light text-gray-400">Collections</span>
                        </Link>
                        <Link href="/posts">
                            <span className="text-base font-light text-gray-400">Posts</span>
                        </Link>
                    </div>
                    <div className="relative mt-2 max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="search" placeholder="Search..." className="placeholder:text-muted-foreground flex h-8 w-full rounded-md border border-zinc-600 bg-bg-search px-3 py-2 pl-10 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                </div>
                <div className="mt-8 h-[2px] w-full rounded-lg bg-zinc-500"></div>
            </section>
        </>
    );
}
