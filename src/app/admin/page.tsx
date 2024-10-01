import { HydrateClient } from "~/trpc/server";
import { Admin as AdminComponent } from "../_components/admin/admin";

export default async function Admin() {
    return (
        <HydrateClient>
            <main>
                <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                    <AdminComponent />
                </div>
            </main>
        </HydrateClient>
    );
}
