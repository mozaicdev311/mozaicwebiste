import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SmoothScrolling } from "@/components/smooth-scrolling"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MOZAIC - Complete Digital Systems. One Team.",
  description:
    "Creative, development, and infrastructure—integrated. Full-stack digital studio for brands ready to move faster.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
