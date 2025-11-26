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
  invitacionSchema,
  type InvitacionInterface,
} from "../../types/DocumentTypes";
import { Download } from "lucide-react";
import { CargaDocumentos } from "../cards/CargaDocumentos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const InvitacionForm = () => {
  const [data, setData] = useState<InvitacionInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    conciliador: "",
    fechaAudiencia: "",
    horaAudiencia: "",
    materias: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validar = () => {
    const result = invitacionSchema.safeParse(data);

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
              <CardTitle>Invitacion a Conciliar</CardTitle>
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
                  <label className="text-sm font-medium">Materias</label>
                  {errors.materias && (
                    <p className="text-sm text-red-400">{errors.materias}</p>
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
      </div>
    </form>
  );
};
