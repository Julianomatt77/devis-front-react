declare global {
    interface UserInfo {
        id?: number;
        username: string;
        email: string;
        roles: string[];
        adresses: any[];
        clients: any[];
        deletedAt: string;
        devis: any[];
        element: any[];
        entreprises: any[];
        registeredAt: string;
        token: string;
    }

    interface AuthContextType {
        isAuthenticated: boolean;
        login: (userInfo: UserInfo, token: string) => void;
        logout: () => void;
    }

    interface Devis {
        id?: number;
        reference: string;
        entreprise: any;
        client?: any;
        paidAt?: string;
        dateDebutPrestation?: string;
        tc?: string;
        deletedAt?: string;
        updatedAt?: string;
        createdAt?: string;
        prestations?: Prestation[];
        totalHT?: number;
        tva?: number;
        totalTTC?: number;
        dateValidite?: string;
    }

    interface Adresse {
        id?: number,
        cp: string,
        ville: string,
        pays: string,
        numero?: number,
        rue?: string,
        complementaire?: string
    }

    interface Client {
        id?: number,
        nom: string,
        prenom: string,
        email?: string,
        telephone?: string,
        adresse?: any
    }

    interface Entreprise {
        id?: string,
        nom: string,
        siret: string,
        codeApe?: string,
        tvaIntracom?: string,
        email?: string,
        telephone1?: string,
        telephone2?: string,
        web?: string,
        contact?: string,
        adresse?: any
    }

    interface Prestation {
        id?: string,
        qty: number,
        element: any,
        devis: any,
        prixHT: number,
        tvaPercentage: number,
        totalTTC?: number,
        totalHT?: number,
        tva?: number,
    }

    interface Product {
        id?: string,
        nom: string
    }
}

export {};