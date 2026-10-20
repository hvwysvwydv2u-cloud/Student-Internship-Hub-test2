import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { NavBar, Footer, BottomNav } from "@/components/react-components";
import { SettingsPanel } from "@/components/settings-panel";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('trainlink-theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  var accent = localStorage.getItem('trainlink-accent') || 'green';
                  var colors = {
                    green: { c: '#22c55e', h: '#16a34a', m: '#15803d', s: 'rgba(34,197,94,0.14)', g: 'rgba(34,197,94,0.28)', f: '#052e16', bg: '#0a2117', b: 'rgba(34,197,94,0.25)' },
                    blue: { c: '#3b82f6', h: '#2563eb', m: '#1d4ed8', s: 'rgba(59,130,246,0.14)', g: 'rgba(59,130,246,0.28)', f: '#ffffff', bg: '#0c1e33', b: 'rgba(59,130,246,0.25)' },
                    purple: { c: '#a855f7', h: '#9333ea', m: '#7e22ce', s: 'rgba(168,85,247,0.14)', g: 'rgba(168,85,247,0.28)', f: '#ffffff', bg: '#1e1133', b: 'rgba(168,85,247,0.25)' },
                    orange: { c: '#f97316', h: '#ea580c', m: '#c2410c', s: 'rgba(249,115,22,0.14)', g: 'rgba(249,115,22,0.28)', f: '#ffffff', bg: '#291407', b: 'rgba(249,115,22,0.25)' },
                    red: { c: '#ef4444', h: '#dc2626', m: '#b91c1c', s: 'rgba(239,68,68,0.14)', g: 'rgba(239,68,68,0.28)', f: '#ffffff', bg: '#290b10', b: 'rgba(239,68,68,0.25)' }
                  };
                  var p = colors[accent] || colors.green;
                  var r = document.documentElement;
                  r.style.setProperty('--primary', p.c);
                  r.style.setProperty('--primary-hover', p.h);
                  r.style.setProperty('--primary-muted', p.m);
                  r.style.setProperty('--primary-subtle', p.s);
                  r.style.setProperty('--primary-glow', p.g);
                  r.style.setProperty('--primary-foreground', p.f);
                  r.style.setProperty('--hero-accent-bg', p.bg);
                  r.style.setProperty('--hero-accent-border', p.b);
                  r.setAttribute('data-accent', accent);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col antialiased font-[family-name:var(--font-arabic)]">
        <ThemeProvider>
          <ToastProvider>
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
            <SettingsPanel />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
