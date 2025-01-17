import { Suspense } from 'react';
import {Button} from "@/components/ui/button";

export default function ClientsPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main className="w-full p-4 shadow sm:p-8">
                <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                    <div className={"mb-8"}>
                        <h1 className={"text-4xl font-bold capitalize"}>Clients</h1>
                    </div>
                    <div>
                        {/*<Button onClick={() => openEditModal(null)}>Nouveau client</Button>*/}
                        <Button >Nouveau client</Button>
                    </div>
                </div>

                {/*<SearchBar*/}
                {/*    search={search}*/}
                {/*    placeholder={"Rechercher par nom, prénom ou email"}*/}
                {/*    clientId={clientId}*/}
                {/*    refreshSearch={refreshSearch}*/}
                {/*    refreshClient={refreshClient}*/}
                {/*/>*/}

                {/*{data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>*/}
                {/*    <p>Aucun client à afficher</p>*/}
                {/*</div>)}*/}

                {/*<CardWrapper*/}
                {/*    data={data}*/}
                {/*    onEditData={openEditModal}*/}
                {/*    type="client"*/}
                {/*    isDashboard={false}*/}
                {/*    refreshData={refreshData}*/}
                {/*    // onDeleteClient={deleteClient}*/}
                {/*/>*/}

                {/*{isModalOpen && (*/}
                {/*    <Modal onClose={closeModal}>*/}
                {/*        <ClientForm*/}
                {/*            onSubmit={closeModal}*/}
                {/*            clientData={selectedClient}*/}
                {/*            isEditMode={!!selectedClient}*/}
                {/*            refreshData={refreshData}*/}
                {/*        />*/}
                {/*    </Modal>*/}
                {/*)}*/}
            </main>
        </Suspense>
    );
}