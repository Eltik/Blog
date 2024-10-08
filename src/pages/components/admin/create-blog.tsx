/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useRef, useState } from "react";
import { api } from "~/utils/api";
import { useStore } from "zustand";
import { useUserData } from "~/store/store";
import type { User } from "~/types";
import React from "react";

import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function CreateBlog() {
    const categories = api.category.getCategories.useQuery().data;

    const loginMutation = api.user.loginEncrypted.useMutation();
    const postMutation = api.post.create.useMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(1);
    const [imageData, setImageData] = useState<string | null>(null);

    const editorRef = useRef<HTMLDivElement | null>(null);

    const userData = useStore(useUserData, (state: any) => state.user as User);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(parseInt(e.target.value));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Simulating an upload and generating a URL
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                setImageData(base64String);
            };
            reader.readAsDataURL(file);
        }
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
                await postMutation.mutateAsync({
                    authorId: data.id,
                    categoryId: category,
                    content,
                    name: title,
                    imageThumbnail: imageData ?? "",
                });

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

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const image = e.clipboardData.files[0];

        if (!image) {
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        formData.append("file", image);

        document.cookie = `email=${userData.email}; path=/;`;
        document.cookie = `password=${userData.password}; path=/;`;

        void fetch("/api/upload", {
            method: "POST",
            headers: {
                Cookie: `email=${userData.email}; password=${userData.password};`,
            },
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then(
                (data: {
                    success: boolean;
                    filePath: {
                        size: number;
                        filepath: string;
                        newFilename: string;
                        mimetype: string;
                        mtime: string;
                        originalFilename: string;
                    }[];
                }) => {
                    const imageURL = data.filePath[0]?.newFilename;
                    if (!imageURL) {
                        return;
                    }

                    setContent(content + `![${data.filePath[0]?.originalFilename ?? imageURL}](${`/posts/${imageURL}`})`);
                },
            );
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const image = e.dataTransfer.files[0];

        if (!image) {
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        formData.append("file", image);

        document.cookie = `email=${userData.email}; path=/;`;
        document.cookie = `password=${userData.password}; path=/;`;

        void fetch("/api/upload", {
            method: "POST",
            headers: {
                Cookie: `email=${userData.email}; password=${userData.password};`,
            },
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then(
                (data: {
                    success: boolean;
                    filePath: {
                        size: number;
                        filepath: string;
                        newFilename: string;
                        mimetype: string;
                        mtime: string;
                        originalFilename: string;
                    }[];
                }) => {
                    const imageURL = data.filePath[0]?.newFilename;
                    if (!imageURL) {
                        return;
                    }

                    setContent(content + `![${data.filePath[0]?.originalFilename ?? imageURL}](${`/posts/${imageURL}`})`);
                },
            );
    };

    return (
        <>
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
                                <div ref={editorRef} onPaste={handlePaste} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                                    <textarea id="content" className="h-64 w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={content} onChange={handleContentChange} placeholder="Write your blog post in Markdown" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="preview" className="mb-2 block text-lg font-medium">
                                    Preview
                                </label>
                                <MarkdownPreview source={content} />
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
                            <div>
                                <label htmlFor="image" className="mb-2 block text-lg font-medium">
                                    Upload Image
                                </label>
                                <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none" />
                            </div>
                            <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={handleSubmit}>
                                Submit Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
