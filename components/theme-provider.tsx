"use client"

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import useLocalStorage from "@/lib/hooks/use-local-storage";

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => { },
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  const [font, setFont] = useLocalStorage<string>("tiptap__font", "Default");

  return (
    <NextThemesProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: "dark-theme",
      }} defaultTheme="system"
    >
      <AppContext.Provider
        value={{
          font,
          setFont,
        }}
      >
        {children}
      </AppContext.Provider>
    </NextThemesProvider>
  )
}
