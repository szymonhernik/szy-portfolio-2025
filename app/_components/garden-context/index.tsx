"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { OverlayList } from "../daily-inspirations";

type GardenContextType = {
  isOpen: boolean;
  openGarden: (item?: string | null) => void;
  closeGarden: () => void;
  selectedItemId: string | null;
};

const GardenContext = createContext<GardenContextType | undefined>(undefined);

export function GardenProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const openGarden = (itemId: string | null = null) => {
    setSelectedItemId(itemId);
    setIsOpen(true);
  };

  const closeGarden = useCallback(() => {
    setIsOpen(false);
    setSelectedItemId(null);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      closeGarden();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeGarden]);

  return (
    <GardenContext.Provider value={{ isOpen, selectedItemId, openGarden, closeGarden }}>
      {children}
      {isOpen && <OverlayList onClose={closeGarden} initialSelectedItemId={selectedItemId} />}
    </GardenContext.Provider>
  );
}

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (context === undefined) {
    throw new Error("useGarden must be used within a GardenProvider");
  }
  return context;
};
