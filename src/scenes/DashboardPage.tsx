import WarningModal from "@/components/WarningModal";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {getDevis} from "@/services/data/data-devis";
import {getClients} from "@/services/data/data-clients";
import {useAuth} from "@/services/context/AuthContext";
import {deleteAccount} from "@/services/lib/actions";
import Modal from "@/components/ui/modal";
import CardWrapper from "@/components/card-wrapper";
import {Link, useNavigate} from "react-router-dom";

export default function DashboardPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [clientsList, setClientsList] = useState<[]>(false);
    const [devisList, setDevisList] = useState<[]>(false);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const openWarningModal = () => setIsWarningOpen(true);
    const closeWarningModal = () => setIsWarningOpen(false);

    useEffect(() => {
        async function fetchData() {
            const clients = await getClients();
            const devis = await getDevis();

            setClientsList(clients.data.slice(0, 10));
            setDevisList(devis.data.filter((devis) => !devis.deletedAt).slice(0, 10));
        }
        fetchData();
    }, []);

    const deleteUserAccount = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await deleteAccount();

            if (result.status){
                setSuccessMessage(result.message);

                setTimeout(() => {
                    logout()
                    navigate('/');
                }, 1000);
            } else {
                setErrorMessage(`Erreur: ${result.message}`);
            }

        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    }

    return (
        <main className="w-full p-4 shadow sm:p-8 ">
            <div className={"flex justify-center items-center mb-8"}>
                <Button onClick={openWarningModal} variant={"destructive"}>Supprimer mon compte</Button>
            </div>
            {isWarningOpen && (
                <Modal onClose={closeWarningModal}>
                    <WarningModal
                        onClose={closeWarningModal}
                        onConfirm={() => {
                            closeWarningModal();
                            deleteUserAccount();
                        }}
                        type="compte utilisateur"
                    />
                </Modal>
            )}

            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className={"flex flex-wrap items-start justify-between gap-4"}>
                <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers clients</h5>
                        <Link to="/clients" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" title={"Voir tous les clients"}>
                            Tout voir
                        </Link>
                    </div>
                    {clientsList && <CardWrapper data={clientsList} type="dashboardClient" isDashboard={true}/>}
                </section>

                <section className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers devis</h5>
                        <Link to="/devis" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" title={"Voir tous les devis"}>
                            Tout voir
                        </Link>
                    </div>
                    {devisList && <CardWrapper data={devisList} type="dashboardDevis" isDashboard={true}/>}
                </section>
            </div>
        </main>
    )
}