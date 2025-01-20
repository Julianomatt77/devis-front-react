import {DashboardCardClient} from "@/components/ui/cards/dashboard-card-client";
import {DashboardCardDevis} from "@/components/ui/cards/dashboard-card-devis";
import {CardDevis} from "@/components/ui/cards/card-devis";
import {CardClient} from "@/components/ui/cards/card-client";
import {CardAdresse} from "@/components/ui/cards/card-adresse";
import {CardProduct} from "@/components/ui/cards/card-product";
import {CardEntreprise} from "@/components/ui/cards/card-entreprise";
import {CardPrestation} from "@/components/ui/cards/card-prestation";

export default function CardWrapper({ data, onEditData, type, isDashboard, refreshData }) {

    if (isDashboard) {
        if (type === "dashboardClient") {
            return (
                <div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    {/*<div className="flow-root">*/}
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => {
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
                        {data.map((item) => {
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
                    {data.map((item) => {
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
            {data.map((item) => {
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

                if (type === "prestation") {
                    return <CardPrestation
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }
            })}

        </div>
    )
}