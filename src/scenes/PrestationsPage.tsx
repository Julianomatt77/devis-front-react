import {Button} from "@/components/ui/button";

export default function PrestationsPage() {
    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Prestations</h1>
                </div>
                <div>
                    {/*<Button onClick={() => openEditModal(null)}>Nouvelle prestation</Button>*/}
                    <Button >Nouvelle prestation</Button>
                </div>
                {/*<CardWrapper*/}
                {/*    data={data}*/}
                {/*    onEditData={openEditModal}*/}
                {/*    type="prestation"*/}
                {/*    isDashboard={false}*/}
                {/*    refreshData={refreshData}*/}
                {/*/>*/}

                {/*{isModalOpen && (*/}
                {/*    <Modal onClose={closeModal}>*/}
                {/*        <PrestationForm*/}
                {/*            onSubmit={closeModal}*/}
                {/*            clientData={selectedPrestation}*/}
                {/*            isEditMode={!!selectedPrestation}*/}
                {/*            refreshData={refreshData}*/}
                {/*        />*/}
                {/*    </Modal>*/}
                {/*)}*/}
            </div>
        </main>
    )
}