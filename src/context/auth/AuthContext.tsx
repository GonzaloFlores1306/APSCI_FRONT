import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import type { LoginApi, LoginForm } from "@/types/FormTypes";
import type { UserData } from "@/types/DataTypes";
import { mapLoginFormToApi } from "@/mappers/AuthMapper";
import { authService } from "@/services/AuthService";

interface AuthContextType {
  handleLogin: (e: FormEvent<HTMLFormElement>, formData: LoginForm) => void;
  responseError: string | null;
  clearResponse(): void;
  userData: UserData | null;
  handleLogOut(): void;
  open: boolean;
  handleOpen(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [responseError, setResponse] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const clearResponse = () => setResponse(null);

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    formData: LoginForm
  ) => {
    e.preventDefault();

    setLoading(true);

    const data: LoginApi = mapLoginFormToApi(formData);
    const response = await authService.login(data);

    setLoading(false);

    if (response.error) {
      setResponse("Credenciales inválidas");
    } else {
      console.log(response);
      localStorage.setItem("token", response.token);
      const user: UserData = {
        id: response.id,
        role: response.rol,
        username: response.usuario,
      };
      setUserData(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/inicio");
    }
  };

  const value = {
    handleLogin,
    responseError,
    clearResponse,
    userData,
    handleLogOut,
    open,
    handleOpen,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
