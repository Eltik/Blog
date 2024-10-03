import { BellIcon, Ellipsis, HomeIcon, ListIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import React from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
    const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [mobile, setMobile] = useState(false);

    const handleMobile = () => {
        setMobile(!mobile);
    };

    const links = [
        { href: "/features", label: "Features" },
        { href: "/collections", label: "Collections" },
        { href: "/", label: "Posts" },
    ];

    useEffect(() => {
        updateLineStyle(hoveredLink ?? pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoveredLink, pathname]);

    const updateLineStyle = (currentLink: string) => {
        const linkIndex = links.findIndex((link) => link.href === currentLink);
        if (linkIndex !== -1 && linkRefs.current[linkIndex]) {
            const linkElement = linkRefs.current[linkIndex];
            const { offsetLeft, offsetWidth } = linkElement;
            setLineStyle({
                width: offsetWidth,
                left: offsetLeft,
            });
        }
    };

    return (
        <>
            <section className="flex flex-col px-12 py-8">
                <div className="flex flex-row items-stretch justify-between">
                    <div className="flex flex-row items-center justify-start gap-5">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Blog</h1>
                        </div>
                        <div className="relative mt-2 hidden flex-row items-center gap-5 text-gray-400 md:flex">
                            {links.map((link, index) => (
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                                <div key={link.href} ref={(el) => (linkRefs.current[index] = el as any)} onMouseEnter={() => setHoveredLink(link.href)} onMouseLeave={() => setHoveredLink(null)}>
                                    <Link href={link.href}>
                                        <span className={`text-base font-light transition-colors duration-200 hover:text-gray-300 ${pathname === link.href ? "text-gray-300" : ""}`}>{link.label}</span>
                                    </Link>
                                </div>
                            ))}
                            <div
                                className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-out"
                                style={{
                                    width: `${lineStyle.width}px`,
                                    left: `${lineStyle.left}px`,
                                }}
                            />
                        </div>
                        <div className="relative mt-2 hidden max-w-md md:block">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="search" placeholder="Search..." className="placeholder:text-muted-foreground flex h-8 w-full rounded-md border border-zinc-600 bg-bg-search px-3 py-2 pl-10 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                    </div>
                    <div className="hidden flex-row items-center justify-center gap-5 md:flex">
                        <Link href="/login">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-solid bg-gray-100 px-4 py-1 font-medium transition-all duration-100 hover:bg-gray-300 active:border-bg-search active:bg-bg-button active:text-white">Login</button>
                        </Link>
                        <Link href="/register">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-solid border-bg-search bg-bg-button px-4 py-1 font-medium text-white transition-all duration-100 hover:bg-bg-search active:border-bg-search active:bg-bg-button active:text-white">Register</button>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-solid bg-gray-100 px-4 py-1 font-medium transition-all duration-100 hover:bg-gray-300" onClick={handleMobile}>
                            <Ellipsis />
                        </button>
                        {/* Mobile Popout Menu */}
                        <div className={`absolute right-4 top-24 z-50 flex flex-col gap-4 rounded-lg bg-white p-4 text-gray-800 shadow-lg transition-all duration-100 ${mobile ? "translate-y-0 scale-100 opacity-100" : "-translate-y-5 scale-95 opacity-0"}`}>
                            <Link href="/">
                                <div className="flex items-center gap-2">
                                    <HomeIcon className="h-5 w-5" />
                                    <span>Home</span>
                                </div>
                            </Link>
                            <Link href="/features">
                                <div className="flex items-center gap-2">
                                    <BellIcon className="h-5 w-5" />
                                    <span>Features</span>
                                </div>
                            </Link>
                            <Link href="/collections">
                                <div className="flex items-center gap-2">
                                    <ListIcon className="h-5 w-5" />
                                    <span>Collections</span>
                                </div>
                            </Link>
                            <Link href="/login">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5" />
                                    <span>Login</span>
                                </div>
                            </Link>
                            <Link href="/register">
                                <div className="flex items-center gap-2">
                                    <SettingsIcon className="h-5 w-5" />
                                    <span>Register</span>
                                </div>
                            </Link>
                            <button className="text-gray-500" onClick={handleMobile}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 h-[2px] w-full rounded-lg bg-zinc-500"></div>
            </section>
        </>
    );
}
