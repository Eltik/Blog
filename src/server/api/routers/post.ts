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
                imageThumbnail: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.post.create({
                data: {
                    title: input.name,
                    categoryId: input.categoryId,
                    authorId: input.authorId,
                    content: input.content,
                    image: input.imageThumbnail,
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

    getPosts: publicProcedure
        .input(
            z.object({
                limit: z.number().int().positive(),
            }),
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.post.findMany({
                orderBy: { createdAt: "desc" },
                take: input.limit,
            });
        }),

    getPostsByPage: publicProcedure
        .input(
            z.object({
                limit: z.number().int().positive(),
                offset: z.number().int(),
            }),
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.post.findMany({
                orderBy: { createdAt: "desc" },
                take: input.limit,
                skip: input.offset,
            });
        }),

    getTotalPosts: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.post.count();
    }),

    editPost: publicProcedure
        .input(
            z.object({
                id: z.number().int().positive(),
                title: z.string().min(1),
                content: z.string().min(1),
                categoryId: z.number().int().positive(),
                imageThumbnail: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.post.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.title,
                    content: input.content,
                    categoryId: input.categoryId,
                    image: input.imageThumbnail,
                    updatedAt: new Date(Date.now()),
                },
            });
        }),
});
