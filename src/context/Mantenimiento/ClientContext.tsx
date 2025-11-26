import { createContext, useContext, useState, useEffect } from "react";
import { personaService } from "@/services/PersonaService";
import { mapClientRowFromApi } from "@/mappers/PersonaMapper";
import type { ClientRow, PersonaApi } from "@/types/Mantenimiento/PersonaType";

interface ClientContextType {
  clientes: ClientRow[];
  loading: boolean;
  refreshClients: () => void;
  handleSearch: (term: string, field: string) => void;
}

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState({ doc: "", nombre: "" });

  // Función principal de carga de datos
  const getData = async () => {
    setLoading(true);
    try {
      let dataRaw: PersonaApi[] = [];

      // Decidir si buscamos o traemos todo
      if (searchQuery.doc || searchQuery.nombre) {
        dataRaw = await personaService.search(
          searchQuery.doc,
          searchQuery.nombre
        );
      } else {
        dataRaw = await personaService.getAll();
      }

      if (Array.isArray(dataRaw)) {
        const dataMappeada = dataRaw.map(mapClientRowFromApi);
        setClientes(dataMappeada);
      } else {
        console.warn(
          "La respuesta del servidor no es una lista válida:",
          dataRaw
        );
        setClientes([]);
      }
    } catch (error) {
      console.error("Error cargando clientes", error);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al inicio y cuando cambia la búsqueda
  useEffect(() => {
    getData();
  }, [searchQuery]);

  // Función que llama la tabla
  const handleSearch = (term: string, field: string) => {
    setSearchQuery({
      doc: field === "documento" ? term : "",
      nombre: field === "nombreCompleto" ? term : "",
    });
  };

  const value = {
    clientes,
    loading,
    refreshClients: getData,
    handleSearch,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === null) {
    throw new Error("useClient must be used within an ClientProvider");
  }
  return context;
}
