import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { personaService } from "../../services/PersonaService";
import { mapClientRowFromApi } from "../../mappers/PersonaMapper";
import type { ClientRow } from "../../types/Mantenimiento/PersonaType";

interface InvitadoresContextType {
  invitadores: ClientRow[];
  loading: boolean;
  refreshInvitadores: () => void;
  handleSearch: (term: string, field: string) => void;
}

const InvitadoresContext = createContext<InvitadoresContextType | null>(null);

export function InvitadoresProvider({ children }: { children: ReactNode }) {
  const [invitadores, setInvitadores] = useState<ClientRow[]>([]);
  const [allInvitadores, setAllInvitadores] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(false);

  const getInvitadores = async () => {
    setLoading(true);
    try {
      const dataRaw = await personaService.getByRole("INVITADO");
      const dataMappeada = dataRaw.map(mapClientRowFromApi);

      setAllInvitadores(dataMappeada);
      setInvitadores(dataMappeada);
    } catch (error) {
      console.error("Error cargando invitadores", error);
      setInvitadores([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string, field: string) => {
    if (!term) {
      setInvitadores(allInvitadores);
      return;
    }

    const termLower = term.toLowerCase();
    const filtered = allInvitadores.filter((item) => {
      const value = item[field as keyof ClientRow]?.toString().toLowerCase();
      return value?.includes(termLower);
    });
    setInvitadores(filtered);
  };

  useEffect(() => {
    getInvitadores();
  }, []);

  const value = {
    invitadores,
    loading,
    refreshInvitadores: getInvitadores,
    handleSearch,
  };

  return (
    <InvitadoresContext.Provider value={value}>
      {children}
    </InvitadoresContext.Provider>
  );
}

export function useInvitadores() {
  const context = useContext(InvitadoresContext);
  if (context === null) {
    throw new Error(
      "useInvitadores must be used within an InvitadoresProvider"
    );
  }
  return context;
}
