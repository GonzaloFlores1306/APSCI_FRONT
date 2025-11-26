import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type DireccionForm, type Persona } from "../../types/EntityTypes";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import type { TipoParte } from "../../types/DataTypes";
import { DialogDireccion } from "../dialogs/DialogDireccion";
import { useEffect, useState } from "react";

interface PropPersonaJuridica {
  tipoParte: TipoParte;
  data: Persona;
  index: number;
}

export const FormPersonaJuridica = ({
  data,
  tipoParte,
  index,
}: PropPersonaJuridica) => {
  const {
    onUpdate,
    onUpdateRepresentante,
    error,
    direccionSolicitante,
    direccionInvitador,
    deleteAddress,
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
          <Label htmlFor={`ruc-${data.id}`} className="text-sm">
            RUC
          </Label>
          <Input
            id={`ruc-${data.id}`}
            placeholder="00000000000"
            value={data.personaJuridica?.ruc}
            onChange={(e) =>
              onUpdate(data.id, "ruc", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaJuridica.ruc`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaJuridica.ruc`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaJuridica.ruc`]}
            </p>
          )}
        </div>
        <div className="space-y-1.5 lg:col-span-2">
          <Label htmlFor={`razon-social-${data.id}`} className="text-sm">
            Razón Social
          </Label>
          <Input
            id={`razon-social-${data.id}`}
            placeholder="Razón social de la empresa"
            value={data.personaJuridica?.razonSocial}
            onChange={(e) =>
              onUpdate(data.id, "razonSocial", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaJuridica.razonSocial`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaJuridica.razonSocial`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaJuridica.razonSocial`]}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`correo-jur-${data.id}`} className="text-sm">
            Correo Electrónico
          </Label>
          <Input
            id={`correo-jur-${data.id}`}
            placeholder="correo@empresa.com"
            type="email"
            value={data.personaJuridica?.correo}
            onChange={(e) =>
              onUpdate(data.id, "correo", e.target.value, tipoParte)
            }
            className={`h-9 ${
              error[`${tipoParte}.${index}.personaJuridica.correo`]
                ? "border-red-300"
                : ""
            }`}
          />
          {error[`${tipoParte}.${index}.personaJuridica.correo`] && (
            <p className="text-sm text-red-400">
              {error[`${tipoParte}.${index}.personaJuridica.correo`]}
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
              {error[`${tipoParte}.${index}.personaJuridica.direcciones`] && (
                <p className="text-sm text-red-400">
                  {error[`${tipoParte}.${index}.personaJuridica.direcciones`]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Representante Legal
        </h4>
        {data.personaJuridica?.representante && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor={`rep-dni-${data.id}`} className="text-sm">
                DNI
              </Label>
              <Input
                id={`rep-dni-${data.id}`}
                placeholder="00000000"
                value={data.personaJuridica?.representante.dni}
                onChange={(e) =>
                  onUpdateRepresentante(
                    data.id,
                    "dni",
                    e.target.value,
                    tipoParte
                  )
                }
                className={`h-9 ${
                  error[
                    `${tipoParte}.${index}.personaJuridica.representante.dni`
                  ]
                    ? "border-red-300"
                    : ""
                }`}
              />
              {error[
                `${tipoParte}.${index}.personaJuridica.representante.dni`
              ] && (
                <p className="text-sm text-red-400">
                  {
                    error[
                      `${tipoParte}.${index}.personaJuridica.representante.dni`
                    ]
                  }
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`rep-nombre-${data.id}`} className="text-sm">
                Nombre
              </Label>
              <Input
                id={`rep-nombre-${data.id}`}
                placeholder="Nombre"
                value={data.personaJuridica?.representante.nombre}
                onChange={(e) =>
                  onUpdateRepresentante(
                    data.id,
                    "nombre",
                    e.target.value,
                    tipoParte
                  )
                }
                className={`h-9 ${
                  error[
                    `${tipoParte}.${index}.personaJuridica.representante.nombre`
                  ]
                    ? "border-red-300"
                    : ""
                }`}
              />
              {error[
                `${tipoParte}.${index}.personaJuridica.representante.nombre`
              ] && (
                <p className="text-sm text-red-400">
                  {
                    error[
                      `${tipoParte}.${index}.personaJuridica.representante.nombre`
                    ]
                  }
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`rep-paterno-${data.id}`} className="text-sm">
                Apellido Paterno
              </Label>
              <Input
                id={`rep-paterno-${data.id}`}
                placeholder="Apellido paterno"
                value={data.personaJuridica?.representante.apellidoPaterno}
                onChange={(e) =>
                  onUpdateRepresentante(
                    data.id,
                    "apellidoPaterno",
                    e.target.value,
                    tipoParte
                  )
                }
                className={`h-9 ${
                  error[
                    `${tipoParte}.${index}.personaJuridica.representante.apellidoPaterno`
                  ]
                    ? "border-red-300"
                    : ""
                }`}
              />
              {error[
                `${tipoParte}.${index}.personaJuridica.representante.apellidoPaterno`
              ] && (
                <p className="text-sm text-red-400">
                  {
                    error[
                      `${tipoParte}.${index}.personaJuridica.representante.apellidoPaterno`
                    ]
                  }
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`rep-materno-${data.id}`} className="text-sm">
                Apellido Materno
              </Label>
              <Input
                id={`rep-materno-${data.id}`}
                placeholder="Apellido materno"
                value={data.personaJuridica?.representante.apellidoMaterno}
                onChange={(e) =>
                  onUpdateRepresentante(
                    data.id,
                    "apellidoMaterno",
                    e.target.value,
                    tipoParte
                  )
                }
                className={`h-9 ${
                  error[
                    `${tipoParte}.${index}.personaJuridica.representante.apellidoMaterno`
                  ]
                    ? "border-red-300"
                    : ""
                }`}
              />
              {error[
                `${tipoParte}.${index}.personaJuridica.representante.apellidoMaterno`
              ] && (
                <p className="text-sm text-red-400">
                  {
                    error[
                      `${tipoParte}.${index}.personaJuridica.representante.apellidoMaterno`
                    ]
                  }
                </p>
              )}
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor={`rep-cargo-${data.id}`} className="text-sm">
                Cargo
              </Label>
              <Input
                id={`rep-cargo-${data.id}`}
                placeholder="Gerente General, Apoderado, etc."
                value={data.personaJuridica?.representante.cargo}
                onChange={(e) =>
                  onUpdateRepresentante(
                    data.id,
                    "cargo",
                    e.target.value,
                    tipoParte
                  )
                }
                className={`h-9 ${
                  error[
                    `${tipoParte}.${index}.personaJuridica.representante.cargo`
                  ]
                    ? "border-red-300"
                    : ""
                }`}
              />
              {error[
                `${tipoParte}.${index}.personaJuridica.representante.cargo`
              ] && (
                <p className="text-sm text-red-400">
                  {
                    error[
                      `${tipoParte}.${index}.personaJuridica.representante.cargo`
                    ]
                  }
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
