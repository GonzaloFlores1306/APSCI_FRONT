import { useEffect, useState } from "react";
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
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

interface TipoMateria {
  idTipoMateria: number;
  nombre: string;
  materias: Materia[];
}

interface Materia {
  idMateria: number;
  nombre: string;
}

interface Requisito {
  idRequisito: number;
  nombre: string;
  obligatorio: boolean;
}

const MesaPartes = () => {
  const [tipos, setTipos] = useState<TipoMateria[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const [selectedMaterias, setSelectedMaterias] = useState<number[]>([]);
  const [requisitos, setRequisitos] = useState<Requisito[]>([]);
  const [checkedDocs, setCheckedDocs] = useState<number[]>([]);

  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = user?.token || null;

  // ----------------------------------------------------------------
  // Cargar tipos con materias
  // ----------------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/materias/tipos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.map((tipo: any) => ({
          idTipoMateria: tipo.idtipomateria,
          nombre: tipo.nombreTipoMateria,
          materias: tipo.materias.map((m: any) => ({
            idMateria: m.idMateria,
            nombre: m.nombreMateria,
          })),
        }));

        setTipos(data);
      })
      .catch((err) => console.error("Error al cargar tipos:", err));
  }, []);

  // ----------------------------------------------------------------
  // Cuando cambia el tipo → limpiar materias y requisitos
  // ----------------------------------------------------------------
  useEffect(() => {
    setSelectedMaterias([]);
    setRequisitos([]);
    setCheckedDocs([]);
  }, [selectedType]);

  // ----------------------------------------------------------------
  // Cargar los requisitos combinados de las materias seleccionadas
  // ----------------------------------------------------------------
  useEffect(() => {
    if (selectedMaterias.length === 0) {
      setRequisitos([]);
      return;
    }

    const requests = selectedMaterias.map((id) =>
      axios.get(`http://localhost:8082/api/materias/${id}/requisitos-base`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    Promise.all(requests)
      .then((responses) => {
        const allReqs = responses.flatMap((r) => r.data);

        // Eliminar duplicados
        const uniqueReqs = Array.from(
          new Map(allReqs.map((req) => [req.idRequisito, req])).values()
        );

        setRequisitos(uniqueReqs);
      })
      .catch((err) => console.error("Error al cargar requisitos:", err));
  }, [selectedMaterias]);

  const toggleMateria = (id: number) => {
    setSelectedMaterias((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleDoc = (id: number) => {
    setCheckedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // ----------------------------------------------------------------
  //  CREAR MESA DE PARTES
  // ----------------------------------------------------------------
  const handleNext = async () => {
    const obligatorios = requisitos
      .filter((r) => r.obligatorio)
      .map((r) => r.idRequisito);

    const faltantes = obligatorios.filter((id) => !checkedDocs.includes(id));

    if (faltantes.length > 0) {
      setShowAlert(true);
      return;
    }

    try {
      const payload = {
        materias: selectedMaterias,
        idTrabajador: user?.idTrabajador,
        requisitosSeleccionados: checkedDocs,
      };

      const response = await axios.post(
        "http://localhost:8082/api/mesa-partes",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const mesaPartesCreada = response.data;

      const requisitosCompletos = requisitos.length === checkedDocs.length;

      navigate("/expediente/nuevo", {
        state: {
          mesaPartes: mesaPartesCreada,
          requisitosCompletos,
          materiasSeleccionadas: selectedMaterias,
        },
      });

      setOpen(false);
    } catch (err) {
      console.error("Error al crear mesa de partes:", err);
      alert("Error al crear la mesa de partes.");
    }
  };

  // ----------------------------------------------------------------
  // UI
  // ----------------------------------------------------------------
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
            <DialogTitle className="text-2xl font-semibold">
              Mesa de Partes
            </DialogTitle>
            <DialogDescription>
              Selecciona tipo, materias y documentos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* TIPO */}
            <div>
              <Label>Tipo de expediente</Label>
              <Select
                value={selectedType?.toString() || ""}
                onValueChange={(value) => setSelectedType(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipos.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoMateria}
                      value={tipo.idTipoMateria.toString()}
                    >
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* MATERIAS */}
            {selectedType && (
              <div>
                <Label>Materias</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tipos
                    .find((t) => t.idTipoMateria === selectedType)
                    ?.materias.map((m) => (
                      <div
                        key={m.idMateria}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedMaterias.includes(m.idMateria)}
                          onCheckedChange={() => toggleMateria(m.idMateria)}
                        />
                        <Label>{m.nombre}</Label>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* REQUISITOS */}
            {requisitos.length > 0 && (
              <div>
                <Label>Requisitos</Label>
                <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                  {requisitos.map((r) => (
                    <div
                      key={r.idRequisito}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={checkedDocs.includes(r.idRequisito)}
                        onCheckedChange={() => toggleDoc(r.idRequisito)}
                      />
                      <Label>
                        {r.nombre}{" "}
                        {r.obligatorio && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
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
              disabled={!selectedType || selectedMaterias.length === 0}
              onClick={handleNext}
            >
              Siguiente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ALERTA DE FALTANTES */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Faltan requisitos obligatorios</AlertDialogTitle>
            <AlertDialogDescription>
              Debes marcar todos los requisitos obligatorios antes de continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MesaPartes;
