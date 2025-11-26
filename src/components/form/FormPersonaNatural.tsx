import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import type { DireccionForm, Persona } from "../../types/EntityTypes";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import type { TipoParte } from "../../types/DataTypes";
import { DialogDireccion } from "../dialogs/DialogDireccion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface PropPersonaNatural {
  tipoParte: TipoParte;
  data: Persona;
  index: number;
}

export const FormPersonaNatural = ({
  data,
  tipoParte,
  index,
}: PropPersonaNatural) => {
  const {
    onUpdate,
    onUpdateApoderado,
    error,
    deleteAddress,
    direccionSolicitante,
    direccionInvitador,
  } = useExpediente();
  const [listAddress, setListAddress] = useState<DireccionForm[]>([]);
  useEffect(() => {
    setListAddress(
      tipoParte === "solicitantes" ? direccionSolicitante : direccionInvitador
    );
  }, [direccionSolicitante, direccionInvitador]);

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor={`dni-${data.id}`} className="text-sm">
            DNI
          </Label>
          <Input
            id={`dni-${data.id}`}
            placeholder="00000000"
            value={data.personaNatural?.dni}
            onChange={(e) =>
              onUpdate(data.id, "dni", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.dni`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.dni`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.dni`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`nombre-${data.id}`} className="text-sm">
            Nombre
          </Label>
          <Input
            id={`nombre-${data.id}`}
            placeholder="Nombre"
            value={data.personaNatural?.nombre}
            onChange={(e) =>
              onUpdate(data.id, "nombre", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.nombre`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.nombre`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.nombre`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`apellido-paterno-${data.id}`} className="text-sm">
            Apellido Paterno
          </Label>
          <Input
            id={`apellido-paterno-${data.id}`}
            placeholder="Apellido paterno"
            value={data.personaNatural?.apellidoPaterno}
            onChange={(e) =>
              onUpdate(data.id, "apellidoPaterno", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.apellidoPaterno`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.apellidoPaterno`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.apellidoPaterno`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`apellido-materno-${data.id}`} className="text-sm">
            Apellido Materno
          </Label>
          <Input
            id={`apellido-materno-${data.id}`}
            placeholder="Apellido materno"
            value={data.personaNatural?.apellidoMaterno}
            onChange={(e) =>
              onUpdate(data.id, "apellidoMaterno", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.apellidoMaterno`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.apellidoMaterno`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.apellidoMaterno`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`celular-${data.id}`} className="text-sm">
            Celular
          </Label>
          <Input
            id={`celular-${data.id}`}
            placeholder="000 000 000"
            type="tel"
            value={data.personaNatural?.celular}
            onChange={(e) =>
              onUpdate(data.id, "celular", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.celular`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.celular`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.celular`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`whatsapp-${data.id}`} className="text-sm">
            WhatsApp
          </Label>
          <Input
            id={`whatsapp-${data.id}`}
            placeholder="000 000 000"
            type="tel"
            value={data.personaNatural?.whatsapp}
            onChange={(e) =>
              onUpdate(data.id, "whatsapp", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.whatsapp`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.whatsapp`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.whatsapp`]}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`correo-${data.id}`} className="text-sm">
            Correo Electrónico
          </Label>
          <Input
            id={`correo-${data.id}`}
            placeholder="correo@ejemplo.com"
            type="email"
            value={data.personaNatural?.correo}
            onChange={(e) =>
              onUpdate(data.id, "correo", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaNatural.correo`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaNatural.correo`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaNatural.correo`]}
            </p>
          )}
        </div>
        <div className="flex items-end">
          <div className="space-y-1.5">
            <Label htmlFor={`correo-${data.id}`} className="text-sm">
              Direccion
            </Label>
            <div className="flex items-center flex-wrap gap-2">
              {listAddress.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {listAddress.map((addr, index) => (
                    <div
                      key={index}
                      className="flex justify-between gap-4 items-center rounded-lg border border-neutral-200"
                    >
                      <span className="text-sm ml-4">
                        {addr.nombreVia +
                          " " +
                          addr.numero +
                          ", " +
                          addr.distrito}
                        {addr.codigoPostal && ", " + addr.codigoPostal}
                      </span>
                      <Button
                        variant={"ghost"}
                        onClick={() => deleteAddress(tipoParte, index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <DialogDireccion tipoParte={tipoParte} />
              {error[`${tipoParte}.${index}.personaNatural.direcciones`] && (
                <p className="text-sm text-red-400">
                  {error[`${tipoParte}.${index}.personaNatural.direcciones`]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`apoderado-${data.id}`}
            checked={data.personaNatural?.tieneApoderado}
            onCheckedChange={(checked) =>
              onUpdate(data.id, "tieneApoderado", checked as boolean, tipoParte)
            }
          />
          <Label
            htmlFor={`apoderado-${data.id}`}
            className="text-sm font-medium cursor-pointer"
          >
            Apoderado
          </Label>
        </div>

        {data.personaNatural?.tieneApoderado &&
          data.personaNatural?.apoderado && (
            <div className="space-y-4 pl-6 border-l-2 border-primary/20">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Datos del Apoderado
              </h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`apoderado-dni-${data.id}`}
                    className="text-sm"
                  >
                    DNI
                  </Label>
                  <Input
                    id={`apoderado-dni-${data.id}`}
                    placeholder="00000000"
                    value={data.personaNatural?.apoderado.dni}
                    onChange={(e) =>
                      onUpdateApoderado(
                        data.id,
                        "dni",
                        e.target.value,
                        tipoParte
                      )
                    }
                    className={`h-9 ${
                      error[
                        `${tipoParte}.${index}.personaNatural.apoderado.dni`
                      ]
                        ? "border-red-300"
                        : ""
                    }`}
                  />
                  {error[
                    `${tipoParte}.${index}.personaNatural.apoderado.dni`
                  ] && (
                    <p className="text-sm text-red-400">
                      {
                        error[
                          `${tipoParte}.${index}.personaNatural.apoderado.dni`
                        ]
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`apoderado-nombre-${data.id}`}
                    className="text-sm"
                  >
                    Nombre
                  </Label>
                  <Input
                    id={`apoderado-nombre-${data.id}`}
                    placeholder="Nombre"
                    value={data.personaNatural?.apoderado.nombre}
                    onChange={(e) =>
                      onUpdateApoderado(
                        data.id,
                        "nombre",
                        e.target.value,
                        tipoParte
                      )
                    }
                    className={`h-9 ${
                      error[
                        `${tipoParte}.${index}.personaNatural.apoderado.nombre`
                      ]
                        ? "border-red-300"
                        : ""
                    }`}
                  />
                  {error[
                    `${tipoParte}.${index}.personaNatural.apoderado.nombre`
                  ] && (
                    <p className="text-sm text-red-400">
                      {
                        error[
                          `${tipoParte}.${index}.personaNatural.apoderado.nombre`
                        ]
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`apoderado-paterno-${data.id}`}
                    className="text-sm"
                  >
                    Apellido Paterno
                  </Label>
                  <Input
                    id={`apoderado-paterno-${data.id}`}
                    placeholder="Apellido paterno"
                    value={data.personaNatural?.apoderado.apellidoPaterno}
                    onChange={(e) =>
                      onUpdateApoderado(
                        data.id,
                        "apellidoPaterno",
                        e.target.value,
                        tipoParte
                      )
                    }
                    className={`h-9 ${
                      error[
                        `${tipoParte}.${index}.personaNatural.apoderado.apellidoPaterno`
                      ]
                        ? "border-red-300"
                        : ""
                    }`}
                  />
                  {error[
                    `${tipoParte}.${index}.personaNatural.apoderado.apellidoPaterno`
                  ] && (
                    <p className="text-sm text-red-400">
                      {
                        error[
                          `${tipoParte}.${index}.personaNatural.apoderado.apellidoPaterno`
                        ]
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor={`apoderado-materno-${data.id}`}
                    className="text-sm"
                  >
                    Apellido Materno
                  </Label>
                  <Input
                    id={`apoderado-materno-${data.id}`}
                    placeholder="Apellido materno"
                    value={data.personaNatural?.apoderado.apellidoMaterno}
                    onChange={(e) =>
                      onUpdateApoderado(
                        data.id,
                        "apellidoMaterno",
                        e.target.value,
                        tipoParte
                      )
                    }
                    className={`h-9 ${
                      error[
                        `${tipoParte}.${index}.personaNatural.apoderado.apellidoMaterno`
                      ]
                        ? "border-red-300"
                        : ""
                    }`}
                  />
                  {error[
                    `${tipoParte}.${index}.personaNatural.apoderado.apellidoMaterno`
                  ] && (
                    <p className="text-sm text-red-400">
                      {
                        error[
                          `${tipoParte}.${index}.personaNatural.apoderado.apellidoMaterno`
                        ]
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-1.5 flex items-center gap-2">
                  <Checkbox
                    id={`apoderado-docs-${data.id}`}
                    checked={data.personaNatural?.apoderado.documentos}
                    onCheckedChange={(checked) =>
                      onUpdateApoderado(
                        data.id,
                        "documentos",
                        checked as boolean,
                        tipoParte
                      )
                    }
                  />
                  <Label
                    htmlFor={`apoderado-docs-${data.id}`}
                    className="text-sm"
                  >
                    Documentos que acrediten su poder
                  </Label>
                  {/* <Input
                  id={`apoderado-docs-${data.id}`}
                  placeholder="Descripción de documentos"
                  value={data.apoderado.documentos}
                  onChange={(e) =>
                    onUpdateApoderado(
                      data.id,
                      "documentos",
                      e.target.value,
                      tipoParte
                    )
                  }
                  className="h-9"
                /> */}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
