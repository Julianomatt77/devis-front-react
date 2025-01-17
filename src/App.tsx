import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SidebarProvider, SidebarTrigger} from "./components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";

function App() {
  const [count, setCount] = useState(0)

    // const children;
    return (
    <>
        <SidebarProvider>
            <AppSidebar />

            <div className={"w-full min-h-80 px-4"}>
                <SidebarTrigger />
        {/*        /!*{children}*!/*/}
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p className={'border-1'}>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>

            </div>
        </SidebarProvider>


    </>
  )
}

export default App
