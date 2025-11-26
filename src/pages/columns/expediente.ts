import type { DataType } from "../../types/TableTypes";

export const dataAll = [
  {
    id: 1,
    nroExp: "Exp-0001",
    client: "Juan Perez",
    type: "Civil",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Asignado",
  },
  {
    id: 2,
    nroExp: "",
    client: "Lucia de la Cruz",
    type: "Familiar",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Falta Documentos",
  },
  {
    id: 3,
    nroExp: "Exp-0002",
    client: "Carlos Cruzado",
    type: "Familiar",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Sin Conciliador",
  },
  {
    id: 4,
    nroExp: "Exp-0003",
    client: "Milton Cornejo",
    type: "Familiar",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Asignado",
  },
  {
    id: 5,
    nroExp: "Exp-0004",
    client: "Elias Buenaventura",
    type: "Civil",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Sin Conciliador",
  },
  {
    id: 6,
    nroExp: "Exp-0005",
    client: "Marta Diaz",
    type: "Civil",
    fechaRegistro: "2023-01-15T10:30:00Z",
    state: "Asignado",
  },
];

export const columnsExp = [
  { key: "id", label: "ID", type: "number" as DataType, sortable: true },
  {
    key: "nroExp",
    label: "Numero de expediente",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "client",
    label: "Solicitante",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "type",
    label: "Tipo",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "fechaRegistro",
    label: "Fecha de Registro",
    type: "date" as DataType,
    sortable: true,
  },
  { key: "state", label: "Estado", type: "string" as DataType, sortable: true },
];
