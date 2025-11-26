import { createContext, useContext } from "react";

interface RepositoryContextType {}

const RepositoryContext = createContext<RepositoryContextType | null>(null);

export function RepositoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = {};

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  const context = useContext(RepositoryContext);
  if (context === null) {
    throw new Error("useRepository must be used within an RepositoryProvider");
  }
  return context;
}
