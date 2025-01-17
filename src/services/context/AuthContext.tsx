import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('devis_user');
        const token = localStorage.getItem('devis_token');
        setIsAuthenticated(!!(user && token));
    }, []);

    const login = (userInfo, token) => {
        localStorage.setItem('devis_user', JSON.stringify(userInfo));
        localStorage.setItem('devis_token', token);
        setIsAuthenticated(true);
        document.cookie = `devis_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`
    };

    const logout = () => {
        localStorage.removeItem('devis_user');
        localStorage.removeItem('devis_token');
        setIsAuthenticated(false);
        document.cookie = `devis_token=; path=/; max-age=0`;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
