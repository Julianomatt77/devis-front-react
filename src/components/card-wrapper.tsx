import {DashboardCardClient} from "@/components/ui/cards/dashboard-card-client";
import {DashboardCardDevis} from "@/components/ui/cards/dashboard-card-devis";
import {CardDevis} from "@/components/ui/cards/card-devis";
import {CardClient} from "@/components/ui/cards/card-client";
import {CardAdresse} from "@/components/ui/cards/card-adresse";
import {CardProduct} from "@/components/ui/cards/card-product";
import {CardEntreprise} from "@/components/ui/cards/card-entreprise";

interface CardWrapperProps {
    data: any;
    onEditData?: any;  // Propriété optionnelle
    type: string;
    isDashboard: boolean;
    refreshData?: any;  // Propriété optionnelle
}

export default function CardWrapper({ data, onEditData, type, isDashboard, refreshData }: CardWrapperProps) {

    if (isDashboard) {
        if (type === "dashboardClient") {
            return (
                <div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    {/*<div className="flow-root">*/}
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item: Client) => {
                            return <DashboardCardClient data={item} key={item.id} />
                        })}
                    </ul>
                    {/*</div>*/}
                </div>
            )
        }

        if (type === "dashboardDevis") {
            return (
                <div id={"card-dashboardDevis-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                        {data.map((item: Devis) => {
                            return <DashboardCardDevis data={item} key={item.id} />
                        })}
                    </ul>
                </div>
            )
        }
    }

    if (type === "devis") {
        return (
            <div id={"card-devis-wrapper"} className={"flex flex-wrap justify-center gap-5 w-full"}>
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-200 w-full">
                    {data.map((item: Devis) => {
                        return <CardDevis
                            data={item}
                            key={item.id}
                            onEditData={onEditData}
                            refreshData={refreshData}
                        />
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
            {data.map((item: any) => {
                if (type === "client") {
                    return <CardClient
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                        // onDeleteClient={onDeleteClient}
                    />
                }

                if (type === "adresse") {
                    return <CardAdresse
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }

                if (type === "product") {
                    return <CardProduct
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }

                if (type === "entreprise") {
                    return <CardEntreprise
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }

                // if (type === "prestation") {
                //     return <CardPrestation
                //         data={item}
                //         key={item.id}
                //         onEditData={onEditData}
                //         refreshData={refreshData}
                //     />
                // }
            })}

        </div>
    )
}