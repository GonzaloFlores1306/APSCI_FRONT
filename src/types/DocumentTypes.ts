import z from "zod";

const dniSchema = z
  .string()
  .min(8, "El DNI debe tener 8 dígitos")
  .max(8, "El DNI debe tener 8 dígitos")
  .regex(/^\d+$/, "El DNI solo debe contener números");

const materiasSchema = z.string().min(1, "Campo obligatorio");

export interface DocumentInterface {
  nroExpediente: string;
  solicitante: string;
  dniSolicitante: string;
  invitado: string;
  dniInvitado: string;
  archivo?: string;
}

export interface SolicitudInterface {
  document: DocumentInterface;
  fecha: string;
  hechos: string;
  pretension: string;
}

export interface esquelaInterface {
  nroExpediente: string;
  conciliador: string;
  registro: string;
  especializacion: string;
  fechaDesignacion: string;
  materias: string;
}

export interface InvitacionInterface {
  document: DocumentInterface;
  conciliador: string;
  fechaAudiencia: string;
  horaAudiencia: string;
  materias: string;
}

export interface NotificacionInterface {
  document: DocumentInterface;
  fechaNotificacion: string;
  fechaAudiencia: string;
  horaAudiencia: string;
  observaciones?: string;
}

export interface PreAvisoInterface {
  document: DocumentInterface;
  fechaEnvio: string;
  materias: string;
  observaciones?: string;
}

export interface ConciliacionInterface {
  document: DocumentInterface;
  conciliador: string;
  resultado: string;
  hechos: string;
  descripcion: string;
  acuerdos: string;
  fecha: string;
}

export interface ConstanciaInterface {
  document: DocumentInterface;
  asistencia: string;
  acuerdos: string;
  fecha: string;
  hora: string;
}

export interface SuspensionInterface {
  document: DocumentInterface;
  fecha: string;
  motivo: string;
}

export interface AnexoInterface {
  document: DocumentInterface;
  nombre: string;
  lugar: string;
  fecha: string;
  observaciones?: string;
}

const documentSchema = z.object({
  nroExpediente: z.string().min(1, "Campo obligatorio"),
  solicitante: z.string().min(1, "Campo obligatorio"),
  dniSolicitante: dniSchema,
  invitado: z.string().min(1, "Campo obligatorio"),
  dniInvitado: dniSchema,
});
export const solicitudSchema = z.object({
  document: documentSchema,
  fecha: z.string().min(1, "Campo obligatorio"),
  hechos: z.string().min(10, "Debe tener al menos 10 caracteres"),
  pretension: z.string().min(10, "Debe tener al menos 10 caracteres"),
});

export const esquelaSchema = z.object({
  nroExpediente: z.string().min(1, "Campo obligatorio"),
  conciliador: z.string().min(1, "Campo obligatorio"),
  registro: z
    .string()
    .min(1, "Campo obligatorio")
    .regex(/^\d+$/, "Solo debe contener números"),
  especializacion: z
    .string()
    .regex(/^\d+$/, "Solo debe contener números")
    .optional(),
  fechaDesignacion: z.string().min(1, "Campo obligatorio"),
  materias: materiasSchema,
});

export const invitacionSchema = z.object({
  document: documentSchema,
  conciliador: z.string().min(1, "Campo obligatorio"),
  fechaAudiencia: z.string().min(1, "Campo obligatorio"),
  horaAudiencia: z.string().min(1, "Campo obligatorio"),
  materias: materiasSchema,
});

export const notificacionSchema = z.object({
  document: documentSchema,
  fechaNotificacion: z.string().min(1, "Campo obligatorio"),
  fechaAudiencia: z.string().min(1, "Campo obligatorio"),
  horaAudiencia: z.string().min(1, "Campo obligatorio"),
  observaciones: z.string().optional(),
});

export const preAvisoSchema = z.object({
  document: documentSchema,
  fechaEnvio: z.string().min(1, "Campo obligatorio"),
  materias: materiasSchema,
  observaciones: z.string().optional(),
});

export const conciliacionSchema = z.object({
  document: documentSchema,
  conciliador: z.string().min(1, "Campo obligatorio"),
  resultado: z.string().min(1, "Campo obligatorio"),
  hechos: z.string().min(5, "Debe detallar el motivo"),
  descripcion: z.string().min(5, "Debe detallar el motivo"),
  acuerdos: z.string().min(5, "Debe detallar el motivo"),
  fecha: z.string().min(1, "Campo obligatorio"),
});

export const constanciaSchema = z.object({
  document: documentSchema,
  asistencia: z.string().min(1, "Campo obligatorio"),
  acuerdos: z.string().min(1, "Campo obligatorio"),
  fecha: z.string().min(1, "Campo obligatorio"),
  hora: z.string().min(1, "Campo obligatorio"),
});

export const suspensionSchema = z.object({
  document: documentSchema,
  motivo: z.string().min(1, "Campo obligatorio"),
  fecha: z.string().min(1, "Campo obligatorio"),
});

export const anexoSchema = z.object({
  document: documentSchema,
  nombre: z.string().min(1, "Campo obligatorio"),
  lugar: z.string().min(1, "Campo obligatorio"),
  fecha: z.string().min(1, "Campo obligatorio"),
  observaciones: z.string().optional(),
});
