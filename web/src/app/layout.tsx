import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>Oi Shogo - Web Developer Portfolio</title>
      </head>
      <body>
        {children}
        <footer>
          <p>&copy; 2025 Oi Shogo. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
