import {Button} from "@/components/ui/button";
import {deleteAdresses} from "@/services/data/data-adresses";
import {stringAdresse} from "@/services/lib/utils";
import {useState} from "react";

export function CardAdresse({ data, onEditData, refreshData }: any) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const displayAdresse = stringAdresse(data)

    const deleteAdresse = async (id: number) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteAdresses(id);

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
                <h2 className="card-title">{displayAdresse}</h2>

                <div className="card-actions justify-end">
                    {/*<Button>Voir</Button>*/}
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteAdresse(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}