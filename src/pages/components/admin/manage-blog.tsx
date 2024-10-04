import React, { useState } from "react";
import type { Post } from "~/types";
import { api } from "~/utils/api";

export default function ManageBlog() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const updatePostMutation = api.post.editPost.useMutation();

    const posts = api.post.getPostsByPage.useQuery({
        limit: pageSize,
        offset: (page - 1) * pageSize,
    }).data;

    const totalPosts = api.post.getTotalPosts.useQuery().data;

    const handleEdit = (post: Post) => {
        setEditingPost(post);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingPost) return;

        console.log(totalPosts);

        const title = (
            event.target as unknown as {
                title: { value: string };
            }
        ).title.value;
        const content = (
            event.target as unknown as {
                content: { value: string };
            }
        ).content.value;

        const updatedPost = await updatePostMutation.mutateAsync({
            id: editingPost.id,
            title,
            content,
            categoryId: editingPost.categoryId!,
            imageThumbnail: editingPost.image!,
        });

        if (updatedPost) {
            alert("Post updated successfully.");
            window.location.reload();
        } else {
            alert("Failed to update post.");
        }
    };

    return (
        <>
            <div className="mx-auto w-full max-w-4xl p-4 py-5">
                <div className="flex flex-col rounded-lg bg-white p-2 px-8 shadow-lg">
                    <h1 className="ml-5 mt-5 text-3xl font-semibold">Manage Posts</h1>
                    <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                    <div className="mt-5">
                        <div className="space-y-8">
                            {(posts?.length ?? 0) > 0 ? (
                                posts!.map((post) => (
                                    <div key={post.id} className="rounded-lg border p-4">
                                        {editingPost?.id === post.id ? (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <input type="hidden" name="id" value={post.id} />
                                                <div>
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                        Title
                                                    </label>
                                                    <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="title" name="title" placeholder="Post title..." required defaultValue={post.title} />
                                                </div>
                                                <div>
                                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                                        Content
                                                    </label>
                                                    <textarea id="content" className="h-64 w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Post content..." name="content" required defaultValue={post.content ?? ""} />
                                                </div>
                                                <div className="flex justify-end space-x-2">
                                                    <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
                                                        Save
                                                    </button>
                                                    <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={handleCancelEdit}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                                                <p className="mb-4">{post.content}</p>
                                                <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700" onClick={() => handleEdit(post as Post)}>
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No posts found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
