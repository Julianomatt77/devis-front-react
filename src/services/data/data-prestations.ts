import {create, deleteItem, recuperer, update} from "@/services/lib/actions";
import {getTokenFromCookie} from "@/services/lib/utils";

export async function getPrestations() {
    const url = import.meta.env.VITE_API_URL + 'prestations';
    const token = getTokenFromCookie();

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addPrestation(formData: FormData){
    try {
        const url = import.meta.env.VITE_API_URL + 'prestations';
        const token = getTokenFromCookie();

        const body = JSON.stringify({
            qty: formData.qty,
            element: { id: formData.element },
            devis: { id: formData.devis },
            prixHT: formData.prixHT * 100,
            tvaPercentage: formData.tvaPercentage
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation créee avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création de la prestation: ${error}`};
    }
}

export async function editPrestation(formData: FormData){
    try {
        const url = import.meta.env.VITE_API_URL + 'prestations/' + formData.id;
        const token = getTokenFromCookie();

        const body = JSON.stringify({
            qty: formData.qty,
            element: { id: formData.element },
            devis: { id: formData.devis },
            prixHT: formData.prixHT * 100,
            tvaPercentage: formData.tvaPercentage
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification de la prestation: ${error}`};
    }
}

export async function deletePrestation(id: number) {
    try {
        const url = import.meta.env.VITE_API_URL + 'prestations/' + id;
        const token = getTokenFromCookie();

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation supprimée avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression de la prestation: ${error}`};
    }
}