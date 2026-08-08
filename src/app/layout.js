import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar, Footer } from "@/components/react-components";

const geist = Geist({
  subsets: ["latin", "arabic"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "TrainLink | ترين لينك",
  description: "ترين لينك | تعلم. تدرب. اشتغل - منصة تربط الطلاب بالتدريب الصناعي في مصر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background flex flex-col antialiased">
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
