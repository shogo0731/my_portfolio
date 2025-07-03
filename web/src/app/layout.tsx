import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* nextjsではdocumentの存在判定が必要　*/
  if (typeof document !== "undefined") {
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach((anchor: Element) => {
      anchor.addEventListener("click", function (e: Event) {
        e.preventDefault();

        const targetId = anchor.getAttribute("href")?.substring(1);

        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Navbar background on scroll
    window.addEventListener("scroll", function () {
      const nav = document.querySelector("nav");
      if (nav === null) return;

      if (window.scrollY > 50) {
        nav.style.background = "rgba(255, 255, 255, 0.98)";
      } else {
        nav.style.background = "rgba(255, 255, 255, 0.95)";
      }
    });
  }
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>Your Name - Web Developer Portfolio</title>
      </head>
      <body>
        {children}
        <footer>
          <p>&copy; 2025 大井 祥伍. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
