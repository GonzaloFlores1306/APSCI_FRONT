import { type FC } from "react";
import type { UserData } from "../../types/DataTypes";
import { Navigate, useLocation } from "react-router-dom";
import LayoutMenu from "../LayoutMenu";

interface ProtectedRouteProps {
  user: UserData | null;
}

const ProtectedRoutes: FC<ProtectedRouteProps> = ({ user }) => {
  const location = useLocation();

  if (!user) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  // Si el usuario está autenticado y tiene el rol adecuado, renderizar la ruta
  return <LayoutMenu />;
};

export default ProtectedRoutes;
