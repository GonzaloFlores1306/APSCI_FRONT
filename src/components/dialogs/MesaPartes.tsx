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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";

const MesaPartes = () => {
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { materiasPorTipo, documentosPorMateria, checkDocumentsMP } =
    useExpediente();

  // Documentos requeridos según las materias seleccionadas
  const documentosRequeridos = Array.from(
    new Set(selectedMaterias.flatMap((m) => documentosPorMateria[m] || []))
  );

  const handleMateriaChange = (materia: string) => {
    setSelectedMaterias((prev) =>
      prev.includes(materia)
        ? prev.filter((m) => m !== materia)
        : [...prev, materia]
    );
  };

  const handleNext = () => {
    const faltantes = documentosRequeridos.filter(
      (doc) => !checkedDocs.includes(doc)
    );
    if (faltantes.length > 0) {
      setShowAlert(true);
    } else {
      console.log("✅ Formulario completo:", {
        tipo: selectedType,
        materias: selectedMaterias,
        documentos: checkedDocs,
      });
      checkDocumentsMP(false);
      navigate("/expedientes/nuevo-expediente");
      setOpen(false);
    }
  };

  const handleDocCheck = (doc: string) => {
    setCheckedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleNextAlert = () => {
    checkDocumentsMP(true);
    navigate("/expedientes/nuevo-expediente");
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="btnAgregar mb-2 md:mb-0">
            <UserPlus className="mr-2 h-4 w-4" size={16} />
            Iniciar Expediente
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold textTitle">
              Mesa de Partes
            </DialogTitle>
            <DialogDescription>
              Completa la información inicial para iniciar el expediente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Selección de tipo */}
            <div className="space-y-2">
              <Label>Tipo de expediente</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value);
                  setSelectedMaterias([]);
                  setCheckedDocs([]);
                }}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="familiar">Familiar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Materias dinámicas */}
            {selectedType && (
              <div className="space-y-2">
                <Label>Materias</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {materiasPorTipo[selectedType]?.map((materia) => (
                    <div
                      key={materia.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedMaterias.includes(materia.value)}
                        onCheckedChange={() =>
                          handleMateriaChange(materia.value)
                        }
                      />
                      <Label>{materia.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentos dinámicos */}
            {selectedMaterias.length > 0 && (
              <div className="space-y-2">
                <Label>Documentos requeridos</Label>
                <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                  {documentosRequeridos.map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <Checkbox
                        checked={checkedDocs.includes(doc)}
                        onCheckedChange={() => handleDocCheck(doc)}
                      />
                      <Label>{doc}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="rounded-lg cursor-pointer"
              onClick={handleNext}
              disabled={!selectedType || selectedMaterias.length === 0}
            >
              Siguiente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Alerta si faltan documentos */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advertencia! Faltan documentos</AlertDialogTitle>
            <AlertDialogDescription>
              Debes marcar todos los documentos requeridos antes de continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNextAlert}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MesaPartes;
