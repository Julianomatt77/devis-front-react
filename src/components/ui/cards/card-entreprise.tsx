import {Button} from "@/components/ui/button";
import {deleteEntreprise} from "@/services/data/data-entreprises";
import {stringAdresse} from "@/services/lib/utils";
import {useState} from "react";

export function CardEntreprise({ data, onEditData, refreshData }) {
    const {adresse, codeApe, contact, email,  nom, siret, telephone1, telephone2, tvaIntracom, web} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    let displayAdresse = '';

    if (adresse){
        displayAdresse = stringAdresse(adresse)
    }

    const deleteData = async (id) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteEntreprise(id);

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
        <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{nom}</h2>
                <p>siret: {siret}</p>
                {tvaIntracom && <p>Numéro de TVA intracommunautaire: {tvaIntracom}</p>}
                {codeApe && <p>Code APE: {codeApe}</p>}
                { contact && <p>{contact}</p>}
                { web && <a href={web} target={"blank"}>{web}</a>}
                <p>{displayAdresse || null}</p>
                {telephone1 && <p className="card-subtitle">{telephone1}</p>}
                {telephone2 && <p className="card-subtitle">{telephone2}</p>}
                {email && <p className="card-subtitle">{email}</p>}
                <div className="card-actions justify-end">
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteData(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}