import Link from "next/link";
import { api } from "~/utils/api";

export function Register() {
    const registerMutation = api.user.create.useMutation();
    const userMutation = api.user.getUserByEmail.useMutation();

    const handleLogin = async () => {
        const email = document.getElementById("email") as HTMLInputElement;
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        if (!email || !password) {
            return;
        }

        const user = {
            email: email.value,
            username: username.value,
            password: password.value,
        };

        try {
            const userData = await userMutation.mutateAsync({ email: user.email });
            if (!userData) {
                // Create user
                const data = await registerMutation.mutateAsync({
                    email: user.email,
                    name: user.username,
                    password: user.password,
                });

                console.log(data);

                alert("User created successfully.");
            } else {
                alert("User already exists.");
            }
        } catch (error) {
            console.error(
                (
                    error as {
                        message: {
                            message: {
                                code: string;
                                minimum: number;
                                type: string;
                                inclusive: boolean;
                                exact: boolean;
                                message: string;
                                path: string[];
                            };
                        }[];
                    }
                ).message,
            );

            alert(
                (
                    error as {
                        message: {
                            message: {
                                code: string;
                                minimum: number;
                                type: string;
                                inclusive: boolean;
                                exact: boolean;
                                message: string;
                            };
                        }[];
                    }
                ).message,
            );
        }
    };

    return (
        <main className="flex-1">
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white p-5 shadow-lg">
                    <h1 className="ml-5 mt-5 text-3xl font-semibold">Register</h1>
                    <div className="mx-auto mt-5 h-[1px] w-[95%] rounded-lg bg-zinc-500/30"></div>
                    <div className="mt-5 flex w-full flex-col">
                        <label htmlFor="username" className="text-lg font-semibold">
                            Username
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="username" placeholder="Enter an username..." type="text" />
                        <label htmlFor="email" className="text-lg font-semibold">
                            Email
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="email" placeholder="Enter your email..." type="email" />
                        <label htmlFor="password" className="mt-5 text-lg font-semibold">
                            Password
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-[hsl(240,5.9%,90%)] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(240,5%,64.9%)] focus-visible:ring-offset-2" id="password" placeholder="Enter your password..." type="password" />
                        <button className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white" onClick={handleLogin}>
                            Register
                        </button>
                        <Link className="mt-5 w-full rounded-lg bg-zinc-500 p-2 font-semibold text-white" href={"/login"}>
                            Already registered? Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
