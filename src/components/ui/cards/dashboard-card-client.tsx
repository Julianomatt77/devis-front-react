export function DashboardCardClient(props: {data: any}) {
    const {data} = props;
    const {email, nom, prenom} = data;

    return (
        <li className="py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-1 min-w-0 ms-4 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {nom} {prenom}
                    </p>
                </div>
                <div className="flex flex-2 min-w-0 ms-4 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {email}
                    </p>
                </div>
            </div>
        </li>
    )
}