import LogoEVAK from "../assets/Logo-EVAK.png";
import "../styles/components/header.css";
export const Header = ({ titulo }: { titulo: string }) => {
  return (
    <header className="flex justify-between py-2 items-center px-5">
      <div className="flex items-center gap-3">
        <h2 className="font-medium text-lg">{titulo}</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">EVAK</span>
        <img src={LogoEVAK} className="h-[60px] w-[60px] " alt="" />
      </div>
    </header>
  );
};
