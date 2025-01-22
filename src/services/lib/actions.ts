import {getUserInfo, signIn} from "@/services/lib/auth";
import {getTokenFromCookie} from "@/services/lib/utils";

export async function authenticate(
    formData: FormData,
) {
    try {
        const response = await signIn(formData);

        if (response.status !== 200) {
            return { ok: false, message: "Identifiants incorrects." };
        }

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            const userInfo = await getUserInfo(token);

            return { ok: true, token, userInfo };
        }

        return { ok: false, message: "Une erreur est survenue lors de l'authentification." };

    } catch (error: any) {
        return { ok: false, message: `Erreur lors de l'authentification: ${error.error}` };
    }
}

export async function register(
    formData: FormData,
) {
    try {
        const url = import.meta.env.VITE_API_URL + 'register';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });

        if (response.status !== 201) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.message};
        }

        if (response.ok) {
            return {ok: true, message: "Compte créé avec succès !"};
        }

        return {ok: false, message: "Une erreur est survenue lors de l'enregistrement."};

    } catch (error: any) {
        return {ok: false, message: `Erreur lors de l'authentification: ${error.error}`};
    }
}

export async function deleteAccount() {
    const url = import.meta.env.VITE_API_URL + 'user-delete';
    const token = getTokenFromCookie();

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 201) {
        const res = await response.text();
        const parsedRes = JSON.parse(res);
        return {status: false, message: parsedRes.message};
    }

    return await response.json();
}

export async function create(body: any, url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
        });

        if (response.status !== 201) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.message};
        }

        const data = await response.json();
        return {ok: true, data: data};
    } catch (error: any) {
        return {ok: false, message: `Erreur lors de la requête: ${error.error}`};
    }
}

export async function update(body: any, url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
        });

        if (response.status !== 200) {
            const res = await response.text();
            // const parsedRes = JSON.parse(res);
            // return {ok: false, message: parsedRes.message};
            return {ok: false, message: res};
        }

        const data = await response.json();
        return {ok: true, data: data};
    } catch (error: any) {
        return {ok: false, message: `Erreur lors de la requête: ${error}`};
    }
}

export async function deleteItem(url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 202) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.error};
            // return {ok: false, message: 'pas bon'};
        }

        return {ok: true, message: "Suppression effectuée avec succès !", status: response.status};
    } catch (error: any) {
        return {ok: false, message: `Erreur lors de la requête: ${error.error}`};
    }
}

export async function recuperer(url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.error};
        }

        if (response.ok) {
            const data = await response.json();
            return {ok: true, message: "Récupération effectuée avec succès !", status: response.status, data: data};
        }

        return {ok: true, message: "Erreur lors de la récupération", status: response.status};
    } catch (error: any) {
        return {ok: false, message: `Erreur lors de la requête GET: ${error.error}`};
    }
}

export async function sendMail(formData: {from: string, subject: string, message: string}) {
    const url = import.meta.env.VITE_API_URL + 'contact';
    const body = JSON.stringify({
        from: formData.from,
        subject: formData.subject,
        message: formData.message
    })

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        });

        if (response.status !== 200) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.error};
        }

        const data = await response.json();
        return {ok: true, message: data.message};
    } catch (error: any) {
        return {ok: false, message: `Erreur lors de la requête: ${error.error}`};
    }
}