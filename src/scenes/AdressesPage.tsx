import {Button} from "@/components/ui/button";

export default function AdressesPage() {
    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Carnet d&#39;adresses</h1>
                </div>
                <div>
                    <Button >Nouvelle adresse</Button>
                    {/*<Button onClick={() => openEditModal(null)}>Nouvelle adresse</Button>*/}
                </div>
                {/*<CardWrapper*/}
                {/*    data={data}*/}
                {/*    onEditData={openEditModal}*/}
                {/*    type="adresse"*/}
                {/*    isDashboard={false}*/}
                {/*    refreshData={refreshData}*/}
                {/*    // onDeleteClient={deleteClient}*/}
                {/*/>*/}

                {/*{isModalOpen && (*/}
                {/*    <Modal onClose={closeModal}>*/}
                {/*        <AdresseForm*/}
                {/*            onSubmit={closeModal}*/}
                {/*            data={selectedAdresse}*/}
                {/*            isEditMode={!!selectedAdresse}*/}
                {/*            refreshData={refreshData}*/}
                {/*        />*/}
                {/*    </Modal>*/}
                {/*)}*/}
            </div>
        </main>
    );
}