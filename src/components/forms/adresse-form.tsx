import {useEffect, useState} from "react";
import {addAdresse, editAdresse} from "@/services/data/data-adresses";
import {Button} from "@/components/ui/button";

export default function AdresseForm({ onSubmit, data = null, isEditMode, refreshData }:
{ onSubmit: any, data?: any, isEditMode: boolean, refreshData: any }) {
    const [errorMessage, setErrorMessage] = useState<any | null>(null);
    const [successMessage, setSuccessMessage] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        numero: 0,
        rue: '',
        complementaire: '',
        cp: '',
        ville: '',
        pays: '',
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    // Gestion des changements dans les inputs
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = isEditMode
                ? await editAdresse(formData)
                : await addAdresse(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData();
                onSubmit(result.data.id);
            } else {
                setErrorMessage(result.message);
            }
        } catch (e: any) {
            console.log(e);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="mt-5">
                <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} une adresse</h2>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Numéro:</label>
                    <input
                        type="number"
                        name="numero"
                        value={formData.numero || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={formData.rue || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Complémentaire:</label>
                    <input
                        type="text"
                        name="complementaire"
                        value={formData.complementaire || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Code postal: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="cp"
                        value={formData.cp}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Ville: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Pays: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="pays"
                        value={formData.pays}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
}
