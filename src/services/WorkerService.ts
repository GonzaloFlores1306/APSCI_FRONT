import type { workerApi } from "../types/Mantenimiento/TrabajadorType";
import api from "./api";

export const workerService = {
  add: async (data: workerApi) => {
    try {
      const response = await api.post("/trabajadores", data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  viewData: async (page: number = 0, size: number = 10) => {
    try {
      const response = await api.get(
        `/trabajadores/paginado?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  edit: async (data: workerApi, id: number) => {
    try {
      const response = await api.put(`/trabajadores/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  inactive: async (id: number) => {
    try {
      const response = await api.put(`/trabajadores/desactivar/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  active: async (id: number) => {
    try {
      const response = await api.put(`/trabajadores/activar/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },

  // Búsqueda
  search: async (dni: string, nombre: string) => {
    try {
      const params = new URLSearchParams();
      if (dni && dni.trim() != "") params.append("dniTrabajador", dni);
      if (nombre && nombre.trim() != "")
        params.append("nombreTrabajador", nombre);

      const queryString = params.toString();

      if (!queryString) return [];

      const response = await api.get(`/trabajadores/filtrar?${queryString}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        return { error: true, message: "Error inesperado" };
      }
    }
  },
};
