import Link from "next/link";
import { Dot } from "lucide-react";

export function Hero() {
    return (
        <>
            <section className="flex flex-col px-11 py-5">
                <div>
                    <h1 className="text-8xl text-white font-bold tracking-wide">
                        BLOG
                    </h1>
                </div>
                <div className="ml-2 mt-7">
                    <p className="text-xs text-gray-400 font-light">FILTERS</p>
                    <div className="flex flex-wrap flex-row gap-4 mt-3 max-w-[65%]">
                        <Link href={`/blogs/all`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-white rounded-full text-black text-sm">
                                <p className="font-semibold">All</p>
                                <Dot strokeWidth={2} />
                                <p>28</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/news`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>News</p>
                                <Dot strokeWidth={2} />
                                <p>12</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/announcements`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Announcements</p>
                                <Dot strokeWidth={2} />
                                <p>12</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/strategy`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Strategy</p>
                                <Dot strokeWidth={2} />
                                <p>7</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/operations`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Operations</p>
                                <Dot strokeWidth={2} />
                                <p>15</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/metrics`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Metrics & Performance</p>
                                <Dot strokeWidth={2} />
                                <p>15</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/marketing`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Marketing</p>
                                <Dot strokeWidth={2} />
                                <p>7</p>
                            </div>
                        </Link>
                        <Link href={`/blogs/automation`}>
                            <div className="px-5 py-2 flex flex-row items-center bg-bg-button rounded-full text-white text-sm">
                                <p>Automation</p>
                                <Dot strokeWidth={2} />
                                <p>4</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}