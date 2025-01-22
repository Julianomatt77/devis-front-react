import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import DevisForm from "@/components/forms/devis-form";
import {Suspense, useEffect, useState} from "react";
import {getDevis} from "@/services/data/data-devis";
import CardWrapper from "@/components/card-wrapper";
import Modal from "@/components/ui/modal";

export default function DevisPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevis, setSelectedDevis] = useState(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [clientId, setClientId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const result = await getDevis();
            if (result.ok) {
                const fetchedDevis = result.data;
                const activeDevis = fetchedDevis.filter((devis: Devis) => !devis.deletedAt)
                const filteredDevis = search || clientId ? searchFilter(activeDevis, search, clientId) : activeDevis

                setData(filteredDevis);
            }
        }
        fetchData();
    }, [search, clientId]);

    const refreshData = async () => {
        const result = await getDevis();
        if (result.ok) {
            const updatedDevis = result.data;
            const activeDevis = updatedDevis.filter((devis: Devis) => !devis.deletedAt)

            const filteredDevis = search || clientId ? searchFilter(activeDevis, search, clientId) : activeDevis

            setData(filteredDevis);
        }
    };

    const refreshSearch = (e: any) =>{
        setSearch(e);
        refreshData();
    }

    const refreshClient = (clientId: any) =>{
        setClientId(clientId);
        refreshData();
    }

    const openEditModal = (devis: any) => {
        if (devis && devis.id) {
            setSelectedDevis(devis);
            navigate(`/devis/${devis.id}`);
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModal = (devis: any) => {
        if (devis.id) {
            setSelectedDevis(devis);
        }
        setIsModalOpen(false);
        setSelectedDevis(null);
    };

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main className="w-full p-4 shadow sm:p-8">
                <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                    <div className={"mb-8"}>
                        <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                    </div>
                    <div>
                        <Button onClick={() => openEditModal(null)}>Nouveau devis</Button>
                    </div>
                </div>

                <SearchBar
                    search={search}
                    placeholder={"Rechercher par référence de devis ou par nom, prénom, ou email du client"}
                    clientId={clientId}
                    refreshSearch={refreshSearch}
                    refreshClient={refreshClient}
                />

                {data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    <p>Aucun devis à afficher</p>
                </div>)}

                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="devis"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <DevisForm
                            onSubmit={closeModal}
                            devisData={selectedDevis}
                            isEditMode={!!selectedDevis}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </main>
        </Suspense>
    )
}

function searchFilter(devisList: any[], search: string, clientId: string){
    if (clientId) {
        return devisList.filter((devis: any) => {
            return devis.client.id == clientId;
        });
    }

    return devisList.filter((devis: any) => {
        const referenceMatch = devis.reference.toLowerCase().includes(search);
        const nomMatch = devis.client.nom.toLowerCase().includes(search);
        const prenomMatch = devis.client.prenom.toLowerCase().includes(search);
        const emailMatch = devis.client.email.toLowerCase().includes(search);
        return referenceMatch || nomMatch || prenomMatch || emailMatch;
    });
}