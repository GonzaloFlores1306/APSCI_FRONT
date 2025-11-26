import Login from "@/pages/Login";
import { Mantenimiento } from "@/pages/Mantenimiento";
import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "@/pages/Inicio";
import ProtectedRoutes from "@/components/routes/ProtectedRoutes";
import Error from "@/pages/Error";
import { Solicitantes } from "@/pages/Expediente/Solicitantes";
import { Invitadores } from "@/pages/Expediente/Invitadores";
import { Expediente } from "@/pages/Expediente/Expediente";
import Clientes from "@/pages/Mantenimiento/Clientes";
import { Sedes } from "@/pages/Mantenimiento/Sedes";
import ListaExpediente from "@/pages/Expediente/ListaExpediente";
import ProtectedNuevoExpediente from "@/components/routes/ProtectedNuevoExpediente";
import { Documentos } from "@/pages/Documentos";
import { Repositorio } from "@/pages/Repositorio";
import { Reportes } from "@/pages/Reportes";
import { MantenimientoTrabajador } from "@/pages/Mantenimiento/Trabajador/MantenimientoTrabajador";
import { useAuth } from "@/context/auth/AuthContext";

const AppRoutes = () => {
  const { userData } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes user={userData} />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="solicitantes" element={<Solicitantes />} />
        <Route path="invitador" element={<Invitadores />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="repositorio" element={<Repositorio />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="expedientes" element={<Expediente />}>
          <Route index element={<ListaExpediente />} />
          <Route
            path="nuevo-expediente"
            element={<ProtectedNuevoExpediente />}
          />
        </Route>
        <Route path="mantenimiento" element={<Mantenimiento />}>
          <Route index element={<Navigate to="cliente" replace />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="trabajadores" element={<MantenimientoTrabajador />} />
          <Route path="sedes" element={<Sedes />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
