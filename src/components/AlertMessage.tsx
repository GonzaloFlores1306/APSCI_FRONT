import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Bug, CheckCheckIcon } from "lucide-react";

interface prop {
  type?: string;
  action: "edit" | "add" | "delete" | "state" | "error";
  message: string;
}

export const AlertMessage = ({ type, message, action }: prop) => {
  const classType = () => {
    if (action == "add")
      return "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400";
    if (action == "state" || action == "delete" || action == "edit")
      return "bg-blue-200 text-blue-600 dark:bg-blue-400 dark:text-blue-400";
    if (action == "error")
      return "border-red-600 text-red-600 dark:border-red-400 dark:text-red-400";
  };

  const textType = () => {
    if (action == "add") return "text-green-600/80 dark:text-green-400/80";
    if (action == "state" || action == "delete" || action == "edit")
      return "text-blue-600/80 dark:text-blue-400/80";
    if (action == "error") return "text-red-600/80 dark:text-red-400/80";
  };

  return (
    <>
      <Alert className={`${classType()}`}>
        {type == "error" ? <Bug /> : <CheckCheckIcon />}
        <AlertTitle>
          {type == "error"
            ? "Hubo un error al realizar la accion"
            : "Accion realizada Correctamente"}
        </AlertTitle>
        <AlertDescription className={textType()}>{message}</AlertDescription>
      </Alert>
    </>
  );
};
