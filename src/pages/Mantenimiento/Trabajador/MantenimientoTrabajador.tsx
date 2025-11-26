import { WorkerProvider } from "../../../context/Mantenimiento/WorkerContext";
import Trabajadores from "./Trabajadores";

export const MantenimientoTrabajador = () => {
  return (
    <WorkerProvider>
      <Trabajadores />
    </WorkerProvider>
  );
};
