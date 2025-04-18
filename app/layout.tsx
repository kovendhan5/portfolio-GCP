import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kovendhan P - Cloud & DevOps Engineer | Full Stack Developer",
  description:
    "Personal portfolio of Kovendhan P, a Cloud & DevOps Engineer and Full Stack Developer specializing in web development and cloud technologies.",
  keywords: ["Kovendhan", "Cloud Engineer", "DevOps", "Full Stack Developer", "Portfolio", "Web Development"],
  authors: [{ name: "Kovendhan P" }],
  creator: "Kovendhan P",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}