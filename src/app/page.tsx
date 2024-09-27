import Link from "next/link";

import { Posts } from "~/app/_components/home/posts";
import { api, HydrateClient } from "~/trpc/server";
import { Hero } from "./_components/home/hero";
import { Navigation } from "./_components/navigation";

export default async function Home() {
    const hello = await api.post.hello({ text: "from tRPC" });

    void api.post.getPosts.prefetch({
        limit: 10,
    });

    return (
        <HydrateClient>
            <main>
                <div className="bg-bg-hero rounded-3xl max-w-[95%] mx-auto mt-5">
                    <Navigation />
                    <Hero />
                </div>
                <div className="rounded-3xl max-w-[95%] mx-auto mt-5">
                    <Posts />
                </div>
            </main>
        </HydrateClient>
    );
}
