import './App.css'
import {SidebarProvider, SidebarTrigger} from "./components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import AppRoutes from "@/services/lib/routes";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from "@/services/context/AuthContext";
import {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";

function App() {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowArrow(true);
            } else {
                setShowArrow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const rootDiv = document.getElementById('root');
        if (rootDiv){
            rootDiv.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Router>
            <AuthProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <div className={"w-full min-h-80 px-4"}>
                        <SidebarTrigger />
                        <AppRoutes />
                    </div>
                </SidebarProvider>
            </AuthProvider>

            {showArrow && (
                <div
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-3 bg-secondary text-white rounded-full cursor-pointer hover:bg-secondary-700"
                    title={"Retourner en haut de la page"}
                >
                    <ArrowUp />
                </div>
            )}
      </Router>
  )
}

export default App
