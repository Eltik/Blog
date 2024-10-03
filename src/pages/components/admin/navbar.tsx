import { LayoutDashboard, List, Search } from "lucide-react";
import React from "react";

export default function Navbar() {
    return (
        <>
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="flex items-center justify-between rounded-lg bg-white p-5 shadow-lg">
                    <div className="mr-2 flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
                        <Search className="mr-2 h-5 w-5 text-gray-400" />
                        <input type="search" placeholder="Search" className="w-full border-none bg-transparent focus:outline-none focus:ring-0" />
                    </div>
                    <div className="flex items-center rounded-full bg-gray-900 text-white">
                        <button type="button" className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md rounded-l-full bg-gray-900 px-4 py-2 text-sm font-medium">
                            <LayoutDashboard />
                            <span className="ml-2">Card</span>
                        </button>
                        <button type="button" className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md rounded-r-full bg-gray-200 px-4 py-2 text-sm font-medium text-black">
                            <List />
                            <span className="ml-2">List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
