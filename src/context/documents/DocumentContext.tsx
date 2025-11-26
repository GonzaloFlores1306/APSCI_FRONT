import { createContext, useContext } from "react";

interface DocumentContextType {}

const DocumentContext = createContext<DocumentContextType | null>(null);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const value = {};

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (context === null) {
    throw new Error("useDocument must be used within an DocumentProvider");
  }
  return context;
}
