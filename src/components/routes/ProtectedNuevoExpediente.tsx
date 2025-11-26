import { Navigate } from "react-router-dom";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import { NuevoExpediente } from "../../pages/Expediente/NuevoExpediente";

const ProtectedNuevoExpediente = () => {
  const { documentsMP } = useExpediente();

  if (documentsMP === null) {
    return <Navigate to="/expedientes" replace />;
  }

  return <NuevoExpediente />;
};

export default ProtectedNuevoExpediente;
