import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ClientProvider } from "../context/Mantenimiento/ClientContext";
import { SedeProvider } from "../context/Mantenimiento/SedeContext";

export const Mantenimiento = () => {
  return (
    <>
      <ClientProvider>
        <SedeProvider>
          <Header titulo="Mantenimiento" />
          <div className="overflow-y-auto h-[calc(100vh-100px)]">
            <Outlet />
          </div>
        </SedeProvider>
      </ClientProvider>
    </>
  );
};
