import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "@/context/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
