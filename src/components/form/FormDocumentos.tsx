import {
  Calendar,
  Ellipsis,
  FileText,
  FolderSearch,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const FormDocumentos = ({
  sampleExpedientes,
}: {
  sampleExpedientes: any[];
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}) => {
  const [expediente, setExpediente] = useState<any>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = () => {
    sampleExpedientes.map(
      (exp) => exp.numero === searchQuery && setExpediente(exp)
    );
    console.log(expediente);
    // setExpediente("NroExp");
  };
  return (
    <>
      <Card className="rounded-3xl space-y-2">
        <CardHeader>
          <CardTitle>Buscar Expediente</CardTitle>
          <CardDescription>
            Ingresa el número de expediente para ver sus detalles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div className="grid lg:grid-cols-4 gap-x-5">
            <div className="relative space-y-5 col-span-3">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ej: EXP-2024-001"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl pl-10"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <Button
                className="flex-1 rounded-xl cursor-pointer hover:scale-101"
                onClick={onSearch}
              >
                <FolderSearch />
                Buscar
              </Button>
            </div>
          </div>

          {expediente && (
            <div className="mt-4">
              <Card className={`rounded-3xl p-2`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {expediente.numero}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {expediente.demandante}vs {expediente.demandado}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gray-100 text-gray-800">
                        {expediente.estado}
                      </Badge>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Ellipsis className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                          <div className="p-2">
                            <div className="space-y-2">
                              {expediente.estado === "No Asignado" ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full mt-2"
                                  // onClick={() => setGroupByField(null)}
                                >
                                  Asignar Conciliador
                                </Button>
                              ) : expediente.estado === "Audiencia" ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2 flex justify-start"
                                    // onClick={() => setGroupByField(null)}
                                  >
                                    Crear Acta de Notificacion
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2 flex justify-start"
                                    // onClick={() => setGroupByField(null)}
                                  >
                                    Crear PreAviso
                                  </Button>
                                </>
                              ) : expediente.estado === "Asignado" ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full mt-2"
                                  // onClick={() => setGroupByField(null)}
                                >
                                  Crear Audiencia
                                </Button>
                              ) : expediente.estado === "Notificado" ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2"
                                    // onClick={() => setGroupByField(null)}
                                  >
                                    Suspender
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2"
                                    // onClick={() => setGroupByField(null)}
                                  >
                                    Asistencia
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-2"
                                    // onClick={() => setGroupByField(null)}
                                  >
                                    Conciliacion
                                  </Button>
                                </>
                              ) : expediente.estado === "Suspendido" ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full mt-2"
                                  // onClick={() => setGroupByField(null)}
                                >
                                  Crear Audiencia
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Materias</p>
                      <p className="font-medium">Pretension</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Fecha
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      01 docs
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
