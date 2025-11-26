import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Download } from "lucide-react";
import { Input } from "../ui/input";
import { CargaDocumentos } from "../cards/CargaDocumentos";
import {
  solicitudSchema,
  type SolicitudInterface,
} from "../../types/DocumentTypes";
import { useFechaActual } from "../../hooks/useFechaActual";

export const SolicitudForm = () => {
  const fecha = useFechaActual();
  const [data, setData] = useState<SolicitudInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    fecha: fecha,
    hechos: "",
    pretension: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      setData((prev) => ({
        ...prev,
        archivo: fileName,
      }));
    }
  };

  const validar = () => {
    const result = solicitudSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      setErrors(errors);
      return { success: false, errors };
    }

    return { success: true, data: result.data };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(validar());
    // if (!validate()) return
    console.log("Enviando invitación:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Solicitud de Conciliacion</CardTitle>
              <CardDescription>
                Completa el formulario para generar el documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Fecha de Creacion
                  </label>
                  <Input
                    disabled
                    type="date"
                    name="date"
                    value={data.fecha}
                    onChange={handleInputChange}
                    className={`rounded-xl ${errors.fecha && "border-red-300"}`}
                  />
                  {errors.fecha && (
                    <p className="text-sm text-red-400">{errors.fecha}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Hechos que dieron lugar al conflicto
                  </label>
                  <textarea
                    disabled
                    name="hechos"
                    value={data.hechos}
                    onChange={handleInputChange}
                    placeholder={`Ingresa los hechos`}
                    className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      ${errors.fecha && "border-red-300"}`}
                  />
                  {errors.hechos && (
                    <p className="text-sm text-red-400">{errors.hechos}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pretensiones</label>
                  <textarea
                    disabled
                    name="pretensiones"
                    value={data.pretension}
                    onChange={handleInputChange}
                    placeholder={`Ingresa las pretensiones`}
                    className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      ${errors.fecha && "border-red-300"}`}
                  />
                  {errors.hechos && (
                    <p className="text-sm text-red-400">{errors.hechos}</p>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-end">
                <Button className="!px-6 rounded-lg cursor-pointer hover:scale-101">
                  <Download className="mr-2 h-4 w-4" />
                  Generar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <CargaDocumentos handleFileUpload={handleFileUpload} />
      </div>
    </form>
  );
};
