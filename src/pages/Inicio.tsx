import { BookOpen, Building, Calendar, Users } from "lucide-react";
import { Header } from "../components/Header";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Inicio = () => {
  return (
    <div>
      <Header titulo="Inicio" />
      <div className="space-y-8 mt-0 p-5">
        <section>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                  Inicio
                </Badge>
                <h2 className="text-3xl font-bold">
                  Bienvenido al centro de conciliacion EVAK
                </h2>
                <p className="max-w-[600px] text-white/80">
                  Gestiona tu biblioteca de manera eficiente con nuestro sistema
                  integral de administración.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                  <div className="absolute inset-4 rounded-full bg-white/20" />
                  <div className="absolute inset-8 rounded-full bg-white/30" />
                  <div className="absolute inset-12 rounded-full bg-white/40" />
                  <div className="absolute inset-16 rounded-full bg-white/50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Actas de Conciliacion
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                Desde el 01 de Septiembre
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cantidad de Actas del mes anterior
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                Desde el 01 al 31 de Agosto
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Ventas
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Ultimo mes</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trabajadores
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Total de trabajadores registrados
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity and Messages */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Grafico 1</h2>
            </div>
            <div className="rounded-3xl border"></div>
          </section>
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Grafico 2</h2>
            </div>
            <div className="rounded-3xl border"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
