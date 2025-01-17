import {Button} from "@/components/ui/button";
import { Suspense } from 'react';

export default function DevisPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main className="w-full p-4 shadow sm:p-8">
                <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                    <div className={"mb-8"}>
                        <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                    </div>
                    <div>
                        {/*<Button onClick={() => openEditModal(null)}>Nouveau devis</Button>*/}
                        <Button >Nouveau devis</Button>
                    </div>
                </div>

                {/*<SearchBar*/}
                {/*    search={search}*/}
                {/*    placeholder={"Rechercher par référence de devis ou par nom, prénom, ou email du client"}*/}
                {/*    clientId={clientId}*/}
                {/*    refreshSearch={refreshSearch}*/}
                {/*    refreshClient={refreshClient}*/}
                {/*/>*/}

                {/*{data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>*/}
                {/*    <p>Aucun devis à afficher</p>*/}
                {/*</div>)}*/}

                {/*<CardWrapper*/}
                {/*    data={data}*/}
                {/*    onEditData={openEditModal}*/}
                {/*    type="devis"*/}
                {/*    isDashboard={false}*/}
                {/*    refreshData={refreshData}*/}
                {/*/>*/}

                {/*{isModalOpen && (*/}
                {/*    <Modal onClose={closeModal}>*/}
                {/*        <DevisForm*/}
                {/*            onSubmit={closeModal}*/}
                {/*            devisData={selectedDevis}*/}
                {/*            isEditMode={!!selectedDevis}*/}
                {/*            refreshData={refreshData}*/}
                {/*        />*/}
                {/*    </Modal>*/}
                {/*)}*/}
            </main>
        </Suspense>
    )
}

function searchFilter(devisList, search, clientId){
    if (clientId) {
        return devisList.filter((devis) => {
            return devis.client.id == clientId;
        });
    }

    return devisList.filter((devis) => {
        const referenceMatch = devis.reference.toLowerCase().includes(search);
        const nomMatch = devis.client.nom.toLowerCase().includes(search);
        const prenomMatch = devis.client.prenom.toLowerCase().includes(search);
        const emailMatch = devis.client.email.toLowerCase().includes(search);
        return referenceMatch || nomMatch || prenomMatch || emailMatch;
    });
}