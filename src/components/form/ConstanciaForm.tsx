import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  constanciaSchema,
  type ConstanciaInterface,
} from "../../types/DocumentTypes";
import { CargaDocumentos } from "../cards/CargaDocumentos";
import { Download } from "lucide-react";

export const ConstanciaForm = () => {
  const [data, setData] = useState<ConstanciaInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    acuerdos: "",
    asistencia: "",
    fecha: "",
    hora: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      asistencia: value,
    }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const result = constanciaSchema.safeParse(data);

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
              <CardTitle>Constancia de Asistencias</CardTitle>
              <CardDescription>
                Completa el formulario para generar el documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tipo de constancia
                  </label>
                  <Select
                    value={data.asistencia}
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger className="rounded-lg w-full">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        Asistencia de las dos partes
                      </SelectItem>
                      <SelectItem value="2">
                        Asistencia de una de las dos partes
                      </SelectItem>
                      <SelectItem value="3">
                        Asistencia de ninguna de las dos partes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.asistencia && (
                    <p className="text-sm text-red-400">{errors.asistencia}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Asistencia</label>
                  <Select
                    value={data.asistencia}
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger className="rounded-lg w-full">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Parte 1</SelectItem>
                      <SelectItem value="2">Parte 2</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.asistencia && (
                    <p className="text-sm text-red-400">{errors.asistencia}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horas</label>
                  <Input
                    type="time"
                    name="horaAudiencia"
                    value={data.hora}
                    onChange={handleInputChange}
                    className={`rounded-xl ${errors.hora && "border-red-300"}`}
                  />
                  {errors.hora && (
                    <p className="text-sm text-red-400">{errors.hora}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Acuerdos</label>
                  <textarea
                    name="Acuerdos"
                    value={data.acuerdos}
                    onChange={handleInputChange}
                    placeholder={`Ingresa las pretensiones`}
                    className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      ${errors.acuerdos && "border-red-300"}`}
                  />
                  {errors.acuerdos && (
                    <p className="text-sm text-red-400">{errors.acuerdos}</p>
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
