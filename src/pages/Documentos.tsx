import { useState } from "react";
import { DocumentProvider } from "@/context/documents/DocumentContext";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SolicitudForm } from "@/components/form/SolicitudForm";
import { EsquelaForm } from "@/components/form/EsquelaForm";
import { InvitacionForm } from "@/components/form/InvitacionForm";
import { NotificacionForm } from "@/components/form/NotificacionForm";
import { PreAvisoForm } from "@/components/form/PreAvisoForm";
import { ConciliacionForm } from "@/components/form/ConciliacionForm";
import { ConstanciaForm } from "@/components/form/ConstanciaForm";
import { SuspensionForm } from "@/components/form/SuspensionForm";
import { AnexoForm } from "@/components/form/AnexoForm";
import { FormDocumentos } from "@/components/form/FormDocumentos";
import type { SolicitudInterface } from "@/types/DocumentTypes";

export type Estados =
  | "No Asignado"
  | "Asignado"
  | "Audiencia"
  | "Notificado"
  | "Suspendido"
  | "Terminado";

const sampleExpedientes = [
  {
    numero: "EXP-2024-001",
    demandante: "Juan García",
    demandado: "María López",
    estado: "No Asignado",
    fecha: "2024-01-15",
  },
  {
    numero: "EXP-2024-002",
    demandante: "Carlos Ruiz",
    demandado: "Ana Martínez",
    estado: "Audiencia",
    fecha: "2024-02-20",
  },
  {
    numero: "EXP-2024-003",
    demandante: "Pedro Sánchez",
    demandado: "Rosa Fernández",
    estado: "Suspendido",
    fecha: "2024-03-10",
  },
  {
    numero: "EXP-2024-004",
    demandante: "Luis Jiménez",
    demandado: "Carmen Díaz",
    estado: "Notificado",
    fecha: "2024-03-25",
  },
];

const forms = [
  {
    value: "solicitud",
    label: "Solicitud de Conciliación",
    component: <SolicitudForm />,
    tab: false,
  },
  {
    value: "esquela",
    label: "Esquela de Designación",
    component: <EsquelaForm />,
    tab: false,
  },
  {
    value: "procesoNotificacion",
    label: "Proceso de Notificacion",
    tab: true,
    components: [
      {
        value: "invitacion",
        label: "Invitación a Conciliar",
        component: <InvitacionForm />,
      },
      {
        value: "notificacion",
        label: "Acta de Notificación",
        component: <NotificacionForm />,
      },
      { value: "preaviso", label: "Pre Aviso", component: <PreAvisoForm /> },
    ],
  },
  {
    value: "audiencia",
    label: "Audiencia",
    tab: true,
    components: [
      {
        value: "conciliacion",
        label: "Acta de Conciliación",
        component: <ConciliacionForm />,
      },
      {
        value: "constancia",
        label: "Constancia de Asistencia",
        component: <ConstanciaForm />,
      },
      {
        value: "suspension",
        label: "Suspensión de la Audiencia",
        component: <SuspensionForm />,
      },
    ],
  },
  { value: "anexo", label: "Anexo", component: <AnexoForm />, tab: false },
];

export const Documentos = () => {
  // const [activeTab, setActiveTab] = useState("procesoNotificacion");
  const [activeTab, setActiveTab] = useState("solicitud");
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [data, setData] = useState<SolicitudInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    fecha: "",
    hechos: "",
    pretension: "",
  });
  const [errors] = useState<Record<string, string>>({});
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <DocumentProvider>
      <Header titulo="Documentos" />
      <div className="space-y-6 overflow-y-auto h-[calc(100vh-100px)] p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Gestión de Documentos</h2>
          <p className="">
            Genera y administra todos tus documentos legales de conciliación en
            un solo lugar.
          </p>
        </div>
        <div>
          <FormDocumentos
            sampleExpedientes={sampleExpedientes}
            data={data}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 rounded-2xl p-2 gap-2">
            {forms.map((item) => (
              <TabsTrigger
                value={item.value}
                className="rounded-xl text-xs md:text-sm"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            {forms.map((item) =>
              item.tab ? (
                // Si el item tiene sub-tabs (por ejemplo "procesoNotificacion" o "audiencia")
                <TabsContent key={item.value} value={item.value}>
                  <Tabs
                    value={activeSubTab ?? item.components?.[0]?.value}
                    onValueChange={(value: string) => setActiveSubTab(value)}
                    defaultValue={item.components?.[0]?.value ?? item.value}
                    className="w-full mt-3"
                  >
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 rounded-2xl p-2 gap-3">
                      {item.components?.map((sub) => (
                        <TabsTrigger
                          key={sub.value}
                          value={sub.value}
                          className="rounded-xl text-xs md:text-sm"
                        >
                          {sub.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {item.components?.map((sub) => (
                      <TabsContent key={sub.value} value={sub.value}>
                        {sub.component}
                      </TabsContent>
                    ))}
                  </Tabs>
                </TabsContent>
              ) : (
                // Si el item es un tab simple
                <TabsContent key={item.value} value={item.value}>
                  {item.component}
                </TabsContent>
              )
            )}
          </div>
        </Tabs>
      </div>
    </DocumentProvider>
  );
};
