import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {getEntreprises} from "@/services/data/data-entreprises";
import CardWrapper from "@/components/card-wrapper";
import Modal from "@/components/ui/modal";
import EntrepriseForm from "@/components/forms/entreprise-form";

export default function EntreprisesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntreprise, setSelectedEntreprise] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getEntreprises();
            if (result.ok) {
                const fetchedEntreprises = result.data;
                setData(fetchedEntreprises);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getEntreprises();
        if (result.ok) {
            const updatedEntreprises = result.data;
            setData(updatedEntreprises);
        }
    };

    const openEditModal = (entreprise: never | null) => {
        setSelectedEntreprise(entreprise ?? null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEntreprise(null);
    };

  return (
      <main className="flex items-center justify-center p-4">
        <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
          <div className={"mb-8"}>
            <h1 className={"text-4xl font-bold capitalize"}>Entreprises</h1>
          </div>
          <div>
            <Button onClick={() => openEditModal(null)}>Nouvelle entreprise</Button>
          </div>
          <CardWrapper
              data={data}
              onEditData={openEditModal}
              type="entreprise"
              isDashboard={false}
              refreshData={refreshData}
          />

          {isModalOpen && (
              <Modal onClose={closeModal}>
                <EntrepriseForm
                    onSubmit={closeModal}
                    entrepriseData={selectedEntreprise}
                    isEditMode={!!selectedEntreprise}
                    refreshData={refreshData}
                />
              </Modal>
          )}
        </div>
      </main>
  );
}