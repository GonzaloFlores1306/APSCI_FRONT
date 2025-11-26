import { Header } from "../../components/Header";

import { ExpedienteProvider } from "../../context/Expedientes/ExpedienteContext";

import { Outlet } from "react-router-dom";

export const Expediente = () => {
  return (
    <ExpedienteProvider>
      <Header titulo="Expediente" />
      <div className="overflow-y-auto h-[calc(100vh-100px)]">
        <Outlet />
      </div>
    </ExpedienteProvider>
  );
};
