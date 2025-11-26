import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  conciliacionSchema,
  type ConciliacionInterface,
} from "../../types/DocumentTypes";
import { Download } from "lucide-react";
import { CargaDocumentos } from "../cards/CargaDocumentos";

export const ConciliacionForm = () => {
  const [data, setData] = useState<ConciliacionInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    conciliador: "",
    acuerdos: "",
    descripcion: "",
    hechos: "",
    resultado: "",
    fecha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onChangeResultado = (value: string) => {
    setData((prev) => ({
      ...prev,
      resultado: value,
    }));
  };
  const onChangeConcilidor = (value: string) => {
    setData((prev) => ({
      ...prev,
      conciliador: value,
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
    const result = conciliacionSchema.safeParse(data);

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
              <CardTitle>Acta de Conciliacion</CardTitle>
              <CardDescription>
                Completa el formulario para generar el documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Conciliador</label>
                  <Select
                    value={data.conciliador}
                    onValueChange={(value) => onChangeConcilidor(value)}
                  >
                    <SelectTrigger className="rounded-lg w-full">
                      <SelectValue placeholder="Seleccionar Conciliador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Conciliador 1</SelectItem>
                      <SelectItem value="2">Conciliador 2</SelectItem>
                      <SelectItem value="3">Conciliador 3</SelectItem>
                      <SelectItem value="4">Conciliador 4</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.conciliador && (
                    <p className="text-sm text-red-400">{errors.conciliador}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resultado</label>
                  <Select
                    value={data.resultado}
                    onValueChange={(value) => onChangeResultado(value)}
                  >
                    <SelectTrigger className="rounded-lg w-full">
                      <SelectValue placeholder="Seleccionar Conciliador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Conciliador 1</SelectItem>
                      <SelectItem value="2">Conciliador 2</SelectItem>
                      <SelectItem value="3">Conciliador 3</SelectItem>
                      <SelectItem value="4">Conciliador 4</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.resultado && (
                    <p className="text-sm text-red-400">{errors.resultado}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    name="fecha"
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
                    Hechos expuestos en la Solicitud
                  </label>
                  <textarea
                    name="hechos"
                    value={data.hechos}
                    onChange={handleInputChange}
                    placeholder={`Ingresa las pretensiones`}
                    className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      ${errors.hechos && "border-red-300"}`}
                  />
                  {errors.hechos && (
                    <p className="text-sm text-red-400">{errors.hechos}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Acuerdos Pactados
                  </label>
                  <textarea
                    name="acuerdos"
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
        <CargaDocumentos handleFileUpload={handleFileUpload} />
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
