import z from "zod";

export type RolType =
  | "ADMINISTRADOR"
  | "CONCILIADOR"
  | "ASISTENTE_ADMINISTRATIVO";

export interface workerInterface {
  id?: string;
  dni: string;
  name: string;
  lastnamePater: string;
  lastnameMater: string;
  phone: string;
  state?: boolean;
  email: string;
  sede: number;
  user: string;
  password?: string;
  rol: RolType;
  registro?: string;
}

export interface workerApi {
  idTrabajador?: string;
  dniTrabajador: string;
  nombreTrabajador: string;
  apePaterTrabajador: string;
  apeMaterTrabajador: string;
  telefonoTrabajador: string;
  emailTrabajador: string;
  estadoTrabajador?: boolean;
  sede: number;
  usuario: string;
  contrasenia?: string;
  rol: RolType;
  registroCivilComercial?: string;
}

export const workerSchema = z.object({
  dni: z
    .string()
    .length(8, { message: "El DNI debe tener 8 dígitos." })
    .regex(/^\d+$/, "El DNI solo debe contener números"),
  name: z.string().min(2, { message: "El nombre es requerido." }),
  lastnamePater: z
    .string()
    .min(2, { message: "El apellido paterno es requerido." }),
  lastnameMater: z
    .string()
    .min(2, { message: "El apellido materno es requerido." }),
  phone: z
    .string()
    .length(9, { message: "El teléfono debe tener 9 dígitos." })
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  email: z
    .email({ message: "Debe ser un correo electrónico válido." })
    .min(1, { message: "El correo es obligatorio." }),
  sede: z.number().min(1, { message: "Debe seleccionar una sede." }),
  user: z
    .string()
    .min(4, { message: "El usuario debe tener al menos 4 caracteres." }),
  password: z
    .string()
    .min(4, { message: "La contraseña debe tener al menos 4 caracteres." })
    .optional(),
  rol: z.enum(
    ["ADMINISTRADOR", "CONCILIADOR", "ASISTENTE_ADMINISTRATIVO"] as const,
    {
      error: "Debe seleccionar un rol.",
    }
  ),
  registro: z
    .string()
    .min(1, { message: "El numero de registro es obligatorio" })
    .optional(),
});
