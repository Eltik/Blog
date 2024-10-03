import Head from "next/head";

import Navigation from "./components/navigation";
import Hero from "./components/home/hero";
import Posts from "./components/home/posts";
import React from "react";

export default function Home() {
    return (
        <>
            <Head>
                <title>Eltik&apos;s Blog</title>
                <meta name="description" content="The coolest blog ever." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl bg-bg-hero">
                    <Navigation />
                    <Hero />
                </div>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <Posts />
                </div>
            </main>
        </>
    );
}
