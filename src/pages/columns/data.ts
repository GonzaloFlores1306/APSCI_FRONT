import type { DataType } from "@/types/TableTypes";

const baseColumns = [
  { key: "id", label: "ID", type: "number" as DataType, sortable: true },
  { key: "dni", label: "DNI", type: "string" as DataType, sortable: true },
  {
    key: "name",
    label: "Nombre",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "lastname",
    label: "Apellidos",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "user",
    label: "Usuario",
    type: "string" as DataType,
    sortable: true,
  },
  { key: "email", label: "Correo", type: "string" as DataType, sortable: true },
  {
    key: "phone",
    label: "Telefono",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "estado",
    label: "Estado",
    type: "boolean" as DataType,
    sortable: true,
  },
  { key: "rol", label: "Rol", type: "array" as DataType, sortable: false },
];

export const columnsAll = baseColumns;
export const columnsAdministrador = baseColumns;

export const columnsConciliador = [
  ...baseColumns,
  {
    key: "registro",
    label: "Registro",
    type: "string" as DataType,
    sortable: true,
  },
];

// 🧾 Asistente → columnas base + Permisos
export const columnsAsistente = [
  ...baseColumns,
  {
    key: "permisos",
    label: "Permisos",
    type: "string" as DataType,
    sortable: false,
  },
];
