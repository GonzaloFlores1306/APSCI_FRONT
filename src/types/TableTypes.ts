export type DataType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "array"
  | "object"
  | "unknown";

export interface ColumnConfig {
  key: string;
  label: string;
  type?: DataType;
  format?: (value: any) => string;
  sortable?: boolean;
}

interface SearchConfig {
  fields: Array<{
    key: string;
    label: string;
  }>;
  defaultField?: string;
  placeholder?: string;
  onSearch?: (searchTerm: string, searchField: string) => void; // Callback para búsqueda en backend
}

export interface DynamicTableProps {
  data: Record<string, any>[];
  columns?: ColumnConfig[];
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  role: "Asistente" | "Conciliador" | "Admin";
  renderActions?: (row: any) => React.ReactNode;
  searchConfig: SearchConfig;
}

export interface FilterRule {
  field: string;
  operator: string;
  value: string;
}

export interface FilterState {
  logicOperator: "AND" | "OR";
  rules: FilterRule[];
}
