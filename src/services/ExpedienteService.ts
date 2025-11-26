import api from "./api";
import type { ExpedienteApi } from "@/types/ExpedienteType";

export const expedienteService = {
  // Listar todos los expedientes
  getAll: async () => {
    try {
      const response = await api.get<ExpedienteApi[]>("/expedientes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener expedientes:", error);
      return [];
    }
  },

  // Crear nuevo expediente
  create: async (data: any) => {
    try {
      const response = await api.post("/expedientes", data);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear expediente:", error);
      throw error;
    }
  },

  // Obtener por ID
  geyById: async (id: number) => {
    try {
      const response = await api.get<ExpedienteApi>(`/expedientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener expediente con ID ${id}:`, error);
      throw error;
      return null;
    }
  },
};
