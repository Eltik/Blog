import { Admin as AdminComponent } from "./components/admin/admin";

export default function Admin() {
    return (
        <main>
            <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                <AdminComponent />
            </div>
        </main>
    );
}
