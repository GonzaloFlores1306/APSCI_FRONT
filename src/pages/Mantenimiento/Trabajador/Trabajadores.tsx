import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { TableData } from "../../../components/table/TableData";
import { TrabajadorDialog } from "../../../components/dialogs/TrabajadorDialog";
import { useWorker } from "../../../context/Mantenimiento/WorkerContext";
import { TrabajadorActions } from "../../../components/actions/TrabajadorActions";
import { Toaster } from "sonner";

const Trabajadores = () => {
  const { activeTab, setActiveTab, data, columns, setSearch } = useWorker();
  const handleSearchTrabajadores = async (
    searchTerm: string,
    searchField: string
  ) => {
    setSearch(searchField, searchTerm);
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

  return (
    <>
      <div className="flex flex-col-reverse justify-between py-5 px-7 items-start md:flex-row md:items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Trabajadores</span>
          <span>
            Gestiona el personal de tu empresa segun el tipo que ha sido
            ingresado
          </span>
        </div>
        <TrabajadorDialog type="add" />
      </div>
      <Toaster position="top-center" closeButton={true} visibleToasts={2} />
      <div className=" flex justify-between px-7 py-5">
        <Tabs
          defaultValue="inicio"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
            <TabsList className="grid w-full max-w-[800px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl p-1 gap-2 bg-neutral-100">
              <TabsTrigger
                value="inicio"
                className={`
                  ${activeTab === "inicio" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="conciliadores"
                className={`
                  ${activeTab === "conciliadores" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
              >
                Conciliadores
              </TabsTrigger>
              <TabsTrigger
                value="asistente"
                className={`
                  ${activeTab === "asistente" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
              >
                Asistente Adm.
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className={`
                  ${activeTab === "admin" ? "btnSeleccion" : ""}
                  rounded-xl cursor-pointer py-1.5
                  `}
              >
                Administrador
              </TabsTrigger>
            </TabsList>
          </div>

          <div>
            <div>
              {/* INICIO TAB */}
              <TabsContent value="inicio" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  data={data}
                  columns={columns}
                  role="Admin"
                  renderActions={(row) => (
                    <TrabajadorActions row={row} role={"Admin"} />
                  )}
                />
              </TabsContent>

              {/* TRABAJADORES TAB */}
              <TabsContent value="conciliadores" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  data={data}
                  columns={columns}
                  role="Admin"
                  renderActions={(row) => (
                    <TrabajadorActions row={row} role={"Admin"} />
                  )}
                />
              </TabsContent>

              {/* CLIENTES TAB */}
              <TabsContent value="asistente" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  data={data}
                  columns={columns}
                  role="Admin"
                  renderActions={(row) => (
                    <TrabajadorActions row={row} role={"Admin"} />
                  )}
                />
              </TabsContent>
              <TabsContent value="admin" className="space-y-6 mt-0">
                <TableData
                  searchConfig={searchConfig}
                  data={data}
                  columns={columns}
                  role="Admin"
                  renderActions={(row) => (
                    <TrabajadorActions row={row} role={"Admin"} />
                  )}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Trabajadores;
