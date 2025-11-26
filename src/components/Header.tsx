import { ChevronLeft, Menu } from "lucide-react";
import LogoEVAK from "../assets/Logo-EVAK.png";
import "../styles/components/header.css";
import { useAuth } from "@/context/auth/AuthContext";
export const Header = ({ titulo }: { titulo: string }) => {
  const { handleOpen } = useAuth();
  return (
    <header className="flex justify-between py-2 items-center px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpen}
          className="cursor-pointer  p-2 rounded-md hover:bg-neutral-100"
        >
          <ChevronLeft size={22} className="hidden lg:flex" />
          <Menu className="lg:hidden" />
        </button>
        <h2 className="font-medium text-lg">{titulo}</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">EVAK</span>
        <img src={LogoEVAK} className="h-[60px] w-[60px] " alt="" />
      </div>
    </header>
  );
};
