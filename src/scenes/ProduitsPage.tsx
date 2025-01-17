import {Button} from "@/components/ui/button";

export default function ProduitsPage() {
    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Catalogue de produits</h1>
                </div>
                <div>
                    <Button >Nouveau produit</Button>
                    {/*<Button onClick={() => openEditModal(null)}>Nouveau produit</Button>*/}
                </div>
                {/*<CardWrapper*/}
                {/*    data={data}*/}
                {/*    onEditData={openEditModal}*/}
                {/*    type="product"*/}
                {/*    isDashboard={false}*/}
                {/*    refreshData={refreshData}*/}
                {/*/>*/}

                {/*{isModalOpen && (*/}
                {/*    <Modal onClose={closeModal}>*/}
                {/*        <ProductForm*/}
                {/*            onSubmit={closeModal}*/}
                {/*            data={selectedProduct}*/}
                {/*            isEditMode={!!selectedProduct}*/}
                {/*            refreshData={refreshData}*/}
                {/*        />*/}
                {/*    </Modal>*/}
                {/*)}*/}
            </div>
        </main>
    )
}