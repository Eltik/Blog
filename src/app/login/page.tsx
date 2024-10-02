import { HydrateClient } from "~/trpc/server";
import { Login as LoginComponent } from "../_components/login/login";

export default async function Login() {
    return (
        <HydrateClient>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <LoginComponent />
                </div>
            </main>
        </HydrateClient>
    );
}
