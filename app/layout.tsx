import { Geist, Geist_Mono,Inter } from "next/font/google"
//@ts-ignore
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

//const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const geistSans = Geist({
  variable:"--font-geist-sans",
  subsets:["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geistMono.variable, geistSans.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
