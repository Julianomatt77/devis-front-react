import {Button} from "@/components/ui/button";

export default function EntreprisesPage() {
  return (
      <main className="flex items-center justify-center p-4">
        <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
          <div className={"mb-8"}>
            <h1 className={"text-4xl font-bold capitalize"}>Entreprises</h1>
          </div>
          <div>
            <Button >Nouvelle entreprise</Button>
            {/*<Button onClick={() => openEditModal(null)}>Nouvelle entreprise</Button>*/}
          </div>
          {/*<CardWrapper*/}
          {/*    data={data}*/}
          {/*    onEditData={openEditModal}*/}
          {/*    type="entreprise"*/}
          {/*    isDashboard={false}*/}
          {/*    refreshData={refreshData}*/}
          {/*/>*/}

          {/*{isModalOpen && (*/}
          {/*    <Modal onClose={closeModal}>*/}
          {/*      <EntrepriseForm*/}
          {/*          onSubmit={closeModal}*/}
          {/*          entrepriseData={selectedEntreprise}*/}
          {/*          isEditMode={!!selectedEntreprise}*/}
          {/*          refreshData={refreshData}*/}
          {/*      />*/}
          {/*    </Modal>*/}
          {/*)}*/}
        </div>
      </main>
  );
}