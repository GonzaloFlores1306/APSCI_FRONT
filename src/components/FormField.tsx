import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const FormField = ({ field, value, onChange, error }: any) => {
  const { name, label, type, options } = field;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={name}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className={error ? "border-red-300" : ""}
        />
      ) : type === "select" ? (
        <select
          id={name}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className={`h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ${
            error ? "border-red-300" : ""
          }`}
        >
          <option value="">Seleccione una opción</option>
          {options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={name}
          type={type}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className={`h-9 ${error ? "border-red-300" : ""}`}
        />
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};
