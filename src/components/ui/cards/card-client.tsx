import {useState} from "react";
import {stringAdresse} from "@/services/lib/utils";
import {deleteClients} from "@/services/data/data-clients";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

export function CardClient({ data, onEditData, refreshData }) {
    const {adresse, email, nom, prenom, telephone} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    let displayAdresse = '';

    if (adresse){
        displayAdresse = stringAdresse(adresse)
    }

    const deleteClient = async (clientId) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await deleteClients(clientId);

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
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{nom} {prenom}</h2>
                <p>{displayAdresse || null}</p>
                <p className="card-subtitle">{telephone}</p>
                <p className="card-subtitle">{email}</p>
                <div className="card-actions justify-end">
                    <Button onClick={() => {navigate(`/devis?client=${data.id}`)}} variant={"secondary"}>Devis</Button>
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteClient(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}