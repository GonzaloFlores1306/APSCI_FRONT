import type {
  workerApi,
  workerInterface,
} from "../types/Mantenimiento/TrabajadorType";

export const mapWorkerFromApi = (api: workerApi): workerInterface => ({
  id: api.idTrabajador || undefined,
  dni: api.dniTrabajador || "",
  name: api.nombreTrabajador || "",
  lastnamePater: api.apePaterTrabajador || "",
  lastnameMater: api.apeMaterTrabajador || "",
  phone: api.telefonoTrabajador || "",
  email: api.emailTrabajador || "",
  state: api.estadoTrabajador,
  sede: api.sede ?? 0,
  user: api.usuario || "",
  password: api.contrasenia || "",
  rol: api.rol,
  registro: api.registroCivilComercial || "",
});

export const mapWorkerToApi = (worker: workerInterface): workerApi => ({
  idTrabajador: worker.id,
  dniTrabajador: worker.dni,
  nombreTrabajador: worker.name,
  apePaterTrabajador: worker.lastnamePater,
  apeMaterTrabajador: worker.lastnameMater,
  telefonoTrabajador: worker.phone,
  estadoTrabajador: worker.state,
  emailTrabajador: worker.email,
  sede: worker.sede,
  usuario: worker.user,
  contrasenia: worker.password ? worker.password : undefined,
  rol: worker.rol,
  registroCivilComercial: worker.registro || "",
});

export const mapRowWorkerApi = (worker: any): workerInterface => {
  const lastnamePater = worker.lastname.split(" ")[0];
  const lastnameMater = worker.lastname.split(" ")[1];
  const rol = worker.rol.toUpperCase();
  return {
    id: worker.id || undefined,
    dni: worker.dni || "",
    name: worker.name || "",
    lastnamePater: lastnamePater || "",
    lastnameMater: lastnameMater || "",
    phone: worker.phone || "",
    email: worker.email || "",
    sede: worker.sede ?? 1,
    user: worker.user || "",
    password: worker.password || undefined,
    rol: rol,
    registro: worker.registro || undefined,
  };
};
