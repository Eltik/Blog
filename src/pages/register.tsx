import { Register as RegisterComponent } from "./components/register/register";

export default function Login() {
    return (
        <main>
            <div className="mx-auto mt-5 max-w-[95%] rounded-3xl">
                <RegisterComponent />
            </div>
        </main>
    );
}
