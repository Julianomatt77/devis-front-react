import reactLogo from "@/assets/react.svg";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";

function homePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="text-center py-12">
                <h1 className="text-4xl font-bold text-text">
                    Devis Generator
                </h1>
                <p className="mt-4 text-lg text-text-800">
                    Générateur de devis gratuit.
                </p>
                <p className="mt-4 text-lg text-text-800">
                    Créez des devis professionnels pour vos clients en quelques clics.
                </p>
                {/*<Link*/}
                {/*    to="/register"*/}
                {/*    className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition"*/}
                {/*>*/}
                <Link to="/register" title={"Créer un compte"}>
                    <Button className={"mt-6 bg-primary dark:bg-secondary-200 text-text-100 dark:text-text-800"}>Commencer</Button>
                </Link>
            </header>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-foreground">
                        Pourquoi utiliser notre service ?
                    </h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-primary dark:bg-secondary-200 shadow rounded-lg">
                            <h3 className="text-xl font-semibold text-text-100 dark:text-text">Simplicité</h3>
                            <p className="mt-2 text-text-100 dark:text-text-800">
                                Une interface intuitive pour créer vos devis rapidement.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-primary dark:bg-secondary-200 shadow rounded-lg">
                            <h3 className="text-xl font-semibold text-text-100 dark:text-text">
                                Personnalisation
                            </h3>
                            <p className="mt-2 text-text-100 dark:text-text-800">
                                Ajoutez facilement vos informations, services et tarifs.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-primary dark:bg-secondary-200 shadow rounded-lg">
                            <h3 className="text-xl font-semibold text-text-100 dark:text-text">100% Gratuit</h3>
                            <p className="mt-2 text-text-100 dark:text-text-800">
                                Aucun abonnement nécessaire, commencez dès maintenant.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            {/*<footer className="py-6 text-center mt-auto">*/}
            {/*    <p>&copy; {new Date().getFullYear()} Générateur de Devis. Tous droits réservés.</p>*/}
            {/*</footer>*/}
        </div>
    );
    /*
  return (
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <h1 className={"md:text-6xl sm:text-4xl text-2xl"}>Devis Generator</h1>
              <img
                  className="dark:invert"
                  src="/vite.svg"
                  alt="Vite logo"
                  width={180}
                  height={38}
              />
              <ol className="list-inside list-decimal text-sm text-center sm:text-left">
                  <li className="mb-2">
                      Get started by editing{" "}
                      <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                          src/App.tsx
                      </code>
                      .
                  </li>
                  <li>Save and see your changes instantly.</li>
              </ol>

              <div className="flex gap-4 items-center flex-col sm:flex-row">
                  <a
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                      href="https://react.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <img
                          className="dark:invert"
                          src={reactLogo}
                          alt="React Logo"
                          width={20}
                          height={20}
                      />
                      React
                  </a>
                  <a
                      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                      href="https://vite.dev/guide/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      Read Vite docs
                  </a>
              </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
              <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  <img
                      aria-hidden
                      src="/file.svg"
                      alt="File icon"
                      width={16}
                      height={16}
                  />
                  Learn NextJs
              </a>
              <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  <img
                      aria-hidden
                      src="/window.svg"
                      alt="Window icon"
                      width={16}
                      height={16}
                  />
                  Examples
              </a>
              <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  <img
                      aria-hidden
                      src="/globe.svg"
                      alt="Globe icon"
                      width={16}
                      height={16}
                  />
                  Go to nextjs.org →
              </a>
          </footer>
      </div>
  );
     */
}

export default homePage;