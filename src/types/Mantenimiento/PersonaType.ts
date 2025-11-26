// Tipos de DTOs
export type TipoPersonaBackend =
  | "natural"
  | "juridico"
  | "apoderado"
  | "representate";

export interface PersonaApi {
  idPersona: number;
  correo: string;
  celular: string;
  estadoPersona: "ACTIVO" | "INACTIVO";
  "@type": TipoPersonaBackend; // Campo @type del @JsonTypeInfo

  // Campos Persona Natural
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  dni?: string;

  // Campos Persona Jurídica
  razonSocial?: string;
  ruc?: string;
}

// Interfaz para mostrar en tabla
export interface ClientRow {
  id: number;
  nombreCompleto: string; // Nombre + Apellido / Razón Social
  documento: string; // dni / ruc
  tipoDocumento: string; // "DNI" / "RUC"
  email: string;
  celular: string;
  activo: boolean;
  tipo: string; // "Natural" / "Jurídica"
}
