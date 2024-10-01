import { Posts } from "~/app/_components/home/posts";
import { api, HydrateClient } from "~/trpc/server";
import { Hero } from "./_components/home/hero";
import { Navigation } from "./_components/navigation";

/**
 * Credit: https://dribbble.com/shots/20802507-Blog-posts
 */
export default async function Home() {
    const hello = await api.post.hello({ text: "from tRPC" });

    void api.post.getPosts.prefetch({
        limit: 10,
    });

    return (
        <HydrateClient>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl bg-bg-hero">
                    <Navigation />
                    <Hero />
                </div>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <Posts />
                </div>
            </main>
        </HydrateClient>
    );
}
