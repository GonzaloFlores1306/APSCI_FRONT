// Convierte @type en un objeto mostrable
import type { PersonaApi, ClientRow } from "@/types/Mantenimiento/PersonaType";

export const mapClientRowFromApi = (persona: PersonaApi): ClientRow => {
  let nombreMostrado = "";
  let documentoMostrado = "";
  let tipoDoc = "";
  let tipoLegible = "";

  // Lógica polimórfica (@type)
  if (persona["@type"] === "natural") {
    nombreMostrado = `${persona.nombre || ""} ${
      persona.apellidoPaterno || ""
    } ${persona.apellidoMaterno || ""}`.trim();
    documentoMostrado = persona.dni || "";
    tipoDoc = "DNI";
    tipoLegible = "Natural";
  } else if (persona["@type"] === "juridico") {
    nombreMostrado = persona.razonSocial || "";
    documentoMostrado = persona.ruc || "";
    tipoDoc = "RUC";
    tipoLegible = "Jurídica";
  } else {
    // Fallback para otros tipos si existieran
    nombreMostrado = "Desconocido";
    tipoLegible = persona["@type"] || "Otro";
  }

  return {
    id: persona.idPersona,
    nombreCompleto: nombreMostrado,
    documento: documentoMostrado,
    tipoDocumento: tipoDoc,
    email: persona.correo,
    celular: persona.celular,
    activo: persona.estadoPersona === "ACTIVO",
    tipo: tipoLegible,
  };
};
