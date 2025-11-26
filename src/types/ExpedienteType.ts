import type { PersonaApi } from "./Mantenimiento/PersonaType";

// --- DTOs del Backend ---

export interface TipoMateriaApi {
  idtipomateria: number;
  nombreTipoMateria: string; // "CIVIL Y COMERCIAL", "FAMILIAR"
  descripcionTipoMateria: string;
}

export interface MateriaApi {
  idMateria: number;
  nombreMateria: string;
  descripcionMateria: string;
  tipoMateria?: TipoMateriaApi;
}

export interface ExpedienteApi {
  idExpediente: number;
  numeroExpediente?: string; // Null si está en REGISTRADO
  fechaRecepcion: string;
  estadoProceso: "REGISTRADO" | "ASIGNADO" | "ENCURSO" | "FINALIZADO";
  pretension: string;
  hechos: string;
  fechaAudiencia?: string;

  persona: PersonaApi; // La persona que creó el expediente
  materias: MateriaApi[];
  // participantes?: any[]; // Si necesitas mostrar detalles de participantes
}

// --- Interfaz para la Tabla (Frontend) ---
export interface ExpedienteRow {
  id: number;
  nroExp: string; // "Exp-0001" o "Pendiente"
  client: string; // Nombre del solicitante principal
  type: string; // "Civil" o "Familiar" (Basado en la materia)
  fechaRegistro: string;
  state: string; // Estado formateado
}
