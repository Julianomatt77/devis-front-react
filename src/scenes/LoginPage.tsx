import {useEffect} from "react";

export default function LoginPage() {
  useEffect(() => {
    const originalTitle = document.title; // Pour cleanup

    document.title = `Devis Generator/Login`;

    // Cleanup
    return () => {
      document.title = originalTitle;
    };
  }, );


  return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div>
            <h1 className={"text-4xl font-bold capitalize"}>Se connecter</h1>
          </div>
          {/*<LoginForm />*/}
          <div>
            <p>Pas encore de compte ? <a href="/register" title={"s'enregistrer"} className={"underline"}>Créer un compte</a></p>
          </div>
        </div>
      </main>
  );
}