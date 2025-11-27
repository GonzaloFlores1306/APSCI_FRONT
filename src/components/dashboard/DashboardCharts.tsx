import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

// Mock Data: Tendencia de expedientes por mes
export const dataExpedientesMensuales = [
  { name: "Ene", total: 12 },
  { name: "Feb", total: 18 },
  { name: "Mar", total: 25 },
  { name: "Abr", total: 20 },
  { name: "May", total: 35 },
  { name: "Jun", total: 42 },
];

// Mock Data: Estado de los expedientes
export const dataEstados = [
  { name: "Registrados", value: 10, color: "#0ea5e9" },
  { name: "En Curso", value: 25, color: "#eab308" },
  { name: "Finalizados", value: 45, color: "#22c55e" },
  { name: "Cancelados", value: 5, color: "#ef4444" },
];

// Tasa de éxito (Acuerdos vs No Acuerdos)
export const dataEfectividad = [
  { name: "Ene", acuerdos: 8, noAcuerdos: 4 },
  { name: "Feb", acuerdos: 12, noAcuerdos: 6 },
  { name: "Mar", acuerdos: 20, noAcuerdos: 5 },
  { name: "Abr", acuerdos: 15, noAcuerdos: 5 },
  { name: "May", acuerdos: 30, noAcuerdos: 5 },
  { name: "Jun", acuerdos: 38, noAcuerdos: 4 },
];

// Ranking de materias más solicitadas
export const dataMaterias = [
  { name: "Alimentos", cantidad: 120 },
  { name: "Régimen Visitas", cantidad: 85 },
  { name: "Desalojo", cantidad: 45 },
  { name: "Deudas", cantidad: 30 },
  { name: "Divorcio", cantidad: 20 },
];

export const ChartExpedientesMensuales = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataExpedientesMensuales}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ChartEstados = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataEstados}
          cx="50%"
          cy="50%"
          innerRadius="45%"
          outerRadius="80%"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {dataEstados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            fontSize: "12px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          itemStyle={{ color: "#374151" }}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          height={40}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} // Espacio extra arriba de la leyenda
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const ChartEfectividad = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={dataEfectividad}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorAcuerdos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNoAcuerdos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="acuerdos"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorAcuerdos)"
          name="Acuerdos"
        />
        <Area
          type="monotone"
          dataKey="noAcuerdos"
          stroke="#ef4444"
          fillOpacity={1}
          fill="url(#colorNoAcuerdos)"
          name="No Acuerdos"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const ChartMaterias = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={dataMaterias}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barCategoryGap={2}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          width={100}
          tick={{ fontSize: 12, fill: "#4b5563" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Bar
          dataKey="cantidad"
          fill="#6366f1"
          radius={[0, 4, 4, 0]}
          barSize={20}
          name="Expedientes"
        ></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
