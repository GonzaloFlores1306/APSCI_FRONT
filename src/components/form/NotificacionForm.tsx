import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  notificacionSchema,
  type NotificacionInterface,
} from "../../types/DocumentTypes";
import { Download } from "lucide-react";
import { CargaDocumentos } from "../cards/CargaDocumentos";

export const NotificacionForm = () => {
  const [data, setData] = useState<NotificacionInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    fechaNotificacion: "",
    fechaAudiencia: "",
    horaAudiencia: "",
    observaciones: "",
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

  const validar = () => {
    const result = notificacionSchema.safeParse(data);

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
              <CardTitle>Acta de Notificacion</CardTitle>
              <CardDescription>
                Completa el formulario para generar el documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    name="date"
                    value={data.fechaNotificacion}
                    onChange={handleInputChange}
                    className={`rounded-xl ${
                      errors.fechaNotificacion && "border-red-300"
                    }`}
                  />
                  {errors.fechaNotificacion && (
                    <p className="text-sm text-red-400">
                      {errors.fechaNotificacion}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    name="date"
                    value={data.fechaAudiencia}
                    onChange={handleInputChange}
                    className={`rounded-xl ${
                      errors.fechaAudiencia && "border-red-300"
                    }`}
                  />
                  {errors.fechaAudiencia && (
                    <p className="text-sm text-red-400">
                      {errors.fechaAudiencia}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horas</label>
                  <Input
                    type="time"
                    name="horaAudiencia"
                    value={data.horaAudiencia}
                    onChange={handleInputChange}
                    className={`rounded-xl ${
                      errors.horaAudiencia && "border-red-300"
                    }`}
                  />
                  {errors.horaAudiencia && (
                    <p className="text-sm text-red-400">
                      {errors.horaAudiencia}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={data.observaciones}
                    onChange={handleInputChange}
                    placeholder={`Ingresa las pretensiones`}
                    className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      ${errors.observaciones && "border-red-300"}`}
                  />
                  {errors.observaciones && (
                    <p className="text-sm text-red-400">
                      {errors.observaciones}
                    </p>
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
        <CargaDocumentos />
        {/* {formFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))} */}
      </div>
    </form>
  );
};
