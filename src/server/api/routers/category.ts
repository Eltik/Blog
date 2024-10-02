import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
    hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),

    create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
        return ctx.db.categories.create({
            data: {
                name: input.name,
            },
        });
    }),

    getCategory: publicProcedure.input(z.object({ id: z.number().int().positive() })).query(async ({ ctx, input }) => {
        return ctx.db.categories.findUnique({
            where: {
                id: input.id,
            },
        });
    }),

    getCategoryByName: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
        return ctx.db.categories.findUnique({
            where: {
                name: input.name,
            },
        });
    }),

    getCategories: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.categories.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),
});
