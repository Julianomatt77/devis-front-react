import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import devisgenerator_logo from "@/assets/logo_devisgenerator_100x100.webp";
import demo_video from "@/assets/demo.webm";

function homePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="text-center py-12">
                <div className="flex items-center justify-center gap-8">
                    <h1 className="text-4xl font-bold text-text">
                        Devis Generator
                    </h1>
                    <div>
                        <img
                            src={devisgenerator_logo}
                            alt="Logo Devis Generator"
                            className="w-100 h-100 mx-auto dark:bg-white rounded-full"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>

                <p className="mt-4 text-lg text-text-800">
                    Générateur de devis gratuit.
                </p>
                <p className="mt-4 text-lg text-text-800">
                    Créez des devis professionnels pour vos clients en quelques clics.
                </p>
                <Link to="/register" title={"Créer un compte"}>
                    <Button className={"mt-6 bg-primary dark:bg-secondary-200 text-text-100 dark:text-text-800"}>Commencer</Button>
                </Link>
            </header>


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
            <section className="flex flex-row justify-center items-center py-16">
                <video
                    className="w-full h-full lg:w-3/4 lg:h-3/4 border border-text-900 shadow-lg rounded-lg"
                    src={demo_video}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </section>
        </div>
    );
}

export default homePage;