import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MapPinPlus, SquarePen } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  sedeSchema,
  type SedeInterface,
} from "../../types/Mantenimiento/SedeType";
import { useSede } from "../../context/Mantenimiento/SedeContext";

interface propSedeDialog {
  data?: SedeInterface;
  type: "add" | "edit";
}

const initialData = {
  name: "",
  desc: "",
};

export const SedeDialog = ({ data = initialData, type }: propSedeDialog) => {
  const [client, setClient] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SedeInterface>(data);
  const { handleSubmit, handleSubmitEdit } = useSede();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addSummitData = (dataToSend: SedeInterface) => {
    console.log("Formulario válido, enviando:", dataToSend);
    handleSubmit(dataToSend);
  };

  const editSummitData = (dataToSend: SedeInterface) => {
    dataToSend.id = formData.id;
    console.log("ID", dataToSend.id);
    console.log("Formulario válido, enviando:", dataToSend);
    const id = Number(dataToSend.id ?? -1);
    handleSubmitEdit(dataToSend, id);
  };

  const handleOpenChange = (open: boolean) => {
    setClient(open);
    if (!open) {
      setFormData(initialData);
      setErrors({});
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setErrors({});
    const result = sedeSchema.safeParse(formData);
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
    console.log(formData);

    if (type === "add") addSummitData(formData);
    if (type === "edit") editSummitData(formData);

    handleOpenChange(false);
  };

  return (
    <Dialog open={client} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex items-center px-3 py-1 rounded-md cursor-pointer"
          >
            <SquarePen size={10} className="mr-3" />
            Editar
          </Button>
        ) : (
          <Button className="btnAgregar mb-2 md:mb-0">
            <MapPinPlus className="mr-2 h-4 w-4" size={16} />
            Agregar Sede
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold textTitle">
            {type === "add" ? "Agregar Nueva Sede" : "Editar Sede"}
          </DialogTitle>
          <DialogDescription>
            {type === "add"
              ? "Completa la información de la nueva sede de tu empresa."
              : "Edita la información de una sede de tu empresa."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worker-name">Nombre de la Sede</Label>
              <Input
                placeholder="Ej: Sede Trujillo"
                className={`rounded-lg ${errors.name ? "border-red-300" : ""}`}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worker-phone">Descripcion:</Label>
              <Input
                placeholder="Ej: Av. San Lazaro"
                className={`rounded-lg ${errors.desc ? "border-red-300" : ""}`}
                value={formData.desc}
                onChange={(e) => handleInputChange("desc", e.target.value)}
              />
              {errors.desc && (
                <p className="text-red-400 text-sm">{errors.desc}</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => setClient(false)}
            className="rounded-lg cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={(e) => handleFormSubmit(e)}
            className="rounded-lg cursor-pointer"
            style={{ padding: "0 30px" }}
          >
            {type === "add" ? "Agregar Sede" : "Editar Sede"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
