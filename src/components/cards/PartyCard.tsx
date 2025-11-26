import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormPersonaNatural } from "../form/FormPersonaNatural";
import { FormPersonaJuridica } from "../form/FormPersonaJuridica";
import type { Persona } from "../../types/EntityTypes";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import type { TipoParte } from "../../types/DataTypes";

interface PropPartyCard {
  name: string;
  index: number;
  tipoParte: TipoParte;
  data: Persona;
  buttonDelete: boolean;
  error?: boolean;
}

export const PartyCard = ({
  name,
  index,
  data,
  tipoParte,
  buttonDelete,
}: PropPartyCard) => {
  const { onDelete, error, onChange } = useExpediente();

  return (
    <Card
      key={data.id}
      className={`exp-card rounded-lg overflow-hidden shadow ${
        error[`${tipoParte}.${index}`] ? "!border-red-300" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {name} {index + 1}
            </CardTitle>
            <CardDescription className="text-xs">{`Información del ${name}`}</CardDescription>
          </div>
          {buttonDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(data.id, tipoParte)}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center gap-5">
          <Label
            htmlFor={`tipo-persona-${data.id}`}
            className="text-sm mb-1.5 block"
          >
            Tipo de Persona
          </Label>
          <Select
            value={data.tipoPersona}
            // onValueChange={(value) =>
            //   onUpdate(data.id, "tipoPersona", value, tipoParte)
            // }
            onValueChange={(value) =>
              onChange(data.id, "tipoPersona", value, tipoParte)
            }
          >
            <SelectTrigger id={`tipo-persona-${data.id}`} className="w-sm">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Persona Natural</SelectItem>
              <SelectItem value="juridica">Persona Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.tipoPersona === "natural" && (
          <FormPersonaNatural data={data} tipoParte={tipoParte} index={index} />
        )}
        {data.tipoPersona === "juridica" && (
          <FormPersonaJuridica
            data={data}
            tipoParte={tipoParte}
            index={index}
          />
        )}
      </CardContent>
    </Card>
  );
};
