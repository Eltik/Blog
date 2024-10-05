import type { NextPage } from "next";
import { api } from "~/utils/api";
import React from "react";
import Head from "next/head";
import Navigation from "../components/navigation";

import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

const Blog: NextPage<Props> = ({ id }) => {
    const post = api.post.getPost.useQuery({ id });

    return (
        <>
            <Head>
                <title>{post.data?.title}</title>
                <meta name="description" content={post.data?.content ?? "The coolest blog ever."} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl bg-bg-hero">
                    <Navigation />
                    <div className="px-11 py-5">
                        {post?.data ? (
                            <div>
                                <h1 className="text-6xl font-bold tracking-wide text-white">{post?.data.title}</h1>
                                <div className="mt-5 text-white">
                                    <MarkdownPreview source={post?.data.content ?? ""} />
                                </div>
                            </div>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async ({ query }: { query: { id: string } }) => {
    const { id } = query;

    return {
        props: {
            id: Number(id),
        },
    };
};

export default Blog;

interface Props {
    id: number;
}
