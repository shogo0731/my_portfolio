"use client";

import Link from "next/link";
import NextIntersectionObserver from "./components/NextIntersectionObserver";

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

  const navs = [
    { label: "ホーム", href: "#home" },
    { label: "自己紹介", href: "#about" },
    { label: "スキル", href: "#skills" },
    { label: "プロジェクト", href: "#projects" },
  ];

  const about = {
    description: `こんにちは！私は情熱的なWeb開発者です。\n
    モダンなWebテクノロジーを使用して、ユーザーフレンドリーで視覚的に魅力的なWebサイトやアプリケーションを作成しています。
    フロントエンドからバックエンドまで幅広い技術スタックに精通しており、常に新しい技術の学習と実装に取り組んでいます。\n
    クリエイティブな問題解決とコードの品質にこだわり、ユーザーエクスペリエンスを最優先に考えた開発を心がけています。`,
    image: "profile.jpg"
  };

  const skills = [
    {
      title: "フロントエンド",
      description: "HTML5, CSS3, JavaScript, React, Vue.js, TypeScript",
      icon: "🌐",
    },
    {
      title: "バックエンド",
      description: "Node.js, Python, PHP, MySQL, PostgreSQL",
      icon: "⚙️",
    },
    {
      title: "デザイン",
      description: "UI/UX Design, Figma, Adobe XD, Responsive Design",
      icon: "🎨",
    },
  ];

  const projects = [
    {
      title: "モダンEコマースプラットフォーム",
      description:
        "React.jsとNode.jsを使用したフルスタックのEコマースサイト。決済機能、商品管理、ユーザー管理を実装。",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "ecommerce.jpg",
      liveDemo: "#",
      github: "#",
    },
  ];

  return (
    <div>
      <nav>
        <ul>
          {navs.map((nav, index) => (
            <li key={index}>
              <Link href={nav.href} onClick={handleNavClick}>
                {nav.label}
              </Link>
            </li>
          ))}
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
        <h2>{navs[1].label}</h2>
        <NextIntersectionObserver
          rootmargin="0px 0px -50px 0px"
          thresholdValue={0.1}
          classes="about-content fade-in"
        >
          <div className="about-text">
            <p>{about.description}</p>
          </div>
          <div className="about-image">
            <span>{about.image}</span>
          </div>
        </NextIntersectionObserver>
      </section>

      <section id="skills" className="section">
        <h2>{navs[2].label}</h2>
        {skills.map((skill, index) => (
          <NextIntersectionObserver
            rootmargin="0px 0px -50px 0px"
            thresholdValue={0.1}
            classes="skill-card fade-in"
            key={index}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </NextIntersectionObserver>
        ))}
      </section>

      <section id="projects" className="section">
        <h2>{navs[3].label}</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <NextIntersectionObserver
              rootmargin="0px 0px -50px 0px"
              thresholdValue={0.1}
              classes="project-card fade-in"
              key={index}
            >
              <div className="project-image">
                <span>{project.image}</span>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span className="tech-tag" key={techIndex}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveDemo} className="project-link">
                    ライブデモ →
                  </a>
                  <a href={project.github} className="project-link">
                    GitHub →
                  </a>
                </div>
              </div>
            </NextIntersectionObserver>
          ))}
        </div>
      </section>
    </div>
  );
}
