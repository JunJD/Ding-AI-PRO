"use client"

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { Toaster } from "sonner";
export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => { },
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} />;
};

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

      <ToasterProvider />
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
