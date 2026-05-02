import { Geist, Geist_Mono, Inter } from "next/font/google"
//@ts-ignore
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { APIProvider } from "@/Providers"
import { NotificationContextProvider } from "@/context/contextProvider"

//const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata = {
  title: "Affiliate Shop",
  description: "Find the best deals from Jumia, Amazon, Alibaba and more.",
  keywords: ["affiliate", "deals", "shopping", "jumia", "amazon", "alibaba"],
  authors: [{ name: "Affiliate Shop" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://affiliate-shop-client-iyjv.vercel.app",
    title: "Affiliate Shop - Find Best Deals Online",
    description:
      "Discover amazing deals from Jumia, Amazon, Alibaba and more. Shop smart with our affiliate partner platform.",
    images: [
      {
        url: "https://affiliate-shop-client-iyjv.vercel.app/images/affiliate_preview.png",
        width: 1200,
        height: 630,
        alt: "Affiliate Shop - Best Online Deals",
        type: "image/png",
      },
    ],
    siteName: "Affiliate Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate Shop - Find Best Deals Online",
    description: "Discover amazing deals from Jumia, Amazon, Alibaba and more.",
    images: [
      "https://affiliate-shop-client-iyjv.vercel.app/images/affiliate_preview.png",
    ],
    creator: "@affiliateshop",
  },
}

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
        <ThemeProvider>
          <APIProvider>
            <NotificationContextProvider>
              {children}
            </NotificationContextProvider>
          </APIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
