import z from "zod";

type EstadoType = "ACTIVO" | "INACTIVO";

export interface SedeApi {
  idSede?: number;
  nombre: string;
  descripcion: string;
  estadoSede?: EstadoType;
}

export interface SedeInterface {
  id?: number;
  name: string;
  desc: string;
  estate?: EstadoType;
}

export const sedeSchema = z.object({
  name: z.string().min(2, { message: "El nombre de Sede es requerido." }),
  desc: z
    .string()
    .min(2, { message: "Es obligatorio agregar una descripcion." }),
});
