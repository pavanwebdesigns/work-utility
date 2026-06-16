"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type FavoritesDrawerContextValue = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setOpen: (open: boolean) => void;
};

const FavoritesDrawerContext = createContext<FavoritesDrawerContextValue>({
  open: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  setOpen: () => {},
});

export function FavoritesDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    <FavoritesDrawerContext.Provider
      value={{ open, openDrawer, closeDrawer, setOpen }}
    >
      {children}
    </FavoritesDrawerContext.Provider>
  );
}

export function useFavoritesDrawer() {
  return useContext(FavoritesDrawerContext);
}
