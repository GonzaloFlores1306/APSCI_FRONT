import {
  BookOpen,
  Calendar,
  Target,
  Clock,
  TrendingUp,
  Gavel,
  LayoutDashboard,
} from "lucide-react";
import { Header } from "../components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartExpedientesMensuales,
  ChartEstados,
  ChartEfectividad,
  ChartMaterias,
} from "../components/dashboard/DashboardCharts";

const Inicio = () => {
  return (
    <div className="bg-gray-50/50 h-screen flex flex-col overflow-hidden">
      <Header titulo="Dashboard" />

      {/* Contenedor principal que no permite scroll global */}
      <div className="flex-1 p-3 lg:p-4 gap-3 lg:gap-4 flex flex-col max-w-[1920px] mx-auto w-full overflow-hidden">
        {/* Sección 1: KPIs */}
        <div className="flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-sky-600" /> Panel de
                Control
              </h2>
            </div>
            <div className="text-[10px] font-medium bg-white px-3 py-1 rounded-full border text-gray-500 shadow-sm">
              Año Fiscal 2025
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              title="Expedientes"
              value="2,847"
              icon={<BookOpen />}
              color="text-sky-600"
              bg="bg-sky-50"
              trend="+12%"
            />
            <KpiCard
              title="Audiencias"
              value="14"
              icon={<Calendar />}
              color="text-orange-600"
              bg="bg-orange-50"
              subtitle="Pendientes"
            />
            <KpiCard
              title="Efectividad"
              value="85%"
              icon={<Target />}
              color="text-green-600"
              bg="bg-green-50"
              subtitle="Acuerdos totales"
            />
            <KpiCard
              title="Tiempo Prom."
              value="15 días"
              icon={<Clock />}
              color="text-indigo-600"
              bg="bg-indigo-50"
              subtitle="Resolución"
            />
          </div>
        </div>

        {/* SECCIÓN 2: Gráficos  */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 min-h-0">
          <div className="lg:col-span-8 flex flex-col gap-3 h-full min-h-0">
            <div className="flex-[1.2] grid grid-cols-2 gap-3 min-h-0">
              <DashboardCard title="Flujo de Expedientes">
                <ChartExpedientesMensuales />
              </DashboardCard>
              <DashboardCard title="Tendencia de Acuerdos">
                <ChartEfectividad />
              </DashboardCard>
            </div>

            <div className="flex-1 min-h-0">
              <DashboardCard title="Top Materias Solicitadas">
                <ChartMaterias />
              </DashboardCard>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 h-full min-h-0">
            <div className="h-[40%] min-h-0">
              <DashboardCard title="Estado Actual">
                <ChartEstados />
              </DashboardCard>
            </div>

            <Card className="flex-1 flex flex-col min-h-0 rounded-2xl shadow-sm border-none ring-1 ring-gray-100 overflow-hidden bg-white">
              <CardHeader className="py-3 px-4 border-b border-gray-100 bg-white shrink-0">
                <CardTitle className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Próximas Audiencias
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="p-3 hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-default"
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          item % 2 === 0
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <Gavel className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          Exp-2025-00{item}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          Alimentos - Dr. Juan Pérez
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">
                          14:30
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon, color, bg, trend, subtitle }: any) => (
  <Card className="rounded-xl shadow-sm border-none ring-1 ring-gray-100 overflow-hidden bg-white">
    <CardContent className="p-3 lg:p-4 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </p>
        <div className="flex items-end gap-2 mt-0.5">
          <span className="text-xl lg:text-2xl font-bold text-gray-900">
            {value}
          </span>
          {trend && (
            <span className="text-[10px] text-green-600 flex items-center mb-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-0.5" /> {trend}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div
        className={`h-8 w-8 lg:h-10 lg:w-10 rounded-xl flex items-center justify-center ${bg} ${color}`}
      >
        <div className="scale-90 lg:scale-100">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="h-full flex flex-col rounded-2xl shadow-sm border-none ring-1 ring-gray-100 overflow-hidden bg-white">
    <CardHeader className="py-2 px-4 border-b border-gray-50 bg-white shrink-0 h-[45px] flex justify-center">
      <CardTitle className="text-xs uppercase tracking-wider font-semibold text-gray-500">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-2 flex-1 min-h-0 overflow-hidden relative">
      <div className="absolute inset-0 p-2 pb-4">{children}</div>
    </CardContent>
  </Card>
);

export default Inicio;
