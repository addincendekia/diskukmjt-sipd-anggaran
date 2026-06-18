import { createContext, useContext, useState, ReactNode } from "react";

export type PageRoute = "home" | "sub-kegiatan" | "form-pagu-anggaran";

interface AppContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageRoute>("home");

  return (
    <AppContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppRoute() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRoute must be used within AppProvider");
  }
  return context;
}
