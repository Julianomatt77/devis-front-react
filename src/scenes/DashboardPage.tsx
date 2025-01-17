import {Button} from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <main className="w-full p-4 shadow sm:p-8 ">
            <div className={"flex justify-center items-center mb-8"}>
                {/*<Button onClick={openWarningModal} variant={"destructive"}>Supprimer mon compte</Button>*/}
                <Button  variant={"destructive"}>Supprimer mon compte</Button>
            </div>
            {/*{isWarningOpen && (*/}
            {/*    <Modal onClose={closeWarningModal}>*/}
            {/*        <WarningModal*/}
            {/*            onClose={closeWarningModal}*/}
            {/*            onConfirm={() => {*/}
            {/*                closeWarningModal();*/}
            {/*                deleteUserAccount();*/}
            {/*            }}*/}
            {/*            type="compte utilisateur"*/}
            {/*        />*/}
            {/*    </Modal>*/}
            {/*)}*/}

            {/*{successMessage && <p className="text-green-500">{successMessage}</p>}*/}
            {/*{errorMessage && <p className="text-red-500">{errorMessage}</p>}*/}

            {/*<div className={"flex flex-wrap items-start justify-between gap-4"}>*/}
            {/*    <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">*/}
            {/*        <div className="flex items-center justify-between mb-4">*/}
            {/*            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers clients</h5>*/}
            {/*            <Link href="/clients" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">*/}
            {/*                Tout voir*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*        {clientsList && <CardWrapper data={clientsList} type="dashboardClient" isDashboard={true}/>}*/}
            {/*    </section>*/}

                {/*<section className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">*/}
                {/*    <div className="flex items-center justify-between mb-4">*/}
                {/*        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers devis</h5>*/}
                {/*        <Link href="/devis" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">*/}
                {/*            Tout voir*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*    {devisList && <CardWrapper data={devisList} type="dashboardDevis" isDashboard={true}/>}*/}
                {/*</section>*/}
            {/*</div>*/}
        </main>
    )
}