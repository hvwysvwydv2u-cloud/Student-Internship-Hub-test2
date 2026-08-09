import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { NavBar, Footer, BottomNav } from "@/components/react-components";
import { ThemeProvider } from "@/lib/theme-provider";
import { ToastProvider } from "@/lib/toast-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "TrainLink | ترين لينك — تدريب صناعي للطلاب",
    template: "%s | TrainLink",
  },
  description:
    "ترين لينك — منصة تربط الطلاب بالتدريب الصناعي في مصر. ابحث عن فرص تدريب، تعرّف على المصانع، وابحث عن سكن طلابي.",
  keywords: ["تدريب صناعي", "طلاب", "مصانع", "مصر", "سكن طلابي", "فرص تدريب"],
  authors: [{ name: "TrainLink" }],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "TrainLink | ترين لينك",
    title: "TrainLink | ترين لينك — تدريب صناعي للطلاب",
    description:
      "منصة تربط الطلاب بالتدريب الصناعي في مصر. ابحث عن فرص تدريب، تعرّف على المصانع، وابحث عن سكن طلابي.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrainLink | ترين لينك",
    description:
      "منصة تربط الطلاب بالتدريب الصناعي في مصر.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geist.variable} ${geistMono.variable} ${notoArabic.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col antialiased font-[family-name:var(--font-arabic)]">
        <ThemeProvider>
          <ToastProvider>
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
