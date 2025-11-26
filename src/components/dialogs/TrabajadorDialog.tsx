import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LoaderCircle, Pencil, UserPlus } from "lucide-react";
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
import { useEffect, useState } from "react";
import {
  workerSchema,
  type RolType,
  type workerInterface,
} from "../../types/Mantenimiento/TrabajadorType";
import { useWorker } from "../../context/Mantenimiento/WorkerContext";
import { Separator } from "../ui/separator";

const generarUsuario = (
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string
): string => {
  const normalizar = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const nombreLimpio = normalizar(nombre.split(" ")[0].trim().toLowerCase());
  const paternoLimpio = normalizar(apellidoPaterno.trim().toLowerCase());
  const maternoLimpio = normalizar(apellidoMaterno.trim().toLowerCase());

  const inicialPaterno = paternoLimpio.charAt(0) || "";
  const inicialMaterno = maternoLimpio.charAt(0) || "";

  return `${nombreLimpio}${inicialPaterno}${inicialMaterno}`;
};

const initialData = {
  dni: "",
  name: "",
  lastnamePater: "",
  lastnameMater: "",
  phone: "",
  email: "",
  sede: 1, //
  user: "",
  password: "",
  rol: "ADMINISTRADOR" as RolType, // Default como string vacío para el Select
};

interface TrabajadorDialogInterface {
  data?: workerInterface;
  type: "edit" | "add";
}

