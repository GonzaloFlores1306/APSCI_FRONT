import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api", // Cambia el puerto según tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      console.error("Error en el token", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Interceptor para agregar token (si usas autenticación JWT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
