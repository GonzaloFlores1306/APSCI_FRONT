import type { TipoParte } from "./DataTypes";
import type {
  Apoderado,
  DireccionForm,
  Persona,
  Representante,
} from "./EntityTypes";

export interface ExpedienteContextType {
  // Variables de estado
  materiasPorTipo: Record<string, { value: string; label: string }[]>;
  documentosPorMateria: Record<string, string[]>;
  data: any;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  documentsMP: boolean | null;
  solicitantes: Persona[];
  invitadores: Persona[];
  acuerdoMutuo: boolean;
  documentoCargado: boolean;
  motivo: string;
  pretensiones: string;
  direccionSolicitante: DireccionForm[];
  direccionInvitador: DireccionForm[];
  error: any;
  loading: boolean;

  //Setters de estado
  setSolicitantes: (s: Persona[]) => void;
  setInvitadores: (i: Persona[]) => void;
  setAcuerdoMutuo: (v: boolean) => void;
  setDocumentoCargado: (v: boolean) => void;
  setMotivo: (v: string) => void;
  setPretensiones: (v: string) => void;

  //Funciones
  handleIniciar: (e: any) => void;
  onAddClient: (tipoParte: TipoParte) => void;
  onDelete: (id: number, tipoParte: TipoParte) => void;
  onUpdate: (
    id: number,
    field: string,
    value: string | boolean,
    tipoParte: TipoParte
  ) => void;
  onUpdateApoderado: (
    id: number,
    field: keyof Apoderado,
    value: string | boolean,
    tipoParte: TipoParte
  ) => void;
  onUpdateRepresentante: (
    id: number,
    field: keyof Representante,
    value: string,
    tipoParte: TipoParte
  ) => void;
  addAddress: (tipoParte: TipoParte, address: DireccionForm) => void;
  deleteAddress: (tipoParte: TipoParte, indiceAEliminar: number) => void;
  onChange: (
    id: number,
    field: keyof Persona,
    value: string | boolean,
    tipoParte: TipoParte
  ) => void;
  checkDocumentsMP: (checked: boolean) => void;
  handleSearch: (term: string, field: string) => void;
}
