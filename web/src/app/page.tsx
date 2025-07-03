"use client";

import Link from "next/link";
import NextIntersectionObserver from "./components/ui/NextIntersectionObserver";

// ナビゲーションのリンククリック時のスムーズスクロール
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href")?.substring(1);

  if (!targetId) return;
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export default function Home() {
  if (typeof window !== "undefined") {
    
    // 現在のセクションのナビゲーションリンクを強調
    window.addEventListener("scroll", function () {
      const nav = document.querySelector("nav");
      if (!nav) return;

      if (window.scrollY > 50) {
        nav.style.background = "rgba(255, 255, 255, 0.98)";
        nav.style.boxShadow = "0 8px 32px rgba(14, 165, 233, 0.15)";
      } else {
        nav.style.background = "rgba(255, 255, 255, 0.95)";
        nav.style.boxShadow = "0 8px 32px rgba(14, 165, 233, 0.1)";
      }
    });

    // Active nav link highlight
    function updateActiveNavLink() {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll("nav a");

      let currentSection: string | null = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", updateActiveNavLink);
    window.addEventListener("load", updateActiveNavLink);
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="#home" onClick={handleNavClick}>
              ホーム
            </Link>
          </li>
          <li>
            <Link href="#about" onClick={handleNavClick}>
              自己紹介
            </Link>
          </li>
          <li>
            <Link href="#skills" onClick={handleNavClick}>
              スキル
            </Link>
          </li>
          <li>
            <Link href="#projects" onClick={handleNavClick}>
              プロジェクト
            </Link>
          </li>
        </ul>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Shogo Oi</h1>
          <p>Web Developer & Creative Coder</p>
          <a href="#projects" className="cta-button">
            作品を見る
          </a>
        </div>
      </section>

      <section id="about" className="section">
        <h2>自己紹介</h2>
        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="about-content fade-in"
        >
          <div className="about-text">
            <h3>Hello! 私は情熱的なWeb開発者です。</h3>
            <p>
              モダンなWebテクノロジーを使用して、ユーザーフレンドリーで視覚的に魅力的なWebサイトやアプリケーションを作成しています。フロントエンドからバックエンドまで幅広い技術スタックに精通しており、常に新しい技術の学習と実装に取り組んでいます。
            </p>
            <p>
              クリエイティブな問題解決とコードの品質にこだわり、ユーザーエクスペリエンスを最優先に考えた開発を心がけています。
            </p>
          </div>
          <div className="about-image">
            <span>プロフィール画像</span>
          </div>
        </NextIntersectionObserver>
      </section>

      <section id="skills" className="section">
        <h2>スキル</h2>
        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="skill-card fade-in"
        >
          <div className="skill-icon">🌐</div>
          <h3>フロントエンド</h3>
          <p>HTML5, CSS3, JavaScript, React, Vue.js, TypeScript</p>
        </NextIntersectionObserver>
        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="skill-card fade-in"
        >
          <div className="skill-icon">⚙️</div>
          <h3>バックエンド</h3>
          <p>Node.js, Python, PHP, MySQL, PostgreSQL</p>
        </NextIntersectionObserver>

        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="skill-card fade-in"
        >
          <div className="skill-icon">🎨</div>
          <h3>デザイン</h3>
          <p>UI/UX Design, Figma, Adobe XD, Responsive Design</p>
        </NextIntersectionObserver>
        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="skill-card fade-in"
        >
          <div className="skill-icon">⚙️</div>
          <h3>バックエンド</h3>
          <p>Node.js, Python, PHP, MySQL, PostgreSQL</p>
        </NextIntersectionObserver>
      </section>

      <section id="projects" className="section">
        <h2>プロジェクト</h2>
        <div className="projects-grid">
          <NextIntersectionObserver
            rootmargin="0px 0px -50px 0px"
            thresholdValue={0.1}
            classes="project-card fade-in"
          >
            <div className="project-image">
              <span>Eコマースサイト</span>
            </div>
            <div className="project-content">
              <h3 className="project-title">モダンEコマースプラットフォーム</h3>
              <p className="project-description">
                React.jsとNode.jsを使用したフルスタックのEコマースサイト。決済機能、商品管理、ユーザー管理を実装。
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Stripe</span>
              </div>
              <div className="project-links">
                <a href="#" className="project-link">
                  ライブデモ →
                </a>
                <a href="#" className="project-link">
                  GitHub →
                </a>
              </div>
            </div>
          </NextIntersectionObserver>
        </div>
      </section>
    </div>
  );
}
