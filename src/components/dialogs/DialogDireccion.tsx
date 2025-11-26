import { useForm, type Resolver } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MapPinHouse } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { departamentosDelPeru, provinciasLima } from "../../data/Adress";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import type { TipoParte } from "../../types/DataTypes";
import { direccionSchema, type DireccionForm } from "../../types/EntityTypes";

export const DialogDireccion = ({ tipoParte }: { tipoParte: TipoParte }) => {
  const [open, setOpen] = useState(false);
  const [, setSelectedDep] = useState("");
  const [selectedProv, setSelectedProv] = useState<
    keyof typeof provinciasLima | ""
  >("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DireccionForm>({
    resolver: zodResolver(direccionSchema) as Resolver<DireccionForm>,
    defaultValues: {
      departamento: "",
      provincia: "",
      distrito: "",
      nombreVia: "",
      numero: 0,
      manzana: "",
      lote: "",
      urbanizacion: "",
      referencia: "",
      codigoPostal: "",
    },
  });

  const { addAddress } = useExpediente();

  const onSubmit = (data: DireccionForm) => {
    addAddress(tipoParte, data);
    console.log("Dirección agregada:", data);
    setOpen(false);
  };

  const departamento = watch("departamento");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="btnAgregar !font-medium">
          <MapPinHouse className="mr-2 h-4 w-4" />
          Agregar Dirección
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold textTitle">
            Agregar Nueva Dirección
          </DialogTitle>
          <DialogDescription>
            Completa la información de la dirección de la persona registrada.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Departamento */}
            <div className="space-y-2">
              <Label>Departamento</Label>
              <Select
                onValueChange={(value) => {
                  setValue("departamento", value);
                  setSelectedDep(value);
                  setValue("provincia", "");
                  setValue("distrito", "");
                }}
              >
                <SelectTrigger
                  className={`min-w-[200px] rounded-lg ${
                    errors.departamento && "border-red-200"
                  }`}
                >
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departamentosDelPeru.map((dep) => (
                    <SelectItem key={dep} value={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departamento && (
                <p className="text-red-500 text-sm">
                  {errors.departamento.message}
                </p>
              )}
            </div>

            {/* Provincia */}
            {departamento === "Lima" && (
              <div className="space-y-2">
                <Label>Provincia</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("provincia", value);
                    setSelectedProv(value as keyof typeof provinciasLima);
                    setValue("distrito", "");
                  }}
                >
                  <SelectTrigger
                    className={`min-w-[200px] rounded-lg ${
                      errors.provincia && "border-red-200"
                    }`}
                  >
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(provinciasLima).map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.provincia && (
                  <p className="text-red-500 text-sm">
                    {errors.provincia.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Distrito */}
          {departamento === "Lima" && selectedProv && (
            <div className="space-y-2">
              <Label>Distrito</Label>
              <Select onValueChange={(value) => setValue("distrito", value)}>
                <SelectTrigger
                  className={`min-w-[200px] rounded-lg ${
                    errors.distrito && "border-red-200"
                  }`}
                >
                  <SelectValue placeholder="Seleccionar distrito" />
                </SelectTrigger>
                <SelectContent>
                  {provinciasLima[selectedProv]?.map((dist) => (
                    <SelectItem key={dist} value={dist}>
                      {dist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.distrito && (
                <p className="text-red-500 text-sm">
                  {errors.distrito.message}
                </p>
              )}
            </div>
          )}

          {/* Campos de texto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Nombre Vía</Label>
              <Input
                {...register("nombreVia")}
                placeholder="Ej: Av. Los Pinos"
                className={`${errors.nombreVia && "border-red-200"}`}
              />
              {errors.nombreVia && (
                <p className="text-red-500 text-sm">
                  {errors.nombreVia.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Número</Label>
              <Input
                {...register("numero")}
                placeholder="Ej: 123"
                className={`${errors.numero && "border-red-200"}`}
              />
              {errors.numero && (
                <p className="text-red-500 text-sm">{errors.numero.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Manzana</Label>
              <Input {...register("manzana")} placeholder="Ej: Mz. A" />
              {errors.manzana && (
                <p className="text-red-500 text-sm">{errors.manzana.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Lote</Label>
              <Input {...register("lote")} placeholder="Ej: Lt. 5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Urbanización</Label>
              <Input
                {...register("urbanizacion")}
                placeholder="Ej: Los Jardines"
              />
            </div>
            <div className="space-y-1">
              <Label>Referencia</Label>
              <Input
                {...register("referencia")}
                placeholder="Ej: Frente al parque"
                className={`${errors.referencia && "border-red-200"}`}
              />
              {errors.referencia && (
                <p className="text-red-500 text-sm">
                  {errors.referencia.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Código Postal</Label>
            <Input {...register("codigoPostal")} placeholder="Ej: 15001" />
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg"
            >
              Cancelar
            </Button>
            <Button type="submit" className="rounded-lg px-6">
              Agregar Dirección
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
