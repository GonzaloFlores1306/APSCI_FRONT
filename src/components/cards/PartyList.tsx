import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { PartyCard } from "./PartyCard";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import type { TipoParte } from "../../types/DataTypes";
import type { Persona } from "../../types/EntityTypes";

export const PartyList = ({
  name,
  tipoParte,
  data,
}: {
  name: string;
  tipoParte: TipoParte;
  data: Persona[];
}) => {
  const { onAddClient } = useExpediente();

  return (
    <>
      <Button
        type="button"
        onClick={() => onAddClient(tipoParte)}
        variant="outline"
        className="w-auto bg-transparent"
      >
        <Plus className="mr-2 h-4 w-4" />
        {`Agregar ${name}`}
      </Button>
      <div className="grid grid-col-1  gap-4 mb-5 ">
        {data.map((client, index) => (
          <PartyCard
            name={name}
            buttonDelete={data.length > 1}
            data={client}
            index={index}
            tipoParte={tipoParte}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
