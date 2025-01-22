import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {addPrestation, editPrestation} from "@/services/data/data-prestations";
import ProductForm from "@/components/forms/product-form";
import {getProducts} from "@/services/data/data-products";

export default function PrestationForm({ onSubmit, prestationData, isEditMode, devisId }:
    { onSubmit: any, prestationData: any, isEditMode: boolean, devisId: number }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [productsList, setProductsList] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [formData, setFormData] = useState<Prestation>({
        id: '',
        element: '',
        devis: devisId,
        qty: 0,
        prixHT: 0,
        tvaPercentage: 0,
    });

    // Récupérer la liste d'adresses
    const fetchProducts = async () => {
        const products = await getProducts();
        setProductsList(products.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (prestationData) {
            setFormData({
                ...prestationData,
                element: prestationData.element?.id || '',
                devis: devisId,
                prixHT: prestationData.prixHT / 100
            });
        }
    }, [prestationData]);

    // Gestion des changements dans les inputs
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'qty' || name === 'prixHT' || name === 'tvaPercentage' ? Number(value) : value,
        }));
    };

    // Gestion de la sélection d'élément'
    const handleProductChange = (e: any) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'other') {
            setShowProductForm(true);
            setFormData((prevData) => ({ ...prevData, element: '' }));
        } else {
            setShowProductForm(false);
            setFormData((prevData) => ({ ...prevData, element: Number(selectedValue) }));
        }
    };

    // Mise à jour des données des éléments personnalisée après l'ajout dans AdresseForm
    const handleCustomProductSubmit = async (newProductData: Product) => {
        await fetchProducts();

        setFormData((prevData) => ({
            ...prevData,
            element: newProductData,
        }));

        setShowProductForm(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = isEditMode
                ? await editPrestation(formData)
                : await addPrestation(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                // refreshData();
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
            <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} une prestation</h2>
            <div>
                <label>Produit: <span className={"text-red-700"}>*</span></label>
                <select
                    name="element"
                    value={formData.element || ''}
                    onChange={handleProductChange}
                    required
                    className="input input-bordered w-full"
                >
                    <option value="">Sélectionnez un produit</option>
                    {productsList.map((product: Product) => (
                        <option key={product.id} value={product.id}>
                            {product.nom}
                        </option>
                    ))}
                    <option value="other">Autre</option>
                </select>
            </div>

            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Quantité: <span className={"text-red-700"}>*</span></label>
                <input
                    type="number"
                    name="qty"
                    value={formData.qty || ''}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Prix unitaire HT: <span className={"text-red-700"}>*</span></label>
                <input
                    type="number"
                    name="prixHT"
                    value={formData.prixHT || ''}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Pourcentage de TVA:</label>
                <input
                    type="number"
                    name="tvaPercentage"
                    value={formData.tvaPercentage || '0'}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>


            <div className="flex justify-end">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>

        {showProductForm && (
            <ProductForm
                onSubmit={handleCustomProductSubmit}
                isEditMode={false}
                // refreshData={refreshData}
                refreshData={fetchProducts}
            />
        )}
    </div>
    );
}