export const TrabajadorDialog = ({
  data = initialData,
  type,
}: TrabajadorDialogInterface) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<workerInterface>(data);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { getDniData, handleSubmit, loading, handleSubmitEdit } = useWorker();

  const handleDniBlur = async () => {
    if (!formData.dni) return;
    try {
      const data = await getDniData(formData.dni);
      if (!data) return;
      const { nombreTrabajador, apePaterTrabajador, apeMaterTrabajador } = data;
      const user = generarUsuario(
        nombreTrabajador,
        apePaterTrabajador,
        apeMaterTrabajador
      );
      setFormData((prev) => ({
        ...prev,
        name: nombreTrabajador,
        lastnamePater: apePaterTrabajador,
        lastnameMater: apeMaterTrabajador,
        user: user,
      }));
    } catch (error) {
      console.error("Error al obtener datos del DNI:", error);
    }
  };

  useEffect(() => {
    if (formData.dni.length === 8 && type === "add") handleDniBlur();
  }, [formData.dni]);

  const handleInputChange = (field: string, value: string) => {
    if (field === "dni" && value.length > 8) return;
    if (field === "phone" && value.length > 9) return;
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (["name", "lastnamePater", "lastnameMater"].includes(field)) {
        updated.user = generarUsuario(
          field === "name" ? value : prev.name,
          field === "lastnamePater" ? value : prev.lastnamePater,
          field === "lastnameMater" ? value : prev.lastnameMater
        );
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormData(initialData);
      setErrors({});
    }
  };

  const addSummitData = (dataToSend: workerInterface) => {
    console.log("Formulario válido, enviando:", dataToSend);
    handleSubmit(dataToSend);
  };

  const editSummitData = (dataToSend: workerInterface) => {
    dataToSend.id = data.id;
    console.log("ID", dataToSend.id);
    console.log("Formulario válido, enviando:", dataToSend);
    const id = Number(dataToSend.id ?? -1);
    handleSubmitEdit(dataToSend, id);
  };

  const handleSubmitData = (e: any) => {
    e.preventDefault();
    setErrors({});
    const result = workerSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      setErrors(errors);
      console.log(errors);
      return;
    }
    const dataToSend = {
      ...result.data,
      sede: 1,
    };

    if (type === "add") addSummitData(dataToSend);
    if (type === "edit") editSummitData(dataToSend);

    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => console.log("Editar", data)}
          >
            <Pencil size={16} className="mr-2" />
            Editar
          </Button>
        ) : (
          <button className="btnAgregar mb-4 md:mb-0">
            <UserPlus className="mr-2 h-4 w-4" size={16} />
            Agregar Trabajador
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold textTitle">
            {type === "add" ? "Agregar Nuevo Trabajador" : "Editar Trabajador"}
          </DialogTitle>
          <DialogDescription>
            {type === "add"
              ? "Completa la información del nuevo personal de la empresa."
              : " Edita la información del personal de la empresa."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DNI */}
            <div>
              <Label className="mb-2" htmlFor="dni">
                DNI
              </Label>
              <Input
                id="dni"
                placeholder="Ej: 90878696"
                className={`rounded-lg ${errors.dni ? "border-red-300" : ""}`}
                value={formData.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
              />
              {errors.dni && (
                <p className="text-red-400 text-sm">{errors.dni}</p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <Label className="mb-2" htmlFor="worker-name">
                Nombre Completo
              </Label>
              <Input
                id="worker-name"
                placeholder="Ej: María Alexandra"
                className={`rounded-lg ${errors.name ? "border-red-300" : ""}`}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Apellido Paterno */}
            <div>
              <Label className="mb-2" htmlFor="lastnamePater">
                Apellido Paterno
              </Label>
              <Input
                id="lastnamePater"
                placeholder="Ej: García"
                className={`rounded-lg ${
                  errors.lastnamePater ? "border-red-300" : ""
                }`}
                value={formData.lastnamePater}
                onChange={(e) =>
                  handleInputChange("lastnamePater", e.target.value)
                }
              />
              {errors.lastnamePater && (
                <p className="text-red-400 text-sm">{errors.lastnamePater}</p>
              )}
            </div>

            {/* Apellido Materno */}
            <div>
              <Label className="mb-2" htmlFor="lastnameMater">
                Apellido Materno
              </Label>
              <Input
                id="lastnameMater"
                placeholder="Ej: López"
                className={`rounded-lg ${
                  errors.lastnameMater ? "border-red-300" : ""
                }`}
                value={formData.lastnameMater}
                onChange={(e) =>
                  handleInputChange("lastnameMater", e.target.value)
                }
              />
              {errors.lastnameMater && (
                <p className="text-red-400 text-sm">{errors.lastnameMater}</p>
              )}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Correo */}
            <div>
              <Label className="mb-2" htmlFor="worker-email">
                Correo Electrónico
              </Label>
              <Input
                id="worker-email"
                type="email"
                placeholder="maria.gonzalez@gmail.com"
                className={`rounded-lg ${errors.email ? "border-red-300" : ""}`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <Label className="mb-2" htmlFor="worker-phone">
                Teléfono
              </Label>
              <Input
                id="worker-phone"
                placeholder="912 345 678"
                className={`rounded-lg ${errors.phone ? "border-red-300" : ""}`}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Usuario */}
            <div>
              <Label className="mb-2" htmlFor="worker-user">
                Usuario
              </Label>
              <Input
                id="worker-user"
                placeholder="mariagl"
                className={`rounded-lg ${errors.user ? "border-red-300" : ""}`}
                value={formData.user}
                onChange={(e) => handleInputChange("user", e.target.value)}
              />
              {errors.user && (
                <p className="text-red-400 text-sm">{errors.user}</p>
              )}
            </div>

            {/* Contraseña */}
            {type === "add" && (
              <div>
                <Label className="mb-2" htmlFor="worker-password">
                  Contraseña
                </Label>
                <Input
                  id="worker-password"
                  type="password"
                  placeholder="Contraseña"
                  className={`rounded-lg ${
                    errors.password ? "border-red-300" : ""
                  }`}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo */}
            <div className="space-y-2">
              <Label htmlFor="worker-position">Cargo</Label>
              <Select
                value={formData.rol}
                onValueChange={(v) => handleSelectChange("rol", v)}
              >
                <SelectTrigger
                  className={`rounded-l w-full ${
                    errors.rol ? "border-red-300" : ""
                  }`}
                >
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMINISTRADOR">Administrador</SelectItem>
                  <SelectItem value="CONCILIADOR">Conciliador</SelectItem>
                  <SelectItem value="ASISTENTE_ADMINISTRATIVO">
                    Asistente Administrativo
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.rol && (
                <p className="text-red-400 text-sm">{errors.rol}</p>
              )}
            </div>

            {/* Permisos (si es asistente) */}
            {formData.rol === "ASISTENTE_ADMINISTRATIVO" && (
              <div className="space-y-2">
                <Label htmlFor="worker-permission">Permisos</Label>
                <Select value={formData.rol}>
                  <SelectTrigger className="rounded-l w-full">
                    <SelectValue placeholder="Seleccionar Permiso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Administrador</SelectItem>
                    <SelectItem value="2">Asistente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Registro (si es conciliador) */}
            {formData.rol === "CONCILIADOR" && (
              <div>
                <Label className="mb-2">Numero de Registro</Label>
                <Input
                  placeholder="612 345 678"
                  className={`rounded-lg ${
                    errors.registro ? "border-red-400" : ""
                  }`}
                  value={formData.registro}
                  onChange={(e) =>
                    handleInputChange("registro", e.target.value)
                  }
                />
                {errors.registro && (
                  <p className="text-red-300 text-sm">{errors.registro}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="rounded-lg cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmitData}
            className="rounded-lg cursor-pointer"
            style={{ padding: "0 30px" }}
          >
            {loading ? (
              <LoaderCircle size={24} className="animate-spin !fill-none" />
            ) : type === "add" ? (
              "Agregar Trabajador"
            ) : (
              "Editar Trabajador"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
