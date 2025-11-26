import { createContext, useContext, useEffect, useState } from "react";
import { sedeService } from "../../services/SedeService";
import type {
  SedeApi,
  SedeInterface,
} from "../../types/Mantenimiento/SedeType";
import {
  mapSedeApiToInterface,
  mapSedeInterfaceToApi,
} from "../../mappers/sedeMapper";
import { toast } from "sonner";
import { AlertMessage } from "../../components/AlertMessage";

interface SedeContextType {
  data: SedeInterface[];
  loading: Record<string, boolean>;

  handleSubmit: (data: SedeInterface) => void;
  handleSubmitEdit: (data: SedeInterface, id: number) => void;
  responseAlert: Record<string, string | undefined>;
  desactivarSede: (id: number) => void;
  activarSede: (id: number) => void;
}

const SedeContext = createContext<SedeContextType | null>(null);

export function SedeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SedeInterface[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({
    add: false,
    edit: false,
    view: false,
    state: false,
  });
  const [responseAlert, setResponseAlert] = useState<Record<string, string>>({
    type: "success",
    message: "",
  });

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, view: true }));
      const response = await sedeService.viewData();
      console.log("response: ", response);
      const mappedSede: SedeInterface[] = response.map(mapSedeApiToInterface);
      setData(mappedSede);
    } catch (error) {
      setLoading((prev) => ({ ...prev, view: false }));
      console.error("Error al obtener trabajadores:", error);
    } finally {
      setLoading((prev) => ({ ...prev, view: false }));
    }
  };

  const handleSubmit = async (data: SedeInterface) => {
    setLoading((prev) => ({ ...prev, add: true }));
    const dataApi: SedeApi = mapSedeInterfaceToApi(data);
    const response = await sedeService.add(dataApi);
    if (response.error) {
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Sede Agregado Correctamente",
    });
    getData();
    setLoading((prev) => ({ ...prev, add: false }));
    console.log(response);
  };
  const handleSubmitEdit = async (data: SedeInterface, id: number) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    const dataApi: SedeApi = mapSedeInterfaceToApi(data);
    const response = await sedeService.edit(dataApi, id);
    if (response.error) {
      console.log("data ", dataApi);
      console.log(response);
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Sede Editado Correctamente",
    });
    getData();
    setLoading((prev) => ({ ...prev, edit: false }));
    console.log(response);
  };

  const desactivarSede = async (id: number) => {
    setLoading((prev) => ({ ...prev, state: true }));
    const response = await sedeService.inactive(id);
    if (response.error) {
      console.log(response);
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Sede Desactivada Correctamente",
    });
    getData();
    setLoading((prev) => ({ ...prev, state: false }));
    console.log(response);
  };

  const activarSede = async (id: number) => {
    setLoading((prev) => ({ ...prev, state: true }));
    const response = await sedeService.active(id);
    if (response.error) {
      console.log(response);
      setResponseAlert({ type: "error", message: response.error });
      return;
    }
    setResponseAlert({
      type: "success",
      message: "Sede Activada Correctamente",
    });
    getData();
    setLoading((prev) => ({ ...prev, state: false }));
    console.log(response);
  };

  const value = {
    data,
    loading,
    handleSubmit,
    handleSubmitEdit,
    responseAlert,
    desactivarSede,
    activarSede,
  };

  return <SedeContext.Provider value={value}>{children}</SedeContext.Provider>;
}

export function useSede() {
  const context = useContext(SedeContext);
  if (context === null) {
    throw new Error("useSede must be used within an SedeProvider");
  }
  return context;
}
