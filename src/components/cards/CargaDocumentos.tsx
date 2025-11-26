import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Download, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const CargaDocumentos = ({
  handleFileUpload,
}: {
  handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [activeTab] = useState("invitacion");
  const [generatedDocs] = useState<Record<string, number>>({});
  const [uploadedFiles] = useState<Record<string, string[]>>({});

  return (
    <div className="space-y-4">
      {handleFileUpload && (
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Cargar Archivo</CardTitle>
            <CardDescription>Sube un archivo PDF o Word</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id={`file-upload-${activeTab}`}
              />
              <label
                htmlFor={`file-upload-${activeTab}`}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium">Haz clic para subir</span>
                <span className="text-xs text-muted-foreground">
                  o arrastra un archivo
                </span>
              </label>
            </div>

            {uploadedFiles[activeTab] &&
              uploadedFiles[activeTab].length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Archivos subidos:</p>
                  {uploadedFiles[activeTab].map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-muted p-2 rounded-lg"
                    >
                      <span className="text-sm truncate">{file}</span>
                      <Badge>Cargado</Badge>
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      )}

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Documentos Generados</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedDocs[activeTab] ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total generado:</span>
                <Badge variant="outline" className="rounded-xl">
                  {generatedDocs[activeTab]}
                </Badge>
              </div>
              <Button variant="secondary" className="w-full rounded-2xl">
                <Download className="mr-2 h-4 w-4" />
                Descargar Últimos
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No hay documentos generados aún
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
