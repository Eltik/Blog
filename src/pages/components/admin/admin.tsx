import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { Tasks } from "./tasks";
import { CreateBlog } from "./create-blog";
import { CreateCategory } from "./create-category";

/**
 * Credit: https://dribbble.com/shots/20786200-Bress-Admin-Dashboard-Analytics-UX
 */
export function Admin() {
    return (
        <div>
            <div className="flex h-full rounded-3xl bg-slate-100 px-11 py-5">
                <Sidebar />
                <main className="flex-1">
                    <Navbar />
                    <Tasks />
                    <div className="mx-auto flex max-w-4xl flex-row">
                        <CreateBlog />
                        <CreateCategory />
                    </div>
                </main>
            </div>
        </div>
    );
}
