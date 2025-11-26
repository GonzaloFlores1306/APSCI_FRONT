import "../styles/login.css";
import LogoAPSI from "../assets/Logo-APSCI.png";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import type { LoginForm } from "../types/FormTypes";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/auth/AuthContext";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Debe colocar un nombre de usuario" }),
  password: z.string().min(1, { message: "Debe colocar una contraseña" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, responseError, clearResponse, loading } = useAuth();
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearResponse();
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof typeof formData;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({
      username: "",
      password: "",
    });
    handleLogin(e, formData);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#f3f3f3]">
      <div className=" max-w-[550px] w-full m-auto p-3">
        <div className=" flex items-center justify-center gap-5">
          <div className="bg-white w-[100px] shadow-md h-[100px] rounded-2xl p-5">
            <img src={LogoAPSI} alt="" />
          </div>
          <h1 className="text-2xl font-bold ml-3 w-2/3">
            Asociacion Peruana para Solucion de Conflitos e Intereses
          </h1>
        </div>
        <div className="container-login rounded-4xl drop-shadow-lg py-10 px-10 flex flex-col gap-3 items-center justify-between mt-15">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold">Bienvenido de vuelta</h2>
            <h3 className="text-md font-medium">
              Inicia sesion en tu cuenta para acceder
            </h3>
          </div>
          <form
            className="w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-10 mt-5 w-full max-w-[400px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="userLogin">Usuario</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="username"
                    id="userLogin"
                    onChange={handleChange}
                    placeholder="Usuario*"
                    className={`${
                      errors.username !== "" ? "!border-red-300" : ""
                    }`}
                  />
                  <div className="absolute right-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className={`${errors.username !== "" && "!fill-red-300"}`}
                    >
                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                    </svg>
                  </div>
                </div>
                {errors.username !== "" && (
                  <p className="text-red-400 font-medium text-sm">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="userLogin">Contraseña</label>
                <div className="relative flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="passwordLogin"
                    onChange={handleChange}
                    placeholder="Contraseña*"
                    className={`${errors.password !== "" && "!border-red-300"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 cursor-pointer hover:bg-gray-100  rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className={`${errors.password !== "" && "!fill-red-300"}`}
                    >
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path>
                      <path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                    </svg>
                  </button>
                </div>
                {errors.password !== "" && (
                  <p className="text-red-400 font-medium text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn-inicioSesion font-medium text-center cursor-pointer hover:scale-101 mt-15 w-3/4 shadow py-2 rounded-2xl "
              type="submit"
            >
              <div className="flex justify-center">
                {loading ? (
                  <LoaderCircle size={24} className="animate-spin !fill-none" />
                ) : (
                  "Iniciar Sesion"
                )}
              </div>
            </button>
          </form>

          {responseError && (
            <div className="flex flex-col justify-center font-medium bg-red-100 border border-red-300 w-full rounded-lg mt-3 text-center p-2 ">
              <span>{responseError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
