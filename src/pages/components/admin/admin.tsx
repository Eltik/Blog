/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BellDot, Clock, FolderOpenDot, HardDrive, LayoutDashboard, List, ListChecks, MessageSquareMore, Rss, Search } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useStore } from "zustand";
import { useUserData } from "~/store/store";
import type { User } from "@prisma/client";
import { api } from "~/utils/api";

/**
 * Credit: https://dribbble.com/shots/20786200-Bress-Admin-Dashboard-Analytics-UX
 */
export function Admin() {
    const loginMutation = api.user.loginEncrypted.useMutation();
    const postMutation = api.post.create.useMutation();
    const categoryMutation = api.category.create.useMutation();
    const getCategoryMutation = api.category.getCategoryByName.useMutation();

    const categories = api.category.getCategories.useQuery().data;

    const userData = useStore(useUserData, (state: any) => state.user as User);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(1);

    const [categoryName, setCategoryName] = useState("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(parseInt(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (title.length === 0 || content.length === 0) {
            return;
        }

        e.preventDefault();

        try {
            const data = await loginMutation.mutateAsync({
                email: userData.email,
                password: userData.password,
            });

            try {
                const post = await postMutation.mutateAsync({
                    authorId: data.id,
                    categoryId: category,
                    content,
                    name: title,
                });

                console.log(post);

                alert("Successfully created blog post.");

                window.location.reload();
            } catch (error) {
                console.error(error);

                alert("Failed to create blog post.");
            }
        } catch (error) {
            console.error(error);

            alert("Invalid credentials.");

            window.location.href = "/";
        }
    };

    const handleSubmitCategory = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (categoryName.length === 0) {
            return;
        }

        e.preventDefault();

        try {
            await loginMutation.mutateAsync({
                email: userData.email,
                password: userData.password,
            });

            try {
                const exists = await getCategoryMutation.mutateAsync({
                    name: categoryName,
                });

                if (exists) {
                    return alert(`Category already exists: ${categoryName}`);
                }

                try {
                    const category = await categoryMutation.mutateAsync({
                        name: categoryName,
                    });

                    console.log(category);
                    alert(`Successfully created category: ${categoryName}`);
                } catch (error) {
                    console.error(error);

                    alert("Failed to create blog post.");
                }
            } catch (e) {
                console.error(e);
                alert("Failed to check if category exists.");
            }
        } catch (error) {
            console.error(error);

            alert("Invalid credentials.");

            window.location.href = "/";
        }
    };

    return (
        <div>
            <div className="flex h-full rounded-3xl bg-slate-100 px-11 py-5">
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
                <main className="flex-1">
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
                    <div className="mx-auto w-full max-w-4xl p-4">
                        <div className="flex flex-col rounded-lg bg-white px-8 py-8 shadow-lg">
                            <div className="flex flex-col px-5">
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-4xl font-semibold text-black">Last Tasks</h1>
                                    <div className="mr-8 flex flex-row items-center justify-between gap-8">
                                        <h2 className="text-2xl font-semibold">94</h2>
                                        <h2 className="text-2xl font-semibold">23</h2>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="text-gray-500">
                                        <b>117 total, </b> proceed to resolve them.
                                    </span>
                                    <div className="flex flex-row items-center justify-between gap-8">
                                        <span className="text-gray-500">Done</span>
                                        <span className="text-gray-500">Pending</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 px-5">
                                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
                                    <thead>
                                        <tr className="border-r-b text-left text-xs font-semibold text-gray-500">
                                            <th className="px-5 py-3 text-left">Name</th>
                                            <th className="px-5 py-3 text-left">Admin</th>
                                            <th className="px-5 py-3 text-center">Members</th>
                                            <th className="px-5 py-3 text-center">Run Time</th>
                                            <th className="px-5 py-3 text-center">Finish Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-5 py-3">Onboarding</td>
                                            <td className="flex items-center space-x-3 px-5 py-3">
                                                <span>John</span>
                                            </td>
                                            <td className="px-5 py-3 text-center">10</td>
                                            <td className="px-5 py-3 text-center">
                                                <span className="flex items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-sm text-green-600">Done</span>
                                            </td>
                                            <td className="px-5 py-3 text-center text-sm">2 hours</td>
                                            <td className="px-5 py-3 text-center text-sm">7 Tue</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="px-5 py-3">Meeting with Webflow</td>
                                            <td className="flex items-center space-x-3 px-5 py-3">
                                                <span>Bob</span>
                                            </td>
                                            <td className="px-5 py-3 text-center">4</td>
                                            <td className="px-5 py-3 text-center">
                                                <span className="flex items-center justify-center gap-3 rounded-lg bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                                    <Clock size={15} />
                                                    In-Progress
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-center text-sm">4 days</td>
                                            <td className="px-5 py-3 text-center text-sm">19 Sun</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-4xl flex-row">
                        <div className="mx-auto w-full max-w-4xl p-4 py-5">
                            <div className="flex flex-col rounded-lg bg-white p-2 px-8 shadow-lg">
                                <h1 className="ml-5 mt-5 text-3xl font-semibold">Create a Blog Post</h1>
                                <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                                <form>
                                    <div className="space-y-4 p-6">
                                        <div className="space-y-2">
                                            <label htmlFor="title" className="mb-2 block text-lg font-medium">
                                                Title
                                            </label>
                                            <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="title" placeholder="Blog title..." required value={title} onChange={handleTitleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="content" className="mb-2 block text-lg font-medium">
                                                Content
                                            </label>
                                            <textarea id="content" className="h-64 w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={content} onChange={handleContentChange} placeholder="Write your blog post in Markdown" required />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="mb-2 block text-lg font-medium">
                                                Category
                                            </label>
                                            <select id="category" className="h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" onChange={handleCategoryChange}>
                                                {categories?.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={handleSubmit}>
                                            Submit Blog
                                        </button>
                                    </div>
                                </form>
                                <div className="mb-5 ml-5 mt-10">
                                    <h2 className="mb-4 text-2xl font-semibold">Preview</h2>
                                    <div className="rounded-md border bg-gray-50 p-4">
                                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{content}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-4xl p-4 py-5">
                            <div className="flex flex-col rounded-lg bg-white p-2 px-8 shadow-lg">
                                <h1 className="ml-5 mt-5 text-3xl font-semibold">Create a Category</h1>
                                <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                                <form>
                                    <div className="space-y-4 p-6">
                                        <div className="space-y-2">
                                            <label htmlFor="categoryName" className="mb-2 block text-lg font-medium">
                                                Name
                                            </label>
                                            <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="categoryName" placeholder="Category title..." required value={categoryName} onChange={handleCategoryName} />
                                        </div>
                                        <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={handleSubmitCategory}>
                                            Submit Category
                                        </button>
                                    </div>
                                </form>
                                <div className="flex max-h-[50%] flex-col gap-5">
                                    {(categories?.length ?? 0) > 0 ? (
                                        categories?.map((category) => (
                                            <div key={category.id} className="flex flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-4">
                                                <span className="text-lg font-semibold">{category.name}</span>
                                                <span className="text-sm text-gray-500">{category.id}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-4">
                                            <span className="text-lg font-semibold">No categories</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
