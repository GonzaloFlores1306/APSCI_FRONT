import { useState } from "react";
import { ReportProvider } from "../context/reports/ReportContext";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BarChart3,
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

const reportTypes = [
  {
    id: "conciliaciones",
    title: "Reporte de Conciliaciones",
    description: "Estadísticas de casos conciliados y no conciliados",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    metrics: [
      { label: "Total de Casos", value: "1,245" },
      { label: "Conciliados", value: "892" },
      { label: "No Conciliados", value: "353" },
      { label: "Tasa de Éxito", value: "71.6%" },
    ],
  },
  {
    id: "expedientes",
    title: "Reporte de Expedientes",
    description: "Seguimiento por estado y fecha",
    icon: <FileText className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    metrics: [
      { label: "Expedientes Abiertos", value: "456" },
      { label: "En Proceso", value: "234" },
      { label: "Cerrados", value: "1,789" },
      { label: "Promedio por Mes", value: "98" },
    ],
  },
  {
    id: "periodo",
    title: "Reporte por Período",
    description: "Análisis detallado por rango de fechas",
    icon: <Calendar className="h-8 w-8" />,
    color: "from-green-500 to-teal-500",
    metrics: [
      { label: "Este Mes", value: "234" },
      { label: "Mes Anterior", value: "198" },
      { label: "Trimestre", value: "612" },
      { label: "Variación", value: "+18.2%" },
    ],
  },
  {
    id: "mediadores",
    title: "Reporte de Mediadores",
    description: "Desempeño y productividad de mediadores",
    icon: <Users className="h-8 w-8" />,
    color: "from-amber-500 to-orange-500",
    metrics: [
      { label: "Total Mediadores", value: "24" },
      { label: "Casos Promedio", value: "52" },
      { label: "Mejor Desempeño", value: "Juan Pérez" },
      { label: "Casos Este Mes", value: "1,248" },
    ],
  },
  {
    id: "recaudacion",
    title: "Reporte de Recaudación",
    description: "Montos conciliados y tasas de recuperación",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "from-red-500 to-rose-500",
    metrics: [
      { label: "Total Recaudado", value: "$125,450" },
      { label: "Promedio por Caso", value: "$1,245" },
      { label: "Este Mes", value: "$18,560" },
      { label: "Variación YoY", value: "+24.5%" },
    ],
  },
  {
    id: "satisfaccion",
    title: "Reporte de Satisfacción",
    description: "Encuestas y feedback de usuarios",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-indigo-500 to-blue-500",
    metrics: [
      { label: "Satisfacción Promedio", value: "4.7/5" },
      { label: "Encuestas Respondidas", value: "892" },
      { label: "Recomendaría", value: "94%" },
      { label: "Casos Exitosos", value: "89.2%" },
    ],
  },
];

export const Reportes = () => {
  const [] = useState("");
  const [] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const handleGenerateReport = (reportId: string) => {
    alert(`Generando reporte: ${reportId}`);
  };

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    alert(`Exportando reporte en formato: ${format}`);
  };
  return (
    <ReportProvider>
      <Header titulo="Reportes" />
      <div className="space-y-6 overflow-y-auto h-[calc(100vh-100px)] p-6">
        <div className="">
          <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
          <p className="">
            Genera reportes detallados y exporta datos para análisis profundo de
            tus operaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div>
              <Card
                className={`rounded-3xl cursor-pointer overflow-hidden transition-all ${
                  selectedReport === report.id
                    ? "border-primary/50 ring-2 ring-primary/20"
                    : ""
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className={`bg-gradient-to-br p-6 `}>
                  <div className="flex items-center justify-between mb-2">
                    {report.icon}
                    <Badge className="bg-neutral-100 hover:bg-white/30 rounded-xl">
                      Disponible
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <p className="text-sm ">{report.description}</p>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    {report.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {metric.label}
                        </span>
                        <span className="font-semibold">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleGenerateReport(report.id)}
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      Generar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Export Options */}
        <div>
          <Card className="rounded-3xl bg-gradient-to-r from-slate-50 to-slate-100">
            <CardHeader>
              <CardTitle>Opciones de Exportación</CardTitle>
              <CardDescription>
                Descarga tus reportes en diferentes formatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Button
                    onClick={() => handleExportReport("pdf")}
                    variant="outline"
                    className="w-full rounded-2xl"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar a PDF
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => handleExportReport("excel")}
                    variant="outline"
                    className="w-full rounded-2xl"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Exportar a Excel
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => handleExportReport("csv")}
                    variant="outline"
                    className="w-full rounded-2xl"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Exportar a CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ReportProvider>
  );
};
