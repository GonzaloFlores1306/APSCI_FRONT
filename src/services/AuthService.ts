import type { LoginApi } from "../types/FormTypes";
import api from "./api";

export const authService = {
  login: async (data: LoginApi) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error del backend
        return {
          error: true,
          message: error.response.data.message || "Credenciales inválidas",
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
