import {Suspense, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {getClients} from "@/services/data/data-clients";
import SearchBar from "@/components/SearchBar";
import CardWrapper from "@/components/card-wrapper";
import ClientForm from "@/components/forms/client-form";
import Modal from "@/components/ui/modal";

type Client = {
    id: string;
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    adresse: string;
};

export default function ClientsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        const originalTitle = document.title;
        document.title = `Devis Generator/Clients`;

        return () => {
            document.title = originalTitle;
        };
    }, );

    useEffect(() => {
        async function fetchData() {
            const result = await getClients();
            if (result.ok) {
                const fetchedClients = result.data;
                const filteredClients = search || clientId ? searchFilter(fetchedClients, clientId, search) : fetchedClients
                setData(filteredClients);
            }
        }
        fetchData();
    }, [search, clientId]);

    const refreshData = async () => {
        const result = await getClients();
        if (result.ok) {
            const updatedClients = result.data;
            const filteredClients = search || clientId ? searchFilter(updatedClients, clientId, search ) : updatedClients
            setData(filteredClients);
        }
    };

    const openEditModal = (client: never | null) => {
        setSelectedClient(client ?? null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    const refreshSearch = (e) =>{
        setSearch(e);
        refreshData();
    }

    const refreshClient = (clientId) =>{
        setClientId(clientId);
        refreshData();
    }

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main className="w-full p-4 shadow sm:p-8">
                <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                    <div className={"mb-8"}>
                        <h1 className={"text-4xl font-bold capitalize"}>Clients</h1>
                    </div>
                    <div>
                        <Button onClick={() => openEditModal(null)}>Nouveau client</Button>
                    </div>
                </div>

                <SearchBar
                    search={search}
                    placeholder={"Rechercher par nom, prénom ou email"}
                    clientId={clientId}
                    refreshSearch={refreshSearch}
                    refreshClient={refreshClient}
                />

                {data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    <p>Aucun client à afficher</p>
                </div>)}

                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="client"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <ClientForm
                            onSubmit={closeModal}
                            clientData={selectedClient}
                            isEditMode={!!selectedClient}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </main>
        </Suspense>
    );
}

function searchFilter(clientsList : Client[], clientId : string | null, search?: string ){
    if (clientId) {
        return clientsList.filter((client: Client) => {
            return client.id == clientId;
        });
    }

    return clientsList.filter((client) => {
        const nomMatch = search ? client.nom.toLowerCase().includes(search) : null;
        const prenomMatch = search ? client.prenom?.toLowerCase().includes(search) : null;
        const emailMatch = search ? client.email?.toLowerCase().includes(search) : null;
        // const emailMatch = client.email?.toLowerCase().includes(search);
        return  nomMatch || prenomMatch || emailMatch;
    });
}