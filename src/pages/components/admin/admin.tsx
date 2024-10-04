import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Tasks from "./tasks";
import CreateBlog from "./create-blog";
import CreateCategory from "./create-category";
import ManageBlog from "./manage-blog";

/**
 * Credit: https://dribbble.com/shots/20786200-Bress-Admin-Dashboard-Analytics-UX
 */
export default function Admin() {
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
                    <div className="mx-auto flex max-w-4xl flex-row">
                        <ManageBlog />
                    </div>
                </main>
            </div>
        </div>
    );
}
