import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Café Brachileiro — Cold Brew Delivery",
  description:
    "Cold Brew Coffee entregue na sua porta. Café especial gelado, feito com grãos selecionados do Brasil. Peça agora e receba em minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
