import { useState } from "react";
import { Tabs } from "../../components/ui/tabs";
import { TableData } from "../../components/table/TableData";
import MesaPartes from "../../components/dialogs/MesaPartes";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import { columnsExp } from "../columns/expediente";

const ListaExpediente = () => {
  const { data, setTab, handleSearch } = useExpediente();
  const [activeTab, setActiveTab] = useState("inicio");

  const handleTab = (value: string) => {
    setActiveTab(value);
    setTab(value);
  };

  const handleSearchExpediente = (searchTerm: string, searchField: string) => {
    handleSearch(searchTerm, searchField);
  };

  const searchConfig = {
    fields: [
      { key: "expediente", label: "Nro Expediente" },
      { key: "nombre", label: "Nombre" },
    ],
    defaultField: "expediente",
    placeholder: "Buscar Expediente...",
    onSearch: handleSearchExpediente,
  };

  return (
    <>
      <div className="flex flex-col-reverse justify-between py-5 px-7 items-start md:flex-row md:items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Expedientes</span>
          <span>Gestiona los expedientes creados.</span>
        </div>
        <MesaPartes />
      </div>
      <div className=" flex justify-between px-7 py-5">
        <Tabs
          defaultValue="inicio"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="grid w-full max-w-[600px] grid-cols-1 md:grid-cols-3 rounded-2xl p-1.5 gap-2 bg-neutral-100">
              <button
                value="inicio"
                className={`
                  ${activeTab === "inicio" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
                onClick={() => handleTab("inicio")}
              >
                Todos
              </button>
              <button
                value="documents"
                className={`
                  ${activeTab === "documents" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
                onClick={() => handleTab("documents")}
              >
                Sin Documentos
              </button>
              <button
                value="conciliador"
                className={`
                  ${activeTab === "conciliador" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
                onClick={() => handleTab("conciliador")}
              >
                Sin Conciliador
              </button>
            </div>
          </div>

          <div className="space-y-6 mt-0">
            <TableData
              data={data}
              columns={columnsExp}
              role="Asistente"
              searchConfig={searchConfig}
            />
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default ListaExpediente;
