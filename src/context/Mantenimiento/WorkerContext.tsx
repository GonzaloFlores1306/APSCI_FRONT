import { createContext, useContext, useEffect, useState } from "react";
import {
  columnsAdministrador,
  columnsAll,
  columnsAsistente,
  columnsConciliador,
} from "../../pages/columns/data";
import type { DataType } from "../../types/TableTypes";
import { reniecService } from "../../services/ReniecService";
import type {
  workerApi,
  workerInterface,
} from "../../types/Mantenimiento/TrabajadorType";
import { mapWorkerFromApi, mapWorkerToApi } from "../../mappers/workerMapper";
import { workerService } from "../../services/WorkerService";
import { toast } from "sonner";
import { AlertMessage } from "../../components/AlertMessage";

// ... (Interfaces se mantienen igual) ...
interface WorkerContextType {
  activeTab: string;
  loading: boolean;
  responseAlert: Record<string, string>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  data: Record<string, any>[];
  columns:
    | { key: string; label: string; type: DataType; sortable: boolean }[]
    | undefined;
  getDniData: (dni: string) => Promise<TrabajadorData | null>;
  handleSubmit: (data: workerInterface) => void;
  handleSubmitEdit: (data: workerInterface, id: number) => void;
  desactivarWorker: (id: number) => void;
  activarWorker: (id: number) => void;
  setSearch: (field: string, value: string) => void;
}

interface TrabajadorData {
  nombreTrabajador: string;
  apePaterTrabajador: string;
  apeMaterTrabajador: string;
  dniTrabajador: string;
}

const WorkerContext = createContext<WorkerContextType | null>(null);

const getColumnsByType = (tipo: string) => {
  switch (tipo) {
    case "administrador":
      return columnsAdministrador;
    case "conciliadores":
      return columnsConciliador;
    case "asistente":
      return columnsAsistente;
    default:
      return columnsAll;
  }
};

export function WorkerProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("inicio");
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<
    | { key: string; label: string; type: DataType; sortable: boolean }[]
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [responseAlert, setResponseAlert] = useState<Record<string, string>>({
    type: "success",
    message: "",
  });
  const [searchQuery, setSearchQuery] = useState({ dni: "", nombre: "" });

  useEffect(() => {
    setColumns(getColumnsByType(activeTab));
    getData();
  }, [activeTab, searchQuery]); // Se dispara al cambiar tab o búsqueda

  useEffect(() => {
    if (responseAlert.message) {
      toast.custom(() => (
        <AlertMessage
          type={responseAlert.type}
          message={responseAlert.message ?? ""}
          action={responseAlert.type === "error" ? "error" : "add"}
        />
      ));
    }
  }, [responseAlert]);

  const getDataByType = (tipo: string, data: Record<string, any>[]) => {
    if (tipo === "conciliadores")
      return data.filter((t) => t.rol.includes("Conciliador"));
    if (tipo === "admin")
      return data.filter((t) => t.rol.includes("Administrador"));
    if (tipo === "asistente")
      return data.filter((t) => t.rol.includes("Asistente_administrativo"));
    return data;
  };

  const setSearch = (field: string, value: string) => {
    // Limpiar el otro campo para evitar búsquedas cruzadas
    setSearchQuery({
      dni: field === "dni" ? value : "",
      nombre: field === "nombre" ? value : "",
    });
  };

  const getDniData = async (dni: string): Promise<TrabajadorData | null> => {
    setLoading(true);
    const response = await reniecService.getDni(dni);
    setLoading(false);
    return response.error ? null : (response as TrabajadorData);
  };

  const getBoolean = (estado: string | boolean | undefined): boolean => {
    if (typeof estado === "boolean") return estado;
    if (estado === "ACTIVO") return true;
    return false;
  };

  // --- LOGICA ROBUSTA DE GET DATA ---
  const getData = async () => {
    setLoading(true);
    try {
      let rawData: any[] = [];

      // 1. Determinar si buscamos o listamos todo
      if (searchQuery.dni || searchQuery.nombre) {
        const response = await workerService.search(
          searchQuery.dni,
          searchQuery.nombre
        );
        rawData = response; // search devuelve array directo
      } else {
        // Si no hay búsqueda, cargar lista por defecto (size grande para traer todo si no hay paginacion en tabla)
        const response = await workerService.viewData(0, 100);
        // viewData devuelve { content: [...] }
        rawData = response.content ? response.content : [];
      }

      // 2. Validar que sea array para evitar crash
      if (!Array.isArray(rawData)) {
        // Si el backend devuelve error (ej 403), rawData podría ser {error: true...}
        console.warn("Respuesta no válida del servidor:", rawData);
        setData([]);
        return;
      }

      // 3. Mapear
      const mappedWorkers: workerInterface[] = rawData.map(mapWorkerFromApi);
      const formatted = mappedWorkers.map((w) => ({
        id: w.id,
        name: w.name.charAt(0).toUpperCase() + w.name.slice(1).toLowerCase(),
        lastname: `${
          w.lastnamePater.charAt(0).toUpperCase() +
          w.lastnamePater.slice(1).toLowerCase()
        } ${
          w.lastnameMater.charAt(0).toUpperCase() +
          w.lastnameMater.slice(1).toLowerCase()
        }`,
        email: w.email || "Sin correo",
        dni: w.dni,
        phone: w.phone || "—",
        estado: getBoolean(w.state),
        rol: w.rol
          ? w.rol.charAt(0).toUpperCase() + w.rol.slice(1).toLowerCase()
          : "Sin Asignar",
        user: w.user,
        registro: w.registro,
      }));

      // 4. Filtrar por Tab
      setData(getDataByType(activeTab, formatted));
    } catch (error) {
      console.error("Error en getData:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: workerInterface) => {
    const dataApi: workerApi = mapWorkerToApi(data);
    const response = await workerService.add(dataApi);
    if (response.error) {
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Trabajador Agregado Correctamente",
    });
    getData();
  };

  const handleSubmitEdit = async (data: workerInterface, id: number) => {
    const dataApi: workerApi = mapWorkerToApi(data);
    const response = await workerService.edit(dataApi, id);
    if (response.error) {
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Trabajador Editado Correctamente",
    });
    getData();
  };

  const desactivarWorker = async (id: number) => {
    const response = await workerService.inactive(id);
    if (response.error) {
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Trabajador Desactivado Correctamente",
    });
    getData();
  };

  const activarWorker = async (id: number) => {
    const response = await workerService.active(id);
    if (response.error) {
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Trabajador Activado Correctamente",
    });
    getData();
  };

  const value = {
    activeTab,
    loading,
    responseAlert,
    setActiveTab,
    data,
    columns,
    getDniData,
    handleSubmit,
    handleSubmitEdit,
    desactivarWorker,
    activarWorker,
    setSearch,
  };

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
}

export function useWorker() {
  const context = useContext(WorkerContext);
  if (context === null) {
    throw new Error("useWorker must be used within an WorkerProvider");
  }
  return context;
}
