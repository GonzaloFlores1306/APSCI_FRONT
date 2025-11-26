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
import { UserPlus } from "lucide-react";
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

export const ClientDialog = () => {
  const [client, setClient] = useState(false);
  const [formData, setFormData] = useState({
    worker: {
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
    },
    client: {
      name: "",
      email: "",
      phone: "",
      address: "",
      membershipType: "",
    },
    book: {
      title: "",
      author: "",
      isbn: "",
      category: "",
      publisher: "",
      year: "",
      copies: "",
      location: "",
    },
    loan: {
      clientId: "",
      bookId: "",
      dueDate: "",
    },
  });
  return (
    <Dialog
      open={client}
      onOpenChange={(open) => (open ? setClient(true) : setClient(false))}
    >
      <DialogTrigger asChild>
        <button className="btnAgregar mb-2 md:mb-0">
          <UserPlus className="mr-2 h-4 w-4" size={16} />
          Agregar Trabajador
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold textTitle">
            Agregar Nuevo Cliente
          </DialogTitle>
          <DialogDescription>
            Completa la información del nuevo cliente de la empresa.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worker-name">Nombre Completo</Label>
              <Input
                id="worker-name"
                placeholder="Ej: María González"
                className="rounded-lg"
                value={formData.worker.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    worker: { ...prev.worker, name: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="worker-email">Correo Electrónico</Label>
              <Input
                id="worker-email"
                type="email"
                placeholder="maria.gonzalez@bibliotech.com"
                className="rounded-lg"
                value={formData.worker.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    worker: { ...prev.worker, email: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worker-phone">Teléfono</Label>
              <Input
                id="worker-phone"
                placeholder="+34 612 345 678"
                className="rounded-lg"
                value={formData.worker.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    worker: { ...prev.worker, phone: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="worker-position">Cargo</Label>
              <Select
                value={formData.worker.position}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    worker: { ...prev.worker, position: value },
                  }))
                }
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bibliotecario-jefe">
                    Bibliotecario Jefe
                  </SelectItem>
                  <SelectItem value="asistente">
                    Asistente de Biblioteca
                  </SelectItem>
                  <SelectItem value="catalogador">Catalogador</SelectItem>
                  <SelectItem value="tecnico-it">Técnico IT</SelectItem>
                  <SelectItem value="recepcionista">Recepcionista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="worker-department">Departamento</Label>
            <Select
              value={formData.worker.department}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  worker: { ...prev.worker, department: value },
                }))
              }
            >
              <SelectTrigger className="rounded-lg">
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
            // onClick={() => handleFormSubmit("worker")}
            className="rounded-lg cursor-pointer"
            style={{ padding: "0 30px" }}
          >
            Agregar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
