import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),

    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                categoryId: z.number().int().positive(),
                authorId: z.number().int().positive(),
                content: z.string().min(1),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.post.create({
                data: {
                    title: input.name,
                    categoryId: input.categoryId,
                    authorId: input.authorId,
                    content: input.content,
                    published: true,
                },
            });
        }),

    getPost: publicProcedure.input(z.object({ id: z.number().int().positive() })).query(async ({ ctx, input }) => {
        return ctx.db.post.findUnique({
            where: {
                id: input.id,
            },
        });
    }),

    getPosts: publicProcedure.input(z.object({ limit: z.number().int().positive() })).query(async ({ ctx, input }) => {
        return ctx.db.post.findMany({
            orderBy: { createdAt: "desc" },
            take: input.limit,
        });
    }),

    getLatestPost: publicProcedure.mutation(async ({ ctx }) => {
        const post = await ctx.db.post.findFirst({
            orderBy: { createdAt: "desc" },
        });

        return post ?? null;
    }),
});
