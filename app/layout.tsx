import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://scaffold-site.vercel.app";

export const metadata: Metadata = {
  title: "PhysiScaffold | Learn Physics Problem-Solving, Not Just Answers",
  description:
    "A Socratic physics tutor for JEE & NEET. Get guided hints, not solutions. Track your mistakes. Build real problem-solving skills with 20+ intelligent features.",
  keywords: [
    "JEE physics",
    "NEET physics",
    "physics problem solving",
    "IIT JEE preparation",
    "physics tutor",
    "Socratic learning",
    "Irodov solutions",
    "HC Verma",
    "physics hints",
    "learn physics online"
  ],
  authors: [{ name: "PhysiScaffold" }],
  creator: "PhysiScaffold",
  publisher: "PhysiScaffold",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "PhysiScaffold",
    title: "PhysiScaffold | Learn Physics Problem-Solving, Not Just Answers",
    description:
      "A Socratic physics tutor for JEE & NEET. Get guided hints, not solutions. Track your mistakes. Build real problem-solving skills.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "PhysiScaffold - Socratic Physics Engine"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PhysiScaffold | Learn Physics Problem-Solving",
    description:
      "A Socratic physics tutor for JEE & NEET. Guided hints, mistake tracking, and 20+ intelligent features.",
    images: [`${siteUrl}/og-image.svg`]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ]
  },
  manifest: "/manifest.json",
  metadataBase: new URL(siteUrl)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#030712" />
      </head>
      <body>{children}</body>
    </html>
  );
}
