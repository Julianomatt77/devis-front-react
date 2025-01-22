import {create, deleteItem, recuperer, update} from "@/services/lib/actions";
import {getTokenFromCookie} from "@/services/lib/utils";

export async function getAdresses() {
    const url = import.meta.env.VITE_API_URL + 'adresses';
    const token = getTokenFromCookie();

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addAdresse(formData: Adresse){
    try {
        const url = import.meta.env.VITE_API_URL + 'adresses';
        const token = getTokenFromCookie();

        const body = JSON.stringify({
            cp: formData.cp,
            ville: formData.ville,
            pays: formData.pays,
            numero: Number(formData.numero)  || undefined,
            rue: formData.rue || undefined,
            complementaire: formData.complementaire || undefined,
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Adresse ajoutée avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création de l'adresse: ${error}`};
    }
}

export async function editAdresse(formData: Adresse){
    try {
        const url = import.meta.env.VITE_API_URL + 'adresses/' + formData.id;
        const token = getTokenFromCookie();

        const body = JSON.stringify({
            cp: formData.cp,
            ville: formData.ville,
            pays: formData.pays,
            numero: Number(formData.numero) || undefined,
            // numero: formData.numero || undefined,
            rue: formData.rue || undefined,
            complementaire: formData.complementaire || undefined,
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Adresse mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification de l'adresse: ${error}`};
    }
}

export async function deleteAdresses(id: number) {
    try {
        const url = import.meta.env.VITE_API_URL + 'adresses/' + id;
        const token = getTokenFromCookie();

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Adresse supprimé avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression de l'adresse: ${error}`};
    }
}