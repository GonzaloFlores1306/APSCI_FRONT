import React, { useState } from "react";
import { anexoSchema, type AnexoInterface } from "../../types/DocumentTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { CargaDocumentos } from "../cards/CargaDocumentos";

export const AnexoForm = () => {
  const [data, setData] = useState<AnexoInterface>({
    document: {
      nroExpediente: "",
      solicitante: "",
      dniSolicitante: "",
      invitado: "",
      dniInvitado: "",
    },
    nombre: "",
    lugar: "",
    fecha: "",
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
    const result = anexoSchema.safeParse(data);

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
    <>
      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Anexo</CardTitle>
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
                      name="fecha"
                      value={data.fecha}
                      onChange={handleInputChange}
                      className={`rounded-xl ${
                        errors.fecha && "border-red-300"
                      }`}
                    />
                    {errors.fecha && (
                      <p className="text-sm text-red-400">{errors.fecha}</p>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input
                      type="text"
                      name="nombre"
                      value={data.nombre}
                      onChange={handleInputChange}
                      className={`rounded-xl ${
                        errors.nombre && "border-red-300"
                      }`}
                    />
                    {errors.nombre && (
                      <p className="text-sm text-red-400">{errors.nombre}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Lugar Almacenado
                    </label>
                    <Input
                      type="text"
                      name="lugar"
                      value={data.lugar}
                      onChange={handleInputChange}
                      className={`rounded-xl ${
                        errors.lugar && "border-red-300"
                      }`}
                    />
                    {errors.lugar && (
                      <p className="text-sm text-red-400">{errors.lugar}</p>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observaciones</label>
                    <Textarea
                      name="observaciones"
                      value={data.observaciones}
                      onChange={handleInputChange}
                      placeholder={`Ingresa las pretensiones`}
                      className={`w-full rounded-xl border border-input bg-background px-3 py-2 text-sm 
                      ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-24
                      `}
                    />
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
    </>
  );
};
