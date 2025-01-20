import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/scenes/HomePage";
import LoginPage from "@/scenes/LoginPage";
import RegisterPage from "@/scenes/RegisterPage";
import AdressesPage from "@/scenes/AdressesPage";
import CguPage from "@/scenes/CguPage";
import ClientsPage from "@/scenes/ClientsPage";
import ContactPage from "@/scenes/ContactPage";
import DashboardPage from "@/scenes/DashboardPage";
import EntreprisesPage from "@/scenes/EntreprisesPage";
import PrestationsPage from "@/scenes/PrestationsPage";
import ProduitsPage from "@/scenes/ProduitsPage";
import DevisPage from "@/scenes/devis/DevisPage";
import DevisDetailPage from "@/scenes/devis/DevisDetailPage";
import ProtectedRoute from "@/services/lib/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path={"/register"} element={<RegisterPage />} />
                <Route path={"/cgu"} element={<CguPage />} />
                <Route path={"/contact"} element={<ContactPage />} />

                <Route element={<ProtectedRoute />}>
                        <Route path={"/adresses"} element={<AdressesPage />} />
                        <Route path={"/clients"} element={<ClientsPage />} />
                        <Route path={"/dashboard"} element={<DashboardPage />} />
                        <Route path={"/entreprises"} element={<EntreprisesPage />} />
                        {/*<Route path={"/prestations"} element={<PrestationsPage />} />*/}
                        <Route path={"/produits"} element={<ProduitsPage />} />
                        <Route path={"/devis"} element={<DevisPage />} />
                        <Route path={"/devis/:id"} element={<DevisDetailPage/>} />
                </Route>
        </Routes>
    );
};

export default AppRoutes;
