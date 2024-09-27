"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function Posts() {
    const [posts] = api.post.getPosts.useSuspenseQuery({ limit: 10 });

    const utils = api.useUtils();
    const [name, setName] = useState("");
    const createPost = api.post.create.useMutation({
        onSuccess: async () => {
            await utils.post.invalidate();
            setName("");
        },
    });

    return (
        <div className="w-full max-w-xs">
            {posts ? posts.map((post) => {
                return <p key={post.id}>{post.title}</p>;
            }) : (
                <p>You have no posts yet.</p>
            )}
        </div>
    );
}
