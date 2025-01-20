import {useEffect, useState} from "react";
import {getAdresses} from "@/services/data/data-adresses";
import {addEntreprise, editEntreprise} from "@/services/data/data-entreprises";
import {stringAdresse} from "@/services/lib/utils";
import AdresseForm from "@/components/forms/adresse-form";
import {Button} from "@/components/ui/button";

export default function EntrepriseForm({ onSubmit, entrepriseData, isEditMode, refreshData }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [adressesList, setAdressesList] = useState([]);
    const [showAdresseForm, setShowAdresseForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nom: '',
        siret: '',
        codeApe: '',
        tvaIntracom: '',
        email: '',
        telephone1: '',
        telephone2: '',
        web: '',
        contact: '',
        adresse: '',
    });

    // Récupérer la liste d'adresses
    const fetchAdresses = async () => {
        const adresses = await getAdresses();
        setAdressesList(adresses.data);
    };

    useEffect(() => {
        fetchAdresses();
    }, []);

    useEffect(() => {
        if (entrepriseData) {

            setFormData({
                ...entrepriseData,
                adresse: entrepriseData.adresse?.id || '',
            });
        }
    }, [entrepriseData]);

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la sélection de l'adresse
    const handleAdresseChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'other') {
            setShowAdresseForm(true);
            setFormData((prevData) => ({ ...prevData, adresse: '' }));
        } else {
            setShowAdresseForm(false);
            setFormData((prevData) => ({ ...prevData, adresse: selectedValue }));
        }
    };

    // Mise à jour des données d'adresse personnalisée après l'ajout dans AdresseForm
    const handleCustomAdresseSubmit = async (newAdresseData) => {
        await fetchAdresses();

        setFormData((prevData) => ({
            ...prevData,
            adresse: newAdresseData,
        }));

        setShowAdresseForm(false);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = isEditMode
                ? await editEntreprise(formData)
                : await addEntreprise(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData();
                // Fermez la modal après la soumission
                onSubmit();
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    };

    return (
    <div id={"company-form-wrapper"}  className={"flex max-h-full w-full"}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4 w-3/4 ">
            <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} une entreprise</h2>
            <div className={"flex flex-wrap gap-4 justify-start"}>
                <div>
                    <label className="mb-3 block text-xs font-medium">Nom: <span className={"text-red-700"}>*</span></label>
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
                    <label className="mb-3 block text-xs font-medium">Siret: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="siret"
                        value={formData.siret || ''}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Code APE:</label>
                    <input
                        type="text"
                        name="codeApe"
                        value={formData.codeApe || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Numéro de TVA intracommunautaire:</label>
                    <input
                        type="text"
                        name="tvaIntracom"
                        value={formData.tvaIntracom || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Téléphone 1:</label>
                    <input
                        type="tel"
                        name="telephone1"
                        value={formData.telephone1 || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Téléphone 2:</label>
                    <input
                        type="tel"
                        name="telephone2"
                        value={formData.telephone2 || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Site internet:</label>
                    <input
                        type="url"
                        name="web"
                        value={formData.web || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Nom du contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-xs font-medium">Adresse:</label>
                    <select
                        name="adresse"
                        value={formData.adresse || ''}
                        onChange={handleAdresseChange}
                        className="input input-bordered w-full"
                    >
                        <option value="">Sélectionnez une adresse</option>
                        {adressesList.map((adresse) => (
                            <option key={adresse.id} value={adresse.id}>
                                {stringAdresse(adresse)}
                            </option>
                        ))}
                        <option value="other">Autre</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
        {/* Affiche AdresseForm en dehors du formulaire principal si "Autre" est sélectionné */}
        {showAdresseForm && (
            <AdresseForm
                onSubmit={handleCustomAdresseSubmit}
                isEditMode={false}
                refreshData={refreshData}
            />
        )}
    </div>
    );
}