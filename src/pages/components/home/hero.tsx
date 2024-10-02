import Link from "next/link";
import { Dot } from "lucide-react";

export function Hero() {
    return (
        <>
            <section className="flex flex-col px-11 py-5">
                <div>
                    <h1 className="text-8xl font-bold tracking-wide text-white">BLOG</h1>
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
                        <Link href={`/blogs/news`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>News</p>
                                <Dot strokeWidth={2} />
                                <p>12</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/announcements`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Announcements</p>
                                <Dot strokeWidth={2} />
                                <p>12</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/strategy`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Strategy</p>
                                <Dot strokeWidth={2} />
                                <p>7</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/operations`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Operations</p>
                                <Dot strokeWidth={2} />
                                <p>15</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/metrics`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Metrics & Performance</p>
                                <Dot strokeWidth={2} />
                                <p>15</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/marketing`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Marketing</p>
                                <Dot strokeWidth={2} />
                                <p>7</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/automation`}>
                            <div className="flex flex-row items-center rounded-full bg-bg-button px-5 py-2 text-sm text-white">
                                <p>Automation</p>
                                <Dot strokeWidth={2} />
                                <p>4</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
