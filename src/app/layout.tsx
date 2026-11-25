import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, training } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings. A variable font: one file covers every weight the pages use.
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.motif}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.motif}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.motif}` }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/** Entity data for search and answer engines, built from the content model. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      email: site.email,
      jobTitle: "AI enablement lead and Technical Program Manager; former Chief of Staff, PMB Companies; Co-founder, Mythener; Co-founder, Zenblis",
      description: site.description,
      address: { "@type": "PostalAddress", addressLocality: "Dallas–Fort Worth", addressRegion: "TX", addressCountry: "US" },
      sameAs: [
        site.linkedin,
        "https://dwbelfield.com",
        "https://www.amazon.com/stores/Derek-Belfield/author/B07YVNVGZK",
        "https://www.goodreads.com/author/show/19622809.Derek_Belfield",
        "https://mythener.com",
        "https://zenblis.com",
      ],
      hasCredential: training.map((t) => ({
        "@type": "EducationalOccupationalCredential",
        name: t.name,
        credentialCategory: t.kind,
        url: t.href,
        recognizedBy: { "@type": "Organization", name: t.issuer },
      })),
      knowsAbout: [
        "AI enablement",
        "AI adoption and team training",
        "AI agent workflows",
        "Technical program management",
        "Operations management",
        "Payments compliance (PCI, KYC/AML, NACHA)",
        "Lean Six Sigma",
        "Aviation logistics",
        "Safety and compliance programs (OSHA)",
        "AI-first operating workflows",
        "AI system design (embedding retrieval, LLMs, decision models)",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        {/* Points agents at the plain-text version of the site; React hoists it into the head. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title={`${site.name}: plain-text summary for AI agents`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
