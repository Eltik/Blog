import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export function Posts() {
    const posts = api.post.getPosts.useQuery({ limit: 10 });
    const categories = api.category.getCategories.useQuery();

    return (
        <>
            <div className="flex h-full w-full space-x-4 rounded-3xl bg-gray-200 p-6">
                {(posts.data?.length ?? 0) > 0 ? (
                    posts.data?.map((post) => (
                        <Link key={post.id} href={`/blogs/${post.id}`}>
                            <div className="duration-115 relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:scale-105">
                                <div className="h-56 overflow-hidden">
                                    <Image src="/posts/temp.jpeg" alt="A Kid Called Beast" className="h-full w-full object-cover" width={50} height={50} />
                                </div>

                                <div className="relative bg-white p-6">
                                    <div className="absolute left-[-40px] top-[-40px] z-0 h-32 w-32 rounded-full bg-gray-200 opacity-30 blur-xl" />
                                    <div className="absolute bottom-[-30px] right-[-30px] z-0 h-40 w-40 rounded-full bg-gray-200 opacity-20 blur-lg" />

                                    <div className="relative z-10">
                                        <div className="mb-2">
                                            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase text-white">Latest</span>
                                        </div>
                                        <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
                                        <p className="mt-2 line-clamp-2 text-gray-700">{post.content}</p>
                                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                            <span>{categories?.data?.find((category) => category.id === post.categoryId)?.name}</span>
                                            <span>{`${new Date(post.updatedAt).getDay() - 1} March ${new Date(post.updatedAt).getFullYear()}`} • 5 min read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex w-full flex-row gap-8">
                        {[...(Array(3) as number[])].map((_, index) => (
                            <div className="w-full max-w-sm animate-pulse space-y-4" key={index}>
                                <div className="h-56 w-full rounded-3xl bg-gray-300" />
                                <div className="space-y-2 p-6">
                                    <div className="h-4 w-1/4 rounded bg-gray-300" />
                                    <div className="h-6 w-3/4 rounded bg-gray-300" />
                                    <div className="h-4 w-full rounded bg-gray-300" />
                                    <div className="h-4 w-5/6 rounded bg-gray-300" />
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="h-4 w-1/4 rounded bg-gray-300" />
                                        <div className="h-4 w-1/4 rounded bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
