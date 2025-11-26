import api from "./api";

export const reniecService = {
  getDni: async (dni: string) => {
    try {
      const response = await api.get(`/trabajadores/reniec/${dni}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Dni inválido",
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
