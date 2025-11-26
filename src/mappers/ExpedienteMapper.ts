import type { ExpedienteApi, ExpedienteRow } from "@/types/ExpedienteType";
import type { PersonaApi } from "@/types/Mantenimiento/PersonaType";

const getNombrePersona = (p: PersonaApi): string => {
  if (!p) return "Desconocido";
  if (p["@type"] === "natural") {
    return `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`.trim();
  } else if (p["@type"] === "juridico") {
    return p.razonSocial || "Empresa sin razón social";
  }
  return "Desconocido";
};

export const mapExpedienteToRow = (api: ExpedienteApi): ExpedienteRow => {
  // 1. Determinar el Tipo (Civil / Familiar)
  let tipoExpediente = "General";
  if (api.materias && api.materias.length > 0) {
    const materia = api.materias[0];
    if (materia.tipoMateria) {
      const nombreTipo = materia.tipoMateria.nombreTipoMateria.toLowerCase();
      if (nombreTipo.includes("civil")) tipoExpediente = "Civil";
      else if (nombreTipo.includes("familiar")) tipoExpediente = "Familiar";
      else tipoExpediente = materia.tipoMateria.nombreTipoMateria;
    }
  }

  // 2. Formatear Estado
  const estadoMap: Record<string, string> = {
    REGISTRADO: "Registrado",
    ASIGNADO: "Asignado",
    ENCURSO: "En Curso",
    FINALIZADO: "Finalizado",
  };

  return {
    id: api.idExpediente,
    nroExp: api.numeroExpediente || "Pendiente", // Texto si es null
    client: getNombrePersona(api.persona),
    type: tipoExpediente,
    fechaRegistro: api.fechaRecepcion, // Formatear a fecha
    state: estadoMap[api.estadoProceso] || api.estadoProceso,
  };
};
