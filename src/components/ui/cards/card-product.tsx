import {Button} from "@/components/ui/button";
import {deleteProduct} from "@/services/data/data-products";
import {useState} from "react";

export function CardProduct({ data, onEditData, refreshData }: any) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const deleteData = async (id: number) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await deleteProduct(id);

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
        <div className="card bg-background-200 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{data.nom}</h2>

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