import type { SedeApi } from "../types/Mantenimiento/SedeType";
import api from "./api";

export const sedeService = {
  add: async (data: SedeApi) => {
    try {
      const response = await api.post(`/sedes`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        // Sin respuesta
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        // Otro tipo de error
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  edit: async (data: SedeApi, id: number) => {
    try {
      const response = await api.put(`/sedes/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        // Sin respuesta
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        // Otro tipo de error
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  viewData: async () => {
    try {
      const response = await api.get(`/sedes`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        // Sin respuesta
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        // Otro tipo de error
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  inactive: async (id: number) => {
    try {
      const response = await api.put(`/sedes/desactivar/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        // Sin respuesta
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        // Otro tipo de error
        return { error: true, message: "Error inesperado" };
      }
    }
  },
  active: async (id: number) => {
    try {
      const response = await api.put(`/sedes/activar/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Datos invalidos",
        };
      } else if (error.request) {
        // Sin respuesta
        return { error: true, message: "No hay conexión con el servidor" };
      } else {
        // Otro tipo de error
        return { error: true, message: "Error inesperado" };
      }
    }
  },
};
