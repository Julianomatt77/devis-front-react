import {Button} from "@/components/ui/button";
import {CircleCheckBig, CircleDashed} from "lucide-react";
import {deleteDevis} from "@/services/data/data-devis";
import {formatDate, transformPriceToEuro} from "@/services/lib/utils";
import {useState} from "react";
import WarningModal from "@/components/WarningModal";
import Modal from "@/components/ui/modal";

export function CardDevis({ data, onEditData, refreshData }: any) {
    const {reference, client, createdAt, updatedAt, paidAt, totalTTC, entreprise} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const openWarningModal = () => setIsWarningOpen(true);
    const closeWarningModal = () => setIsWarningOpen(false);

    const createdAtDate = formatDate(createdAt);
    const updatedAtDate = updatedAt ? formatDate(updatedAt): null;
    const totalTTCCalcule = transformPriceToEuro(totalTTC);

    const paid = paidAt ? "checked" : ""

    const deleteData = async (id: number) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await deleteDevis(id);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData()
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    }

    return (
        <li className="py-3 sm:py-4 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-0">
                <div className="flex min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400"}>Référence: </span>{reference}
                    </p>
                </div>
                <div className="flex min-w-0 gap-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400 capitalize"}>Client: </span>
                        <span className={"uppercase"}>{client.nom}</span> {client.prenom}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400 capitalize"}>Entreprise: </span>
                        {entreprise.nom}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {totalTTCCalcule}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400"}>Créé le: </span>{createdAtDate}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {updatedAt && <span><span className={"dark:text-gray-400"}>Mis à jour le: </span>{updatedAtDate}</span>}
                    </p>
                </div>
                <div className="flex flex-wrap items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className="justify-center">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                {!paid && <CircleDashed className=""/>}
                                {paid && <CircleCheckBig className="text-green-500"/>}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-wrap items-center justify-center gap-16"}>
                <Button onClick={() => onEditData(data)}>Modifier / Voir</Button>
                <Button onClick={openWarningModal} variant="destructive">Supprimer</Button>
                {isWarningOpen && (
                    <Modal onClose={closeWarningModal}>
                        <WarningModal
                            onClose={closeWarningModal}
                            onConfirm={() => {
                                closeWarningModal();
                                deleteData(data.id);
                            }}
                            type="devis"
                        />
                    </Modal>
                )}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </li>
    )
}