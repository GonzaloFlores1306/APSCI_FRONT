import { createContext, useContext } from "react";

interface ReportContextType {}

const ReportContext = createContext<ReportContextType | null>(null);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const value = {};

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === null) {
    throw new Error("useReport must be used within an ReportProvider");
  }
  return context;
}
