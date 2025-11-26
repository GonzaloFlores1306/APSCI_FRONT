import z from "zod";

export interface Apoderado {
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documentos: boolean;
}

export interface Representante {
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cargo: string;
}

export interface Persona {
  id: number;
  tipoPersona: string;
  personaNatural?: PersonaNatural;
  personaJuridica?: PersonaJuridica;
}

export interface PersonaNatural {
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  celular: string;
  whatsapp: string;
  correo: string;
  tieneApoderado: boolean;
  direcciones: DireccionForm[];
  apoderado?: Apoderado;
}

export interface PersonaJuridica {
  ruc: string;
  razonSocial: string;
  correo: string;
  direcciones: DireccionForm[];
  representante: Representante;
}

export interface Direccion {
  departamento: string;
  provincia: string;
  distrito: string;
  nombreVia: string;
  numero: string;
  manzana: string;
  lote: string;
  urbanizacion: string;
  referencia: string;
  codigoPostal: string;
}

export const direccionSchema = z.object({
  departamento: z.string().min(1, "El departamento es obligatorio"),
  provincia: z.string().min(1, "La provincia es obligatoria"),
  distrito: z.string().min(1, "El distrito es obligatorio"),
  nombreVia: z.string().min(1, "El nombre de la vía es obligatorio"),
  numero: z.coerce
    .number("El campo debe ser un numero")
    .min(1, "El número es obligatorio"),
  manzana: z.string().optional(),
  lote: z.string().optional(),
  urbanizacion: z.string().optional(),
  referencia: z.string().min(1, "La referencia es obligatoria"),
  codigoPostal: z.string().optional(),
});

export type DireccionForm = z.infer<typeof direccionSchema>;

// Validaciones reutilizables
const dniSchema = z
  .string()
  .min(8, "El DNI debe tener 8 dígitos")
  .max(8, "El DNI debe tener 8 dígitos")
  .regex(/^\d+$/, "El DNI solo debe contener números");

const correoSchema = z
  .string()
  .email("Debe ser un correo válido")
  .min(5, "El correo es obligatorio");

const celularSchema = z
  .string()
  .min(9, "El celular debe tener 9 dígitos")
  .max(9, "El celular debe tener 9 dígitos")
  .regex(/^\d+$/, "El celular solo debe contener números");

export const apoderadoSchema = z.object({
  dni: dniSchema,
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellidoPaterno: z.string().min(2, "El apellido paterno es obligatorio"),
  apellidoMaterno: z.string().min(2, "El apellido materno es obligatorio"),
  documentos: z.boolean().refine((v) => v === true, {
    message: "Debe subir los documentos del apoderado",
  }),
});

export const representanteSchema = z.object({
  dni: dniSchema,
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellidoPaterno: z.string().min(2, "El apellido paterno es obligatorio"),
  apellidoMaterno: z.string().min(2, "El apellido materno es obligatorio"),
  cargo: z.string().min(2, "El cargo es obligatorio"),
});

export const personaNaturalSchema = z.object({
  dni: dniSchema,
  nombre: z.string().min(2, "El nombre es obligatorio"),
  apellidoPaterno: z.string().min(2, "El apellido paterno es obligatorio"),
  apellidoMaterno: z.string().min(2, "El apellido materno es obligatorio"),
  celular: celularSchema,
  whatsapp: celularSchema,
  correo: correoSchema,
  tieneApoderado: z.boolean(),
  direcciones: z
    .array(direccionSchema)
    .min(1, "Debe registrar al menos una dirección"),
  apoderado: apoderadoSchema.optional(),
});

export const personaJuridicaSchema = z.object({
  ruc: z
    .string()
    .min(11, "El RUC debe tener 11 dígitos")
    .max(11, "El RUC debe tener 11 dígitos")
    .regex(/^\d+$/, "El RUC solo debe contener números"),
  razonSocial: z.string().min(2, "La razón social es obligatoria"),
  correo: correoSchema,
  direcciones: z
    .array(direccionSchema)
    .min(1, "Debe registrar al menos una dirección"),
  representante: representanteSchema,
});

export const personaSchema = z
  .object({
    id: z.number(),
    tipoPersona: z.string(),
    personaNatural: personaNaturalSchema.optional(),
    personaJuridica: personaJuridicaSchema.optional(),
  })
  .refine(
    (data) =>
      (data.tipoPersona === "natural" && data.personaNatural) ||
      (data.tipoPersona === "juridica" && data.personaJuridica),
    {
      message:
        "Debe llenar los campos correspondientes al tipo de persona seleccionado",
    }
  );
export type personaForm = z.infer<typeof personaSchema>;

export const expedienteSchema = z.object({
  acuerdoMutuo: z.boolean(),
  solicitantes: z
    .array(personaSchema)
    .nonempty("Debe haber al menos un solicitante"),
  invitadores: z
    .array(personaSchema)
    .nonempty("Debe haber al menos un invitador"),
  motivo: z.string().trim().min(5, "Debe ingresar un motivo válido"),
  pretensiones: z.string().trim().min(5, "Debe ingresar las pretensiones"),
  documentoCargado: z.boolean(),
});

export type ExpedienteForm = z.infer<typeof expedienteSchema>;
