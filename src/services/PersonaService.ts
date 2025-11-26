import api from "./api";
import type { PersonaApi } from "@/types/Mantenimiento/PersonaType";

export const personaService = {
  getAll: async () => {
    try {
      const response = await api.get<PersonaApi[]>("/personas");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching personas:", error);
      return [];
    }
  },

  getByRole: async (rol: String) => {
    try {
      const response = await api.get<PersonaApi[]>(
        `/personas/filtrar?rol=${rol}`
      );
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching personas con rol ${rol}:`, error);
      return [];
    }
  },

  search: async (doc: string, nombre: string) => {
    try {
      const params = new URLSearchParams();
      if (doc && doc.trim() != "") params.append("doc", doc);
      if (nombre && nombre.trim() != "") params.append("nombre", nombre);

      const queryString = params.toString();

      // Si no hay filtros, obtener todo
      if (!queryString) {
        const all = await api.get<PersonaApi[]>("/personas");
        return all.data;
      }

      const response = await api.get<PersonaApi[]>(
        `/personas/buscar?${queryString}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error buscando personas:", error);
      return [];
    }
  },

  toggleEstado: async (id: number, nuevoEstado: boolean) => {
    const endpoint = nuevoEstado ? "activar" : "desactivar";
    await api.put(`/personas/${endpoint}/${id}`);
  },
};
