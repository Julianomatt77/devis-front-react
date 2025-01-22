import {useEffect, useState} from "react";
import {getAdresses} from "@/services/data/data-adresses";
import {addClient, editClient} from "@/services/data/data-clients";
import {stringAdresse} from "@/services/lib/utils";
import {Button} from "@/components/ui/button";
import AdresseForm from "@/components/forms/adresse-form";

export default function ClientForm({ onSubmit, clientData = null, isEditMode, refreshData }:
{ onSubmit: any, clientData?: any, isEditMode: boolean, refreshData: any }) {
    const [errorMessage, setErrorMessage] = useState<any | null>(null);
    const [successMessage, setSuccessMessage] = useState<any | null>(null);
    const [adressesList, setAdressesList] = useState([]);
    const [showAdresseForm, setShowAdresseForm] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
    });

    // Récupérer la liste d'adresses
    const fetchAdresses = async () => {
        const adresses = await getAdresses();
        setAdressesList(adresses.data);
    };

    useEffect(() => {
        fetchAdresses(); // Charger la liste d'adresses au montage du composant
    }, []);

    useEffect(() => {
        if (clientData) {
            setFormData({
                ...clientData,
                adresse: clientData.adresse?.id || '', // Utilisez l'ID de l'adresse si elle existe
            });
        }
    }, [clientData]);

    // Gestion des changements dans les inputs
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la sélection de l'adresse
    const handleAdresseChange = (e: any) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'other') {
            setShowAdresseForm(true); // Afficher le formulaire d'adresse
            setFormData((prevData) => ({ ...prevData, adresse: '' }));
        } else {
            setShowAdresseForm(false); // Masquer le formulaire d'adresse si une autre option est choisie
            setFormData((prevData) => ({ ...prevData, adresse: selectedValue }));
        }
    };

    // Mise à jour des données d'adresse personnalisée après l'ajout dans AdresseForm
    const handleCustomAdresseSubmit = async (newAdresseData: any) => {
        // Réactualiser la liste des adresses après l'ajout
        await fetchAdresses();

        // Sélectionner automatiquement la nouvelle adresse ajoutée
        setFormData((prevData) => ({
            ...prevData,
            adresse: newAdresseData, // Utilisez l'ID de la nouvelle adresse
        }));

        // Masquer le formulaire d'adresse
        setShowAdresseForm(false);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        // Appelez l'API pour ajouter un client
        try {
            const result = isEditMode
                ? await editClient(formData)
                : await addClient(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData();
                // Fermez la modal après la soumission
                onSubmit(result.data.id);
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    };

    return (
    <div className={"flex"}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} un client</h2>
            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Nom: <span className={"text-red-700"}>*</span></label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom || ''}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={formData.prenom || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Téléphone:</label>
                <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Adresse:</label>
                <select
                    name="adresse"
                    value={formData.adresse || ''}
                    onChange={handleAdresseChange}
                    className="input input-bordered w-full"
                >
                    <option value="">Sélectionnez une adresse</option>
                    {adressesList.map((adresse: Adresse) => (
                        <option key={adresse.id} value={adresse.id}>
                            {stringAdresse(adresse)}
                        </option>
                    ))}
                    <option value="other">Autre</option>
                </select>
            </div>

            <div className="flex justify-end">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
        {/* Affiche AdresseForm en dehors du formulaire principal si "Autre" est sélectionné */}
        {showAdresseForm && (
            <AdresseForm
                onSubmit={handleCustomAdresseSubmit} // Fonction de callback après soumission
                isEditMode={false}
                refreshData={refreshData}
            />
        )}
    </div>
    );
}