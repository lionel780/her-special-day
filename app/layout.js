import Experience from "@/components/Experience";
import "./globals.css";

export const metadata = {
  title: "Her Special Day — Pour Marie",
  description:
    "Une expérience d'anniversaire intime, élégante et interactive, préparée spécialement pour Marie Eyenga.",
  applicationName: "Her Special Day",
  authors: [{ name: "Her Special Day" }],
  robots: {
    index: false,
    follow: false
  }
};

export const viewport = {
  themeColor: "#FBF4EC",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
