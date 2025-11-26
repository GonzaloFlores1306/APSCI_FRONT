import type { SedeApi, SedeInterface } from "../types/Mantenimiento/SedeType";

export const mapSedeInterfaceToApi = (s: SedeInterface): SedeApi => {
  return {
    idSede: s.id,
    nombre: s.name,
    descripcion: s.desc,
    estadoSede: s.estate,
  };
};

export const mapSedeApiToInterface = (s: SedeApi): SedeInterface => {
  return {
    id: s.idSede,
    name: s.nombre,
    desc: s.descripcion,
    estate: s.estadoSede,
  };
};
