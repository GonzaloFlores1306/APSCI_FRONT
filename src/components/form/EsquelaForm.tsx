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
  esquelaSchema,
  type esquelaInterface,
} from "../../types/DocumentTypes";
import { Download } from "lucide-react";
import { CargaDocumentos } from "../cards/CargaDocumentos";
import { MateriasCard } from "../cards/MateriasCard";

export const EsquelaForm = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const fechaFormateada = `${año}-${mes}-${dia}`;
  const [data, setData] = useState<esquelaInterface>({
    nroExpediente: "",
    conciliador: "",
    registro: "",
    especializacion: "",
    fechaDesignacion: fechaFormateada,
    materias: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const today = new Date();
    console.log(today.toLocaleDateString());
    console.log(fecha);
    console.log(value);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const result = esquelaSchema.safeParse(data);

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
              <CardTitle>Esquela de designacion</CardTitle>
              <CardDescription>
                Completa el formulario para generar el documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Conciliador</label>
                  <Input
                    type="text"
                    name="conciliador"
                    value={data.conciliador}
                    onChange={handleInputChange}
                    placeholder={`Ingresa al Conciliador`}
                    className={`rounded-xl ${
                      errors.conciliador && "border-red-300"
                    }`}
                  />
                  {errors.conciliador && (
                    <p className="text-sm text-red-400">{errors.conciliador}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Nro. de Registro
                  </label>
                  <Input
                    type="text"
                    name="registro"
                    value={data.registro}
                    onChange={handleInputChange}
                    placeholder={`Ingresa el numero`}
                    className={`rounded-xl ${
                      errors.registro && "border-red-300"
                    }`}
                  />
                  {errors.registro && (
                    <p className="text-sm text-red-400">{errors.registro}</p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Fecha de creacion
                  </label>
                  <Input
                    type="date"
                    name="fechaDesignacion"
                    value={data.fechaDesignacion}
                    onChange={handleInputChange}
                    className={`rounded-xl ${
                      errors.fechaDesignacion && "border-red-300"
                    }`}
                  />
                  {errors.fechaDesignacion && (
                    <p className="text-sm text-red-400">
                      {errors.fechaDesignacion}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Materias</label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <MateriasCard nombre="Materias" />
                  </div>

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
