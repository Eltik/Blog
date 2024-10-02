/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useStore } from "zustand";
import { useUserData } from "~/store/store";
import { api } from "~/trpc/server";
import type { User } from "~/types";

export function Login() {
    const userData = useStore(useUserData, (state: any) => state.user as User);

    const handleLogin = async () => {
        const email = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        if (!email || !password) {
            return;
        }

        const user = {
            email: email.value,
            password: password.value,
        };

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await api.user.login(user);
    };

    return (
        <main className="flex-1">
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white p-5 shadow-lg">
                    <h1 className="ml-5 mt-5 text-3xl font-semibold">Login</h1>
                    <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                    <div className="mt-5 flex w-full flex-col">
                        <label htmlFor="username" className="text-lg font-semibold">
                            Username
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="username" placeholder="Enter your email..." type="email" />
                        <label htmlFor="password" className="mt-5 text-lg font-semibold">
                            Password
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="password" placeholder="Enter your password..." type="password" />
                        <button className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white">Register</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
