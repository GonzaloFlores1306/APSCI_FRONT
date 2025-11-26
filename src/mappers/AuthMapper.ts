import type { LoginApi, LoginForm } from "../types/FormTypes";

export const mapLoginFormToApi = (form: LoginForm): LoginApi => ({
  usuario: form.username,
  contrasenia: form.password,
});
