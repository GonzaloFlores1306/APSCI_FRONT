import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";
import type { DataType } from "../../types/TableTypes";
import { SedeData } from "../../components/table/SedeData";
import { SedeDialog } from "../../components/dialogs/SedeDialog";
import { useSede } from "../../context/Mantenimiento/SedeContext";
import { Loading } from "../../components/Loading";
import { Toaster } from "../../components/ui/sonner";

const customColumns = [
  { key: "id", label: "ID", type: "number" as DataType, sortable: true },
  {
    key: "name",
    label: "Nombre Sede",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "desc",
    label: "Descripcion",
    type: "string" as DataType,
    sortable: true,
  },
];

export const Sedes = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const handleSearchTrabajadores = async (
    searchTerm: string,
    searchField: string
  ) => {
    console.log(searchField, searchTerm);
  };
  const searchConfig = {
    fields: [
      { key: "dni", label: "DNI" },
      { key: "nombre", label: "Nombre" },
    ],
    defaultField: "dni",
    placeholder: "Buscar trabajador...",
    onSearch: handleSearchTrabajadores,
  };

  const { data, loading } = useSede();

  return (
    <>
      <div className="flex flex-col-reverse justify-between py-5 px-7 items-start md:flex-row md:items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Sedes</span>
          <span>Gestiona las ubicaciones de tus archivos y tus negocios</span>
        </div>
        <SedeDialog type="add" />
      </div>
      <Toaster />
      <div className=" flex justify-between px-7 py-5">
        <Tabs
          defaultValue="inicio"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="space-y-6 mt-0">
            {loading.view ? (
              <div>
                <Loading text="Cargando" />
              </div>
            ) : (
              <SedeData
                searchConfig={searchConfig}
                data={data}
                columns={customColumns}
                role="Admin"
              />
            )}
          </div>
        </Tabs>
      </div>
    </>
  );
};
