import Head from "next/head";
import RegisterComponent from "./components/register/register";
import React from "react";

export default function Register() {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Register an account to the coolest blog ever." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <RegisterComponent />
                </div>
            </main>
        </>
    );
}
