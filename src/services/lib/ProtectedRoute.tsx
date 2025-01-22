import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();

    // Récupérer le token (par exemple, depuis les cookies ou le stockage local)
    const token = document.cookie.split('; ').find(row => row.startsWith('devis_token='))?.split('=')[1];

    // Si pas de token, redirection vers /login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
