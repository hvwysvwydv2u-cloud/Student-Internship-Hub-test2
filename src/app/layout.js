import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar, Footer } from "@/components/react-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrainLink | ترين لينك",
  description: "ترين لينك | تعلم. تدرب. اشتغل",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <div className="min-h-screen bg-background flex flex-col">
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
