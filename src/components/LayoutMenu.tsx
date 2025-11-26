import {
  BookOpen,
  ChevronDown,
  FileStack,
  FileText,
  Home,
  LogOut,
  Settings,
  Sheet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../styles/components/layoutMenu.css";
import LogoAPSI from "../assets/Logo-APSCI.png";
import { useAuth } from "@/context/auth/AuthContext";
const sidebarItems = [
  {
    title: "Inicio",
    icon: <Home />,
    isActive: true,
    url: "/inicio",
  },
  {
    title: "Expedientes",
    icon: <FileText />,
    url: null,
    items: [
      { title: "Solicitantes", url: "/solicitantes" },
      { title: "Invitador", url: "/invitador" },
      { title: "Expedientes", url: "/expedientes" },
    ],
  },
  {
    title: "Documentos",
    icon: <FileStack />,
    url: "/documentos",
  },
  {
    title: "Repositorio",
    icon: <BookOpen />,
    url: "/repositorio",
  },
  {
    title: "Reportes",
    icon: <Sheet />,
    url: "/reportes",
  },
  {
    title: "Mantenimiento",
    icon: <Settings />,
    url: null,
    items: [
      { title: "Clientes", url: "/mantenimiento/clientes" },
      { title: "Trabajadores", url: "/mantenimiento/trabajadores" },
      { title: "Sedes", url: "/mantenimiento/sedes" },
    ],
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

const LayoutMenu = () => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const location = useLocation();
  const { userData, handleLogOut, open, handleOpen } = useAuth();

  //---------------------------------------
  const toggleExpanded = (title: string) => {
    if (open && !isMobile) handleOpen();
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  useEffect(() => {
    if (open) {
      setExpandedItems({});
    }
  }, [open, setExpandedItems]);
  const matchPath = (path?: string) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <div className="flex h-screen w-full">
      <section
        className={`section-container ${
          !open ? "w-[280px]" : "w-[80px]"
        } rounded-r-2xl flex-col justify-between hidden lg:flex`}
      >
        <div
          className={`flex justify-center items-center gap-3 mb-6 ${
            !open ? "py-6" : "py-4"
          }`}
        >
          <img src={LogoAPSI} className="h-[60px] w-[60px] " alt="" />
          {!open ? (
            <div>
              <h2 className="font-bold text-2xl">APSCI</h2>
            </div>
          ) : null}
        </div>
        <nav className="p-4">
          <div className="flex-1 py-2 ">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const isActiveParent = item.url
                  ? matchPath(item.url)
                  : !!item.items &&
                    item.items.some((sub) => matchPath(sub.url));
                return (
                  <div key={item.title} className="mb-1">
                    {item.items ? (
                      <button
                        type="button"
                        onClick={() => {
                          console.log(item.title);
                          toggleExpanded(item.title);
                        }}
                        className={`w-full text-left cursor-pointer flex items-center justify-between rounded-xl px-3 py-4 text-sm font-medium
                          ${
                            isActiveParent
                              ? "menu-active font-bold"
                              : "hover:bg-muted"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {!open ? <span>{item.title}</span> : null}
                        </div>
                        <ChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            expandedItems[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.url ?? "/"}
                        end
                        className={({ isActive }) =>
                          `cursor-pointer flex w-full items-center justify-between rounded-xl px-3 py-4 text-sm font-medium ${
                            isActive
                              ? "menu-active font-bold"
                              : "hover:bg-muted"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {!open ? <span>{item.title}</span> : null}
                        </div>
                      </NavLink>
                    )}
                    {item.items && expandedItems[item.title] && (
                      <div className=" submenu mt-1 ml-6 space-y-1 border-l pl-3">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.title}
                            href={subItem.url}
                            className="flex hover:bg-neutral-100 items-center justify-between rounded-2xl px-3 py-2 text-sm"
                          >
                            {subItem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="p-4">
          <div className="flex items-center p-4 px-0">
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
            {!open ? (
              <div className="ml-3 font-medium text-sm">
                <p>{userData?.username}</p>
                <p className="font-bold">
                  {userData?.role
                    ? userData.role.charAt(0).toUpperCase() +
                      userData?.role.slice(1).toLowerCase()
                    : "Sin rol"}
                </p>
              </div>
            ) : null}
          </div>
          <div className="seccionMenu-inferior">
            <button
              onClick={handleLogOut}
              className={`flex justify-center hover:bg-neutral-200 cursor-pointer w-full py-3 ${
                open ? "px-0" : "px-4"
              } rounded-2xl`}
            >
              <LogOut className={open ? "" : "mr-3"} />
              {!open ? <span>Cerrar Sesion</span> : null}
            </button>
          </div>
        </div>
      </section>
      <section
        className={`section-container ${
          !open && "hidden"
        } w-full h-full absolute top-0 z-20 p-5 flex flex-col justify-around lg:hidden`}
      >
        <div className="flex items-center gap-3 mb-6">
          <img src={LogoAPSI} className="h-[60px] w-[60px] " alt="" />
          <div>
            <h2 className="font-bold text-2xl">APSCI</h2>
          </div>
          <button
            onClick={handleOpen}
            className="absolute top-5 right-5 cursor-pointer"
          >
            <X size={32} />
          </button>
        </div>
        <nav className="max-h-[60vh] overflow-y-auto mb-6">
          <div className="flex-1 py-2 ">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const isActiveParent = item.url
                  ? matchPath(item.url)
                  : !!item.items &&
                    item.items.some((sub) => matchPath(sub.url));
                return (
                  <div key={item.title} className="mb-1">
                    {item.items ? (
                      <button
                        type="button"
                        onClick={() => {
                          console.log(item.title);
                          toggleExpanded(item.title);
                        }}
                        className={`w-full text-left cursor-pointer flex items-center justify-between rounded-xl px-3 py-4 text-sm font-medium
                          ${
                            isActiveParent
                              ? "menu-active font-bold"
                              : "hover:bg-muted"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            expandedItems[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      // Item simple: NavLink normal (end para coincidencia exacta)
                      <NavLink
                        to={item.url ?? "/"}
                        end
                        className={({ isActive }) =>
                          `cursor-pointer flex w-full items-center justify-between rounded-xl px-3 py-4 text-sm font-medium ${
                            isActive
                              ? "menu-active font-bold"
                              : "hover:bg-muted"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                      </NavLink>
                    )}
                    {item.items && expandedItems[item.title] && (
                      <div className=" submenu mt-1 ml-6 space-y-1 border-l pl-3">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.title}
                            href={subItem.url}
                            className="flex hover:bg-neutral-100 items-center justify-between rounded-2xl px-3 py-2 text-sm"
                          >
                            {subItem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="">
          <div className="flex items-center p-4">
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
            <div className="ml-3 font-bold">
              <p>{userData?.username}</p>
              <p className="font-bold">
                {userData?.role
                  ? userData.role.charAt(0).toUpperCase() +
                    userData?.role.slice(1).toLowerCase()
                  : "Sin rol"}
              </p>
            </div>
          </div>
          <div className="seccionMenu-inferior">
            <button
              onClick={handleLogOut}
              className="flex justify-between hover:bg-neutral-200 cursor-pointer w-full py-3 px-4 rounded-2xl"
            >
              <LogOut className="mr-2" />
              Cerrar Sesion
            </button>
          </div>
        </div>
      </section>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutMenu;
