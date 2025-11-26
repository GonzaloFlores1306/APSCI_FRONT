import { AlertCircle, FolderPlus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { useExpediente } from "../../context/Expedientes/ExpedienteContext";
import { PartyList } from "../../components/cards/PartyList";
import { DialogAsigConciliador } from "../../components/dialogs/DialogAsigConciliador";
import { Loading } from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export const NuevoExpediente = () => {
  const {
    documentsMP,
    handleIniciar,
    acuerdoMutuo,
    setAcuerdoMutuo,
    motivo,
    setMotivo,
    pretensiones,
    setPretensiones,
    documentoCargado,
    setDocumentoCargado,
    solicitantes,
    invitadores,
    error,
    loading,
  } = useExpediente();
  const navigate = useNavigate();
  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div className="flex-1 py-5 max-w-[1600px] mx-auto w-full">
      {loading ? (
        <Loading text="Iniciando" />
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                Nuevo Expediente
              </h2>
              <p className="text-sm text-muted-foreground">
                Complete la información del expediente
              </p>
            </div>
            <div className="flex gap-3">
              <DialogAsigConciliador />
              <Button
                variant={"outline"}
                onClick={handleCancelar}
                className="hover:opacity-90 min-w-[130px] cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleIniciar}
                style={{ backgroundColor: "#b6e0dc", color: "#000" }}
                className="hover:opacity-90 min-w-[130px] cursor-pointer"
              >
                <FolderPlus className="mr-2 h-4 w-4" size={16} />
                Iniciar
              </Button>
            </div>
          </div>
          {/* Adevertencia de Mesa de partes */}
          {documentsMP && (
            <div className=" bg-red-200 py-1 px-5 rounded-xl border border-red-500 text-red-500 flex items-center gap-4 mb-4 max-w-[600px]">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                No se generará Número de expediente. Falta documentos previos.
              </span>
            </div>
          )}

          <div className="flex items-center justify-start space-x-3 mb-6">
            {/* CheckBox de Acuerdo Mutuo */}
            <div className="flex exp-card items-center space-x-2 p-3 rounded-lg shadow">
              <Checkbox
                id="acuerdo-mutuo"
                checked={acuerdoMutuo}
                onCheckedChange={(checked) =>
                  setAcuerdoMutuo(checked as boolean)
                }
              />
              <Label
                htmlFor="acuerdo-mutuo"
                className="text-sm font-medium cursor-pointer"
              >
                Acuerdo mutuo
              </Label>
            </div>
            {/* CheckBox si el la empresa tiene documento de solicitud */}
            <div className="flex items-center exp-card p-3 space-x-2 rounded-lg shadow">
              <Checkbox
                id="documento-cargado"
                checked={documentoCargado}
                onCheckedChange={(checked) =>
                  setDocumentoCargado(checked as boolean)
                }
              />
              <Label
                htmlFor="documento-cargado"
                className="text-sm font-medium cursor-pointer"
              >
                Documento cargado por la empresa
              </Label>
            </div>
          </div>

          {/* Formulario de Solicitantes e invitadores */}
          <div className="space-y-2">
            <PartyList
              name="Solicitante"
              tipoParte="solicitantes"
              data={solicitantes}
            />

            {!acuerdoMutuo && (
              <PartyList
                name="Invitador"
                tipoParte="invitadores"
                data={invitadores}
              />
            )}

            {/* Formulario de Detalles del expediente */}
            <Card className="exp-card rounded-lg">
              <CardHeader className="bg-muted/50 pb-3">
                <CardTitle className="text-lg">
                  Detalles del Conflicto
                </CardTitle>
                <CardDescription className="text-xs">
                  Información sobre el motivo y pretensiones
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="motivo" className="text-sm">
                      Motivo que dieron lugar al conflicto
                    </Label>
                    <Textarea
                      id="motivo"
                      placeholder="Describa el motivo del conflicto"
                      className={`min-h-[120px] resize-none ${
                        error.motivo && "border-red-300"
                      }`}
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                    />
                    {error.motivo && (
                      <p className="text-sm text-red-400">{error.motivo}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pretensiones" className="text-sm">
                      Pretensiones
                    </Label>
                    <Textarea
                      id="pretensiones"
                      placeholder="Describa las pretensiones"
                      className={`min-h-[120px] resize-none ${
                        error.pretensiones && "border-red-300"
                      }`}
                      value={pretensiones}
                      onChange={(e) => setPretensiones(e.target.value)}
                    />
                    {error.pretensiones && (
                      <p className="text-sm text-red-400">
                        {error.pretensiones}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
