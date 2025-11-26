import { useState } from "react";
import { RepositoryProvider } from "@/context/repository/RepositoryContext";
import { Header } from "@/components/Header";
import { Calendar, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const mockExpedientes = [
  {
    id: "EXP-001",
    demandante: "Juan Pérez García",
    demandado: "Carlos López Martínez",
    pretension: "$5,000.00",
    estado: "Conciliado",
    fecha: "2024-01-15",
    documentos: ["Invitacion a conciliar", "Acta de Conciliacion"],
  },
  {
    id: "EXP-002",
    demandante: "María Rodríguez",
    demandado: "Empresa XYZ S.A.",
    pretension: "$10,000.00",
    estado: "En proceso",
    fecha: "2024-02-20",
    documentos: ["Invitacion a conciliar", "Acta de Notificacion"],
  },
  {
    id: "EXP-003",
    demandante: "Roberto Sánchez",
    demandado: "Ana Martínez",
    pretension: "$3,500.00",
    estado: "Suspendido",
    fecha: "2024-03-10",
    documentos: ["Pre Aviso", "Acta de Suspension"],
  },
  {
    id: "EXP-004",
    demandante: "Construcciones del Sur",
    demandado: "Materiales y Suministros",
    pretension: "$25,000.00",
    estado: "Conciliado",
    fecha: "2024-01-25",
    documentos: [
      "Invitacion a conciliar",
      "Acta de Notificacion",
      "Acta de Conciliacion",
      "Anexo",
    ],
  },
];

export const Repositorio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedExpediente, setSelectedExpediente] = useState<string | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Conciliado":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-blue-100 text-blue-800";
      case "Suspendido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredExpedientes = mockExpedientes.filter((exp) => {
    const matchesSearch =
      exp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.demandante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.demandado.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "todos" || exp.estado === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const selectedExp = mockExpedientes.find(
    (exp) => exp.id === selectedExpediente
  );
  return (
    <RepositoryProvider>
      <Header titulo="Repositorio" />
      <div className="space-y-6 overflow-y-auto h-[calc(100vh-100px)] p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Repositorio de Expedientes</h2>
          <p className="">
            Accede a todos tus expedientes y visualiza los documentos generados
            para cada caso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Expedientes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, demandante o demandado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-2xl"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={filterStatus}
                  onValueChange={(e) => setFilterStatus(e)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Conciliado">Conciliado</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Suspendido">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredExpedientes.length > 0 ? (
                filteredExpedientes.map((exp) => (
                  <div>
                    <Card
                      className={`rounded-3xl cursor-pointer transition-all hover:scale-101 ${
                        selectedExpediente === exp.id
                          ? "border-primary/50 bg-primary/5"
                          : "hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedExpediente(exp.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{exp.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exp.demandante} vs {exp.demandado}
                            </p>
                          </div>
                          <Badge className={getStatusColor(exp.estado)}>
                            {exp.estado}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Pretensión</p>
                            <p className="font-medium">{exp.pretension}</p>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {exp.fecha}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            {exp.documentos.length} docs
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              ) : (
                <Card className="rounded-3xl">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No se encontraron expedientes que coincidan con tu búsqueda
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Detalles del Expediente */}
          <div>
            {selectedExp ? (
              <div>
                <Card className="rounded-3xl sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedExp.id}</CardTitle>
                    <CardDescription>Detalles y documentos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Demandante
                      </p>
                      <p className="font-medium">{selectedExp.demandante}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Demandado</p>
                      <p className="font-medium">{selectedExp.demandado}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pretensión
                      </p>
                      <p className="font-medium">{selectedExp.pretension}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <Badge
                        className={`${getStatusColor(
                          selectedExp.estado
                        )} rounded-xl mt-1`}
                      >
                        {selectedExp.estado}
                      </Badge>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-3">
                        Documentos ({selectedExp.documentos.length})
                      </p>
                      <div className="space-y-2">
                        {selectedExp.documentos.map((doc) => (
                          <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted hover:scale-101 text-left">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{doc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full rounded-2xl mt-4 cursor-pointer hover:scale-102">
                      Ver Expediente Completo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="rounded-3xl">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>Selecciona un expediente para ver los detalles</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RepositoryProvider>
  );
};
