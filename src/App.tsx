import './App.css'
import {SidebarProvider, SidebarTrigger} from "./components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import AppRoutes from "@/services/lib/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <SidebarProvider>
                <AppSidebar />
                <div className={"w-full min-h-80 px-4"}>
                    <SidebarTrigger />
                    <AppRoutes />
                </div>
            </SidebarProvider>
      </Router>
  )
}

export default App
