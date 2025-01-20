import {useEffect, useState} from "react";
import {getAdresses} from "@/services/data/data-adresses";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/card-wrapper";
import Modal from "@/components/ui/modal";
import AdresseForm from "@/components/forms/adresse-form";


export default function AdressesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdresse, setSelectedAdresse] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAdresses();
            if (result.ok) {
                const fetchedAdresses = result.data;
                setData(fetchedAdresses);
            }
        }

        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getAdresses();
        if (result.ok) {
            const updatedAdresses = result.data;
            setData(updatedAdresses);
        }
    };

    const openEditModal = (adresse: never | null ) => {
        setSelectedAdresse(adresse ?? null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAdresse(null);
    };
    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Carnet d&#39;adresses</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouvelle adresse</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="adresse"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <AdresseForm
                            onSubmit={closeModal}
                            data={selectedAdresse}
                            isEditMode={!!selectedAdresse}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}