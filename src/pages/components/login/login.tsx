/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Link from "next/link";
import { useUserData } from "~/store/store";
import { api } from "~/utils/api";

export function Login() {
    const loginMutation = api.user.login.useMutation();

    const handleLogin = async () => {
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        if (!email || !password) {
            return;
        }

        const user = {
            email: email.value,
            password: password.value,
        };

        try {
            const data = await loginMutation.mutateAsync(user);
            useUserData.setState({ user: data });

            alert("Logged in successfully.");

            window.location.href = "/";
        } catch (error) {
            console.error(error);

            alert("Invalid credentials.");
        }
    };

    return (
        <main className="flex-1">
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white p-5 shadow-lg">
                    <h1 className="ml-5 mt-5 text-3xl font-semibold">Login</h1>
                    <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                    <div className="mt-5 flex w-full flex-col">
                        <label htmlFor="email" className="text-lg font-semibold">
                            Email
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="email" placeholder="Enter your email..." type="email" />
                        <label htmlFor="password" className="mt-5 text-lg font-semibold">
                            Password
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="password" placeholder="Enter your password..." type="password" />
                        <button className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white" onClick={handleLogin}>
                            Login
                        </button>
                        <Link className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white" href={"/register"}>
                            Not registered? Register
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
