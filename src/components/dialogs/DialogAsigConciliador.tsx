import { Gavel } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";

export const DialogAsigConciliador = () => {
  const [client, setClient] = useState(false);
  const [conciliador, setConciliador] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    if (!conciliador) setError(true);
    setClient(false);
  };
  const handleChange = (value: string) => {
    setError(false);
    setConciliador(value);
  };
  return (
    <Dialog
      open={client}
      onOpenChange={(open) => (open ? setClient(true) : setClient(false))}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="cursor-pointer">
          <Gavel className="mr-2 h-4 w-4" size={16} />
          Asignar Conciliador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold textTitle">
            Asignar Conciliador
          </DialogTitle>
          <DialogDescription>
            Selecciona el conciliador que se asignará al expediente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="conciliador"
              className={`${error && "text-red-400"}`}
            >
              Conciliadores
            </Label>
            <Select value={conciliador} onValueChange={handleChange}>
              <SelectTrigger
                className={`rounded-lg ${error && "border border-red-300"}`}
              >
                <SelectValue placeholder="Seleccionar departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administracion">Administración</SelectItem>
                <SelectItem value="atencion-cliente">
                  Atención al Cliente
                </SelectItem>
                <SelectItem value="catalogacion">Catalogación</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
            {error && (
              <span className="text-sm text-red-500">
                Seleccione un conciliador
              </span>
            )}
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
            onClick={handleSubmit}
            className="rounded-lg cursor-pointer"
            style={{ padding: "0 30px" }}
          >
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
