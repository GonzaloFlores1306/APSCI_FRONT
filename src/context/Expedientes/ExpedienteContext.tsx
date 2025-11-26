import { createContext, useContext, useEffect, useState } from "react";
import { type DireccionForm, type Persona } from "../../types/EntityTypes";
import type { TipoParte } from "../../types/DataTypes";
import type { ExpedienteContextType } from "../../types/ContextTypes";
import { expedienteService } from "../../services/ExpedienteService";
import { mapExpedienteToRow } from "../../mappers/ExpedienteMapper";
import type { ExpedienteRow } from "@/types/ExpedienteType";

const initialNatural = {
  id: 0,
  tipoPersona: "",
  dni: "",
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  celular: "",
  whatsapp: "",
  correo: "",
  tieneApoderado: false,
  ruc: "",
  razonSocial: "",
};

const ExpedienteContext = createContext<ExpedienteContextType | null>(null);

export function ExpedienteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // VARIABLES DE ESTADO
  const [tab, setTab] = useState("inicio");
  const [data, setData] = useState<ExpedienteRow[]>([]);
  const [allExpedientes, setAllExpedientes] = useState<ExpedienteRow[]>([]);
  const [, setLoadingData] = useState(false);

  // Variables de Búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("expediente");

  // Variables para formulario de creación
  const [documentsMP, setDocumentsMP] = useState<boolean | null>(null);
  const [acuerdoMutuo, setAcuerdoMutuo] = useState<boolean>(false);
  const [documentoCargado, setDocumentoCargado] = useState<boolean>(false);
  const [motivo, setMotivo] = useState<string>("");
  const [pretensiones, setPretensiones] = useState<string>("");
  const [solicitantes, setSolicitantes] = useState<Persona[]>([
    { ...initialNatural, id: 1 },
  ]);
  const [invitadores, setInvitadores] = useState<Persona[]>([
    { ...initialNatural, id: 1 },
  ]);
  const [direccionSolicitante] = useState<DireccionForm[]>([]);
  const [direccionInvitador] = useState<DireccionForm[]>([]);
  const [error] = useState({});
  const [loading] = useState(false);

  // 1. CARGAR DATOS DEL BACKEND
  const fetchExpedientes = async () => {
    setLoadingData(true);
    try {
      const apiData = await expedienteService.getAll();
      const rows = apiData.map(mapExpedienteToRow);
      setAllExpedientes(rows);
      setData(rows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchExpedientes();
  }, []);

  // 2. FILTRADO UNIFICADO (Tabs + Búsqueda)
  useEffect(() => {
    let filtered = allExpedientes;

    // A) Filtro por TAB
    if (tab === "documents") {
      filtered = filtered.filter(
        (item) => item.state === "Registrado" || item.nroExp === "Pendiente"
      );
    } else if (tab === "conciliador") {
      filtered = filtered.filter((item) => item.state === "Registrado");
    }

    // B) Filtro por BÚSQUEDA
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        // Buscar por Nombre del Cliente
        if (searchField === "nombre") {
          return item.client?.toLowerCase().includes(lowerTerm);
        }
        // Buscar por Nro Expediente (default)
        return item.nroExp?.toLowerCase().includes(lowerTerm);
      });
    }

    setData(filtered);
  }, [tab, allExpedientes, searchTerm, searchField]);

  // Función para manejar la búsqueda desde la vista
  const handleSearch = (term: string, field: string) => {
    setSearchTerm(term);
    setSearchField(field);
  };

  // MATERIAS
  const materiasPorTipo: Record<string, { value: string; label: string }[]> = {
    civil: [
      { value: "arrendamiento", label: "Arrendamiento" },
      { value: "contratos", label: "Contratos" },
      { value: "sucesiones", label: "Sucesiones" },
    ],
    familiar: [
      { value: "divorcio", label: "Divorcio" },
      { value: "alimentos", label: "Alimentos" },
    ],
  };

  const documentosPorMateria: Record<string, string[]> = {
    arrendamiento: ["Copia DNI", "Contrato de alquiler", "Recibo de pago"],
    contratos: ["Copia DNI", "Documento del contrato"],
    sucesiones: ["Partida de defunción", "Documento notarial"],
    divorcio: ["Acta de matrimonio", "Copia de DNI de ambas partes"],
    alimentos: [
      "Partida de nacimiento del menor",
      "Declaración jurada de gastos",
    ],
  };

  // FUNCIONES DE GESTIÓN DE PERSONAS
  const onAddClient = (tipoParte: TipoParte) => {
    const newId =
      Math.max(...[...solicitantes, ...invitadores].map((s) => s.id), 0) + 1;
    const nuevaParte = { ...initialNatural, id: newId };
    if (tipoParte === "solicitantes")
      setSolicitantes((prev) => [...prev, nuevaParte]);
    else setInvitadores((prev) => [...prev, nuevaParte]);
  };

  // MOCK de funciones (Asegúrate de tener tus implementaciones originales aquí)
  // He resumido estas funciones para mantener el foco en la búsqueda, pero NO las borres de tu archivo original.
  const onDelete = () => {
    /* ... tu lógica ... */
  };
  const onUpdate = () => {
    /* ... tu lógica ... */
  };
  const onUpdateApoderado = () => {
    /* ... tu lógica ... */
  };
  const onUpdateRepresentante = () => {
    /* ... tu lógica ... */
  };
  const addAddress = () => {
    /* ... tu lógica ... */
  };
  const deleteAddress = () => {
    /* ... tu lógica ... */
  };
  const onChange = () => {
    /* ... tu lógica ... */
  };
  const checkDocumentsMP = (val: boolean) => setDocumentsMP(val);

  const handleIniciar = async (e: any) => {
    e.preventDefault();
    console.log("Iniciando expediente...");
  };

  const value = {
    materiasPorTipo,
    documentosPorMateria,
    data,
    documentsMP,
    solicitantes,
    invitadores,
    acuerdoMutuo,
    documentoCargado,
    motivo,
    pretensiones,
    direccionSolicitante,
    direccionInvitador,
    error,
    loading,
    setInvitadores,
    setSolicitantes,
    setAcuerdoMutuo,
    setDocumentoCargado,
    setTab,
    setMotivo,
    setPretensiones,
    handleIniciar,
    onAddClient,
    onDelete,
    onUpdate,
    onUpdateApoderado,
    onUpdateRepresentante,
    addAddress,
    deleteAddress,
    onChange,
    checkDocumentsMP,
    handleSearch, // EXPORTAMOS LA FUNCIÓN
  };

  return (
    <ExpedienteContext.Provider value={value}>
      {children}
    </ExpedienteContext.Provider>
  );
}

export function useExpediente() {
  const context = useContext(ExpedienteContext);
  if (context === null) {
    throw new Error("useExpediente must be used within an ExpedienteProvider");
  }
  return context;
}
