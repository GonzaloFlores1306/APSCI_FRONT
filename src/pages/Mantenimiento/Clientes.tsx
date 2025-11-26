import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import type { DataType } from "../../types/TableTypes";
import { TableData } from "../../components/table/TableData";
// Asegúrate de que esta ruta sea correcta según tu estructura de carpetas
import { useClient } from "../../context/Mantenimiento/ClientContext";

// 1. DEFINICIÓN DE COLUMNAS
const clientColumns = [
  { key: "id", label: "ID", type: "number" as DataType, sortable: true },
  {
    key: "nombreCompleto", // El mapper unificó Nombre y Razón Social aquí
    label: "Nombre / Razón Social",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "documento", // El mapper unificó DNI y RUC aquí
    label: "Documento (DNI/RUC)",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "tipo", // 'Natural' o 'Jurídica'
    label: "Tipo",
    type: "string" as DataType,
    sortable: true,
  },
  {
    key: "email",
    label: "Correo",
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

const Clientes = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  // 2. Extraer handleSearch del Contexto
  const { clientes, loading, handleSearch } = useClient();

  // 3. Conectar el evento de la tabla con el contexto
  const handleSearchTrabajadores = (
    searchTerm: string,
    searchField: string
  ) => {
    // Aquí llamamos a la función del contexto que dispara el useEffect y la petición al API
    handleSearch(searchTerm, searchField);
  };

  const searchConfig = {
    fields: [
      { key: "documento", label: "Documento" },
      { key: "nombreCompleto", label: "Nombre" },
    ],
    defaultField: "documento",
    placeholder: "Buscar cliente...",
    onSearch: handleSearchTrabajadores, // Pasamos la función conectada
  };

  return (
    <>
      <div className="flex flex-col-reverse justify-between py-5 px-7 items-start md:flex-row md:items-center">
        <div className="flex flex-col ">
          <span className="text-2xl font-bold">Clientes</span>
          <span className="text-sm text-gray-500">
            Gestiona tus clientes naturales y jurídicos
          </span>
        </div>
        {/* <ClientDialog /> */}
      </div>

      <div className=" flex justify-between px-7 py-5">
        <Tabs
          defaultValue="inicio"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3 rounded-2xl p-1 gap-2 bg-neutral-100">
              <TabsTrigger
                value="inicio"
                className={`${
                  activeTab === "inicio" ? "btnSeleccion" : ""
                } rounded-xl cursor-pointer py-1.5`}
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="naturales"
                className={`${
                  activeTab === "naturales" ? "btnSeleccion" : ""
                } rounded-xl cursor-pointer py-1.5`}
              >
                Naturales
              </TabsTrigger>
              <TabsTrigger
                value="juridicos"
                className={`${
                  activeTab === "juridicos" ? "btnSeleccion" : ""
                } rounded-xl cursor-pointer py-1.5`}
              >
                Jurídicos
              </TabsTrigger>
            </TabsList>
          </div>

          <div>
            {/* Indicador de carga */}
            {loading && (
              <div className="text-center py-4 text-gray-500">
                Buscando resultados...
              </div>
            )}

            <div>
              {/* TAB: TODOS */}
              <TabsContent value="inicio" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  data={clientes} // Pasamos todos los datos del contexto
                  columns={clientColumns}
                  role="Admin"
                />
              </TabsContent>

              {/* TAB: NATURALES */}
              <TabsContent value="naturales" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  // Filtramos usando la propiedad 'tipo' que definimos en el Mapper
                  data={clientes.filter((c) => c.tipo === "Natural")}
                  columns={clientColumns}
                  role="Admin"
                />
              </TabsContent>

              {/* TAB: JURIDICOS */}
              <TabsContent value="juridicos" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  // Filtramos usando la propiedad 'tipo' que definimos en el Mapper
                  data={clientes.filter((c) => c.tipo === "Jurídica")}
                  columns={clientColumns}
                  role="Admin"
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Clientes;
