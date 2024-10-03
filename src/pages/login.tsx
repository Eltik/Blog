import Head from "next/head";
import LoginComponent from "./components/login/login";
import React from "react";

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login to the coolest blog ever." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <LoginComponent />
                </div>
            </main>
        </>
    );
}
