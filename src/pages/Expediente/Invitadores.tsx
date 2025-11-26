import { Header } from "../../components/Header";
import { TableData } from "../../components/table/TableData";
import {
  InvitadoresProvider,
  useInvitadores,
} from "../../context/Expedientes/InvitadoresContext";
import type { DataType } from "../../types/TableTypes";

const customColumns = [
  { key: "id", label: "ID", type: "number" as DataType, sortable: true },
  {
    key: "nombreCompleto",
    label: "Nombre / Razón Social",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "documento",
    label: "Documento",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "tipo",
    label: "Tipo",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "email",
    label: "Correo Electrónico",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "celular",
    label: "Celular",
    type: "string" as DataType,
    sortable: false,
  },
  {
    key: "activo",
    label: "Estado",
    type: "boolean" as DataType,
    sortable: true,
  },
];

const InvitadoresContent = () => {
  const { invitadores, loading, handleSearch } = useInvitadores();

  const handleSearchExpediente = (searchTerm: string, searchField: string) => {
    handleSearch(searchTerm, searchField);
  };

  const searchConfig = {
    fields: [
      { key: "documento", label: "DNI/RUC" },
      { key: "nombreCompleto", label: "Nombre" },
    ],
    defaultField: "documento",
    placeholder: "Buscar Invitado...",
    onSearch: handleSearchExpediente,
  };

  if (loading)
    return <div className="p-8 text-center">Cargando invitadores...</div>;

  return (
    <div className="overflow-y-auto h-[calc(100vh-100px)]">
      <div className="flex justify-between py-5 px-7 items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Invitadores</span>
          <span className="text-sm text-gray-500">
            Lista de clientes registrados en el sistema
          </span>
        </div>
      </div>
      <div className="flex justify-between px-7 py-5">
        <div className="w-full space-y-6 mt-0">
          <TableData
            data={invitadores}
            columns={customColumns}
            role="Admin"
            searchConfig={searchConfig}
          />
        </div>
      </div>
    </div>
  );
};

export const Invitadores = () => {
  return (
    <InvitadoresProvider>
      <Header titulo="Invitadores" />
      <InvitadoresContent />
    </InvitadoresProvider>
  );
};
