import { BellDot, FolderOpenDot, HardDrive, LayoutDashboard, ListChecks, MessageSquareMore, Rss } from "lucide-react";
import React from "react";

export default function Sidebar() {
    return (
        <>
            <aside className="flex w-64 flex-col rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-8 flex flex-col px-5">
                    <div className="flex items-center">
                        <Rss />
                        <span className="text-xl font-bold">Blog</span>
                    </div>
                    <div className="mt-5 h-[1px] w-full rounded-lg bg-zinc-500/30"></div>
                </div>
                <nav className="flex flex-col gap-2">
                    <button type="button" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium">
                        <LayoutDashboard />
                        <span className="ml-2">Dashboard</span>
                    </button>
                    <button type="button" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium">
                        <FolderOpenDot />
                        <span className="ml-2">Projects</span>
                    </button>
                    <button type="button" className="inline-flex items-center rounded-3xl bg-gray-900 px-5 py-3 text-sm font-medium text-white">
                        <ListChecks />
                        <span className="ml-2">Task List</span>
                    </button>
                    <button type="button" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium">
                        <HardDrive />
                        <span className="ml-2">Services</span>
                    </button>
                    <button type="button" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium">
                        <BellDot />
                        <span className="ml-2">Notifications</span>
                    </button>
                    <button type="button" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium">
                        <MessageSquareMore />
                        <span className="ml-2">Chat</span>
                    </button>
                </nav>
            </aside>
        </>
    );
}
