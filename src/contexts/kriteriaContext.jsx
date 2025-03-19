// src/context/KriteriaContext.js
import { createContext, useContext } from "react";
import { useKriteria } from "@/hooks/useKriteria";

const KriteriaContext = createContext();

export const useKriteriaContext = () => useContext(KriteriaContext);

export const KriteriaProvider = ({ children }) => {
  const kriteriaState = useKriteria(); // Menggunakan hooks yang sudah dibuat

  return (
    <KriteriaContext.Provider value={kriteriaState}>
      {children}
    </KriteriaContext.Provider>
  );
};
