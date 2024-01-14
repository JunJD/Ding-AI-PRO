import "@/lib/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/lib/header/Header"

export const metadata = {
  title: "DING AI PRO",
  description: "DING AI PRO ,ai工具",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <ThemeProvider>
          <div className="mx-auto pt-4 px-4">
            <header>
              <div className="flex items-center justify-between">
                {/* <ModeToggle /> */}
                <Header/>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
