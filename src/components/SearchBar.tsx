import {CircleX} from "lucide-react";
import {Suspense, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

export default function SearchBar({search, placeholder, clientId, refreshSearch, refreshClient}:
{search: string, placeholder: string, clientId: string | null, refreshSearch: (search: string) => void, refreshClient: (clientId: string) => void}) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    search = searchParams.get('search')?.toLowerCase() || ""
    clientId = searchParams.get('client')

    useEffect(() => {
        if (clientId) {
            refreshClient(clientId)
        }
    }, [clientId, refreshClient]);

    const handleSearchChange = (newSearchValue: any) => {
        const params = new URLSearchParams(location.search);
        if (newSearchValue) {
            params.set("search", newSearchValue);
        } else {
            params.delete("search");
        }
        navigate(`?${params.toString()}`);
        refreshSearch(newSearchValue);
    };

    return (
        <Suspense fallback={<div>Chargement...</div>}>
        <div className="mb-4 relative">
            <input
                type="text"
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded w-full"
                value={search || ''}
                onChange={(e) => handleSearchChange(e.target.value.toLowerCase())}
            />
            {search && (
                <CircleX
                    className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => handleSearchChange("")}
                />
            )}
        </div>
        </Suspense>
    );
}