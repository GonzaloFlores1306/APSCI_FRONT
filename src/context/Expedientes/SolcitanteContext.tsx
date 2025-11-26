import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { personaService } from "@/services/PersonaService";
import { mapClientRowFromApi } from "@/mappers/PersonaMapper";
import type { ClientRow } from "@/types/Mantenimiento/PersonaType";

interface SolicitanteContextType {
  solicitantes: ClientRow[];
  loading: boolean;
  refreshSolicitantes: () => void;
  handleSearch: (term: string, field: string) => void;
}

const SolicitanteContext = createContext<SolicitanteContextType | null>(null);

export function SolicitanteProvider({ children }: { children: ReactNode }) {
  const [solicitantes, setSolicitantes] = useState<ClientRow[]>([]);
  const [allSolicitantes, setAllSolicitantes] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(false);

  const getSolicitantes = async () => {
    setLoading(true);
    try {
      const dataRaw = await personaService.getByRole("SOLICITANTE");
      const dataMappeada = dataRaw.map(mapClientRowFromApi);
      // Filtro de campos
      setAllSolicitantes(dataMappeada);
      setSolicitantes(dataMappeada);
    } catch (error) {
      console.error("Error cargando solicitantes", error);
      setSolicitantes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string, field: string) => {
    if (!term) {
      setSolicitantes(allSolicitantes);
      return;
    }

    const termLower = term.toLowerCase();
    const filtered = allSolicitantes.filter((item) => {
      const value = item[field as keyof ClientRow]?.toString().toLowerCase();
      return value?.includes(termLower);
    });
    setSolicitantes(filtered);
  };

  useEffect(() => {
    getSolicitantes();
  }, []);

  const value = {
    solicitantes,
    loading,
    refreshSolicitantes: getSolicitantes,
    handleSearch,
  };

  return (
    <SolicitanteContext.Provider value={value}>
      {children}
    </SolicitanteContext.Provider>
  );
}

export function useSolicitante() {
  const context = useContext(SolicitanteContext);
  if (context === null) {
    throw new Error(
      "useSolicitante must be used within an SolicitanteProvider"
    );
  }
  return context;
}
