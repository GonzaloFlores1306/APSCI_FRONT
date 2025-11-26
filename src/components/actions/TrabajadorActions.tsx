import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Ellipsis, UserRoundX } from "lucide-react";
import { TrabajadorDialog } from "../dialogs/TrabajadorDialog";
import { mapRowWorkerApi } from "../../mappers/workerMapper";
import { useWorker } from "../../context/Mantenimiento/WorkerContext";

interface props {
  role: string;
  row: any;
}

export const TrabajadorActions = ({ role, row }: props) => {
  const { desactivarWorker, activarWorker } = useWorker();

  const rowClean = mapRowWorkerApi(row);

  const handleState = (estado: string, id: number) => {
    if (estado) desactivarWorker(id);
    else activarWorker(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="center">
        {role === "Admin" && (
          <>
            <TrabajadorDialog type="edit" data={rowClean} />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleState(row.estado, row.id)}
            >
              <UserRoundX size={16} className="mr-2" />
              {row.estado ? "Desactivar" : "Activar"}
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
