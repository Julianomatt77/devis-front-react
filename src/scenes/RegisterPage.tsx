import {useEffect} from "react";
import RegisterForm from "@/components/forms/register-form";

export default function RegisterPage() {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = `Devis Generator/Register`;

        return () => {
            document.title = originalTitle;
        };
    }, );

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div>
                    <h1 className={"text-4xl font-bold capitalize"}>Créer un compte</h1>
                </div>
                <RegisterForm />
                <div>
                    <p>Vous avez déjà un compte ? <a href="/login" title={"Se connecter"} className={"underline"}>Se connecter</a></p>
                </div>
            </div>
        </main>
    );
}