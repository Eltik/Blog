import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
    hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),

    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                email: z.string().email(),
                password: z.string().min(8),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const hashedPassword = await bcrypt.hash(input.password, 10);

            return ctx.db.user.create({
                data: {
                    email: input.email,
                    name: input.name,
                    password: hashedPassword,
                },
            });
        }),

    login: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(8),
            }),
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                throw new Error("User not found.");
            }

            const isValid = await bcrypt.compare(input.password, String(user.password));

            if (!isValid) {
                throw new Error("Invalid password.");
            }

            return user;
        }),

    getUser: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
        return ctx.db.user.findUnique({
            where: { id: input.id },
        });
    }),

    getUserByEmail: publicProcedure.input(z.object({ email: z.string().email() })).query(async ({ ctx, input }) => {
        return ctx.db.user.findUnique({
            where: { email: input.email },
        });
    }),

    getUsers: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.user.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),
});
