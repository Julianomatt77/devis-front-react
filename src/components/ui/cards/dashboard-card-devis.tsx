import {CircleCheckBig, CircleDashed} from "lucide-react";
import {formatDate, transformPriceToEuro} from "@/services/lib/utils";

export function DashboardCardDevis(props: {data: any}) {
    const {data} = props;
    const {client, totalTTC, reference, paidAt, createdAt, updatedAt} = data;

    const devisDate = updatedAt ? formatDate(updatedAt): formatDate(createdAt);
    const paid = paidAt ? "checked" : ""
    const totalTTCCalcule = transformPriceToEuro(totalTTC);

    return (
        <li className="py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-0 min-w-0 ms-4 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {reference}
                    </p>
                </div>
                <div className="flex sm:flex-col flex-1 min-w-0 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {client.nom} {client.prenom}
                    </p>
                </div>
                <div className="flex sm:flex-col flex-2 min-w-0 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {devisDate}
                    </p>
                </div>
                <div className="flex flex-3 min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {totalTTCCalcule}
                    </p>
                </div>
                <div className="flex flex-4 min-w-0 ms-4 gap-4">
                    <div className="form-control">
                        <label className="label">
                            {!paid && <CircleDashed className=""/>}
                            {paid && <CircleCheckBig className="text-green-500"/>}
                        </label>
                    </div>
                </div>

            </div>
        </li>
    )
}