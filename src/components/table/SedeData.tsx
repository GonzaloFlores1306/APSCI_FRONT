import { Filter, Plus, Search, X } from "lucide-react";
import type {
  DataType,
  DynamicTableProps,
  FilterRule,
  FilterState,
} from "@/types/TableTypes";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CardSede from "@/components/cards/CardSede";

export const SedeData = ({
  data = [],
  columns,
  searchable = true,
  filterable = true,
}: DynamicTableProps) => {
  const [appliedTags, setAppliedTags] = useState<string[]>([]);
  const [groupByField, setGroupByField] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    logicOperator: "AND",
    rules: [],
  });
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    logicOperator: "AND",
    rules: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  //--------------------------------------------------------

  const addFilterRule = () => {
    if (autoDetectedColumns.length === 0) return;

    setFilterState((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          field: autoDetectedColumns[0].key,
          operator: "=",
          value: "",
        },
      ],
    }));
  };

  const autoDetectedColumns = useMemo(() => {
    if (columns) return columns;

    if (data.length === 0) return [];

    // Extraer todas las claves únicas de los datos
    const keys = Array.from(new Set(data.flatMap((item) => Object.keys(item))));

    return keys.map((key) => {
      // Detectar el tipo de datos para esta columna
      const type = detectDataType(
        data.find((item) => item[key] !== undefined)?.[key]
      );

      return {
        key,
        label:
          key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1),
        type,
        sortable: type !== "object" && type !== "unknown",
      };
    });
  }, [data, columns]);

  const removeFilter = (index: number) => {
    const newRules = [...filterState.rules];
    newRules.splice(index, 1);
    const newFilterState = { ...filterState, rules: newRules };
    setFilterState(newFilterState);
    setActiveFilters(newFilterState);

    const newTags = [...appliedTags];
    newTags.splice(index, 1);
    setAppliedTags(newTags);
  };

  function detectDataType(value: any): DataType {
    if (value === null || value === undefined) return "unknown";

    if (Array.isArray(value)) return "array";

    if (value instanceof Date) return "date";

    const type = typeof value;

    if (type === "string") {
      // Intentar detectar si es una fecha
      const datePattern =
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
      if (datePattern.test(value) && !isNaN(Date.parse(value))) {
        return "date";
      }
      return "string";
    }

    if (type === "number") return "number";
    if (type === "boolean") return "boolean";
    if (type === "object") return "object";

    return "unknown";
  }

  const getOperatorsForType = (type: DataType) => {
    switch (type) {
      case "number":
      case "date":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: ">", label: ">" },
          { value: "<", label: "<" },
          { value: ">=", label: ">=" },
          { value: "<=", label: "<=" },
        ];
      case "string":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: "contains", label: "Contiene" },
          { value: "startsWith", label: "Comienza con" },
          { value: "endsWith", label: "Termina con" },
        ];
      case "boolean":
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
        ];
      default:
        return [
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
        ];
    }
  };

  const updateFilterRule = (index: number, field: string, value: any) => {
    const newRules = [...filterState.rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setFilterState({ ...filterState, rules: newRules });
  };

  const applyFilter = () => {
    setActiveFilters(filterState);

    // Extraer tags para mostrar los filtros aplicados
    const tags = filterState.rules.map(
      (rule) => `${rule.field} ${rule.operator} ${rule.value}`
    );
    setAppliedTags(tags);
  };

  const evaluateFilterRule = (value: any, rule: FilterRule, type: DataType) => {
    if (value === null || value === undefined) return false;

    const strValue = String(value).toLowerCase();
    const filterValue = rule.value.toLowerCase();

    switch (rule.operator) {
      case "=":
        if (type === "boolean") {
          return (
            (value === true && filterValue === "true") ||
            (value === false && filterValue === "false")
          );
        }
        return type === "string"
          ? strValue === filterValue
          : value == rule.value;
      case "!=":
        if (type === "boolean") {
          return (
            (value === true && filterValue !== "true") ||
            (value === false && filterValue !== "false")
          );
        }
        return type === "string"
          ? strValue !== filterValue
          : value != rule.value;
      case ">":
        return type === "date"
          ? new Date(value) > new Date(rule.value)
          : Number(value) > Number(rule.value);
      case "<":
        return type === "date"
          ? new Date(value) < new Date(rule.value)
          : Number(value) < Number(rule.value);
      case ">=":
        return type === "date"
          ? new Date(value) >= new Date(rule.value)
          : Number(value) >= Number(rule.value);
      case "<=":
        return type === "date"
          ? new Date(value) <= new Date(rule.value)
          : Number(value) <= Number(rule.value);
      case "contains":
        return strValue.includes(filterValue);
      case "startsWith":
        return strValue.startsWith(filterValue);
      case "endsWith":
        return strValue.endsWith(filterValue);
      default:
        return false;
    }
  };

  const filteredData = useMemo(() => {
    let result = data;

    // Aplicar búsqueda global
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const firstColumnKey = autoDetectedColumns[1]?.key;
      if (firstColumnKey) {
        result = result.filter((row) => {
          const value = row[firstColumnKey];
          if (value !== null && value !== undefined) {
            return String(value).toLowerCase().includes(query);
          }
          return false;
        });
      }
    }

    // Aplicar filtros avanzados
    if (activeFilters.rules.length > 0) {
      result = result.filter((row) => {
        const results = activeFilters.rules.map((rule) => {
          const column = autoDetectedColumns.find(
            (col) => col.key === rule.field
          );
          if (!column) return false;

          const value = row[rule.field];
          const type = column.type || detectDataType(value);

          return evaluateFilterRule(value, rule, type);
        });

        return activeFilters.logicOperator === "AND"
          ? results.every(Boolean)
          : results.some(Boolean);
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, autoDetectedColumns]);

  // Ordenar datos y aplicar agrupación
  const sortedAndGroupedData = useMemo(() => {
    let result = [...filteredData];

    // Aplicar agrupación si está activa
    if (groupByField) {
      const groups: Record<string, any[]> = {};
      result.forEach((item) => {
        const groupValue = item[groupByField];
        const groupKey =
          groupValue === null || groupValue === undefined
            ? "Sin valor"
            : String(groupValue);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
      });
      result = Object.entries(groups).map(([groupKey, items]) => ({
        __isGroupRow: true,
        __groupKey: groupKey,
        __groupField: groupByField,
        __itemCount: items.length,
        __items: items,
      }));
    }

    return result;
  }, [filteredData, groupByField, autoDetectedColumns]);

  const paginatedData = useMemo(() => {
    return sortedAndGroupedData;
  }, [sortedAndGroupedData]);

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="flex justify-between items-start lg:items-center flex-col md:flex-row gap-4 mb-2">
        <div className="flex flex-wrap gap-2 ">
          {filterable && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Filtros avanzados</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4">
                  {/* Selector de operador lógico */}
                  <div className="flex gap-2">
                    <Button
                      variant={
                        filterState.logicOperator === "AND"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          logicOperator: "AND",
                        })
                      }
                    >
                      AND
                    </Button>
                    <Button
                      variant={
                        filterState.logicOperator === "OR"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          logicOperator: "OR",
                        })
                      }
                    >
                      OR
                    </Button>

                    <div className="ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addFilterRule}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Regla
                      </Button>
                    </div>
                  </div>

                  {/* Reglas de filtro */}
                  <div className="space-y-3">
                    {filterState.rules.map((rule, index) => {
                      const column = autoDetectedColumns.find(
                        (col) => col.key === rule.field
                      );
                      const dataType = column?.type || "string";
                      const operators = getOperatorsForType(dataType);

                      return (
                        <div key={index} className="flex items-center gap-2">
                          {/* Selector de campo */}
                          <Select
                            value={rule.field}
                            onValueChange={(value) =>
                              updateFilterRule(index, "field", value)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Seleccionar campo" />
                            </SelectTrigger>
                            <SelectContent>
                              {autoDetectedColumns.map((column) => (
                                <SelectItem key={column.key} value={column.key}>
                                  {column.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* Selector de operador */}
                          <Select
                            value={rule.operator}
                            onValueChange={(value) =>
                              updateFilterRule(index, "operator", value)
                            }
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Operador" />
                            </SelectTrigger>
                            <SelectContent>
                              {operators.map((op) => (
                                <SelectItem key={op.value} value={op.value}>
                                  {op.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* Input de valor */}
                          <Input
                            value={rule.value}
                            onChange={(e) =>
                              updateFilterRule(index, "value", e.target.value)
                            }
                            className="flex-1"
                            placeholder="Valor"
                          />

                          {/* Botón para eliminar regla */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newRules = [...filterState.rules];
                              newRules.splice(index, 1);
                              setFilterState({
                                ...filterState,
                                rules: newRules,
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}

                    {filterState.rules.length === 0 && (
                      <div className="text-center text-muted-foreground py-4">
                        No hay reglas de filtro. Haga clic en "Regla" para
                        añadir una.
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterState({
                        logicOperator: "AND",
                        rules: [],
                      });
                      setActiveFilters({
                        logicOperator: "AND",
                        rules: [],
                      });
                      setAppliedTags([]);
                    }}
                  >
                    Limpiar
                  </Button>
                  <Button onClick={applyFilter}>Aplicar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {searchable && (
          <div className="relative max-w-[500px] w-full flex max-h-[40px] items-center">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <div className="flex items-center flex-wrap gap-2 pl-10 pr-3 py-2 bg-background border rounded-lg w-full">
              <input
                type="search"
                placeholder="Buscar..."
                className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Botones de filtro y agrupación */}
      <div className="flex items-center justify-between mb-0">
        {(appliedTags.length > 0 || groupByField) && (
          <Button
            variant={"ghost"}
            className="mt-2  mb-2"
            onClick={() => {
              setFilterState({ logicOperator: "AND", rules: [] });
              setActiveFilters({ logicOperator: "AND", rules: [] });
              setAppliedTags([]);
              setGroupByField(null);
              setSearchQuery("");
            }}
          >
            Limpiar todos los filtros
          </Button>
        )}
        {appliedTags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <Filter className="h-3 w-3" />
            {tag}
            <button
              className="cursor-pointer"
              onClick={() => removeFilter(index)}
            >
              <X className="h-3 w-3" />
            </button>{" "}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedData.length === 0 ? (
          <div>
            <span className="text-center py-8 text-muted-foreground">
              No hay sedes disponibles
            </span>
          </div>
        ) : (
          paginatedData.map((row, rowIndex) => (
            <CardSede
              data={row}
              key={rowIndex}
              nombre={row.name}
              desc={row.desc}
            />
          ))
        )}
      </div>
    </>
  );
};
