"use client";

import Link from "next/link";
import Image from "next/image";
import ElementFadeIn from "./components/ElementFadeIn";
import { useState } from "react";
import { navs, about, skills, projects } from "./const";
import { useElementBoundaryObserver } from "./customHooks/useElementBoundaryObserver";

// ナビゲーションのリンククリック時のスムーズスクロール
const handleNavClick = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ref: React.RefObject<HTMLDivElement | null>
) => {
  event.preventDefault();
  if (ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const handleSeparateTabOpen = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  href: string
) => {
  event.preventDefault();
  window.open(href, "_blank");
};

export default function Home() {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const mobileWidth = 768;
  const fadeInRootMargin = "0px 0px -50px 0px";
  const fadeInThresholdValue = 0.2;

  const handleHamburgerClick = () => {
    if (window.innerWidth <= mobileWidth) {
      setHamburgerActive(!hamburgerActive);
    }
  };

  // ビューポートの高さの25%を計算
  let quarterHeight;
  if (typeof window !== "undefined") {
    quarterHeight = window.innerHeight * 0.25;
  }

  // Intersection ObserverのrootMarginを設定
  const rootMargin = `-${quarterHeight}px 0px -${quarterHeight}px 0px`;
  const thresholdValue = 0;
  const [homeRef, homeBoundary] = useElementBoundaryObserver(
    rootMargin,
    thresholdValue
  );
  const [aboutRef, aboutBoundary] = useElementBoundaryObserver(
    rootMargin,
    thresholdValue
  );
  const [skillRef, skillBoundary] = useElementBoundaryObserver(
    rootMargin,
    thresholdValue
  );
  const [projectRef, projectBoundary] = useElementBoundaryObserver(
    rootMargin,
    thresholdValue
  );
  const boundaries = [
    homeBoundary,
    aboutBoundary,
    skillBoundary,
    projectBoundary,
  ];
  const refs = [homeRef, aboutRef, skillRef, projectRef];

  return (
    <div>
      <nav>
        <div className="nav-container">
          <ul className={hamburgerActive ? "nav-menu active" : "nav-menu"}>
            {navs.map((nav, index) => (
              <li key={index}>
                <Link
                  className={
                    boundaries[index] === "topIn" ||
                    boundaries[index] === "bottomIn"
                      ? "active"
                      : ""
                  }
                  href={nav.href}
                  onClick={(event) => {
                    handleNavClick(event, refs[index]);
                    handleHamburgerClick();
                  }}
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={hamburgerActive ? "hamburger active" : "hamburger"}
            onClick={handleHamburgerClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <section id="home" className="hero" ref={homeRef}>
        <div className="hero-content">
          <h1>Shogo Oi</h1>
          <p>Web Developer & Creative Coder</p>
          <Link
            href="#projects"
            className="cta-button"
            onClick={(event) => {
              handleNavClick(event, refs[3]);
            }}
          >
            作品を見る
          </Link>
        </div>
      </section>

      <section
        id="about"
        className="section"
        ref={aboutRef as React.RefObject<HTMLDivElement>}
      >
        <h2>{navs[1].label}</h2>
        <ElementFadeIn
          rootmargin={fadeInRootMargin}
          thresholdValue={fadeInThresholdValue}
          classes="about-content fade-in"
        >
          <div className="about-text">
            <p>{about.description}</p>
          </div>
          <div className="about-image">
            <span>{about.image}</span>
          </div>
        </ElementFadeIn>
      </section>

      <section
        id="skills"
        className="section"
        ref={skillRef as React.RefObject<HTMLDivElement>}
      >
        <h2>{navs[2].label}</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <ElementFadeIn
              rootmargin={fadeInRootMargin}
              thresholdValue={fadeInThresholdValue}
              classes="skill-card fade-in"
              key={index}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </ElementFadeIn>
          ))}
        </div>
      </section>

      <section
        id="projects"
        className="section"
        ref={projectRef as React.RefObject<HTMLDivElement>}
      >
        <h2>{navs[3].label}</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ElementFadeIn
              rootmargin={fadeInRootMargin}
              thresholdValue={fadeInThresholdValue}
              classes="project-card fade-in"
              key={index}
            >
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100%"
                  style={{ width: "100%", height: "auto" }}
                  unoptimized={true}
                />
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
                  <a
                    href={project.liveDemo}
                    className="project-link"
                    onClick={(event) => {
                      handleSeparateTabOpen(event, project.liveDemo);
                    }}
                  >
                    ライブデモ →
                  </a>
                  <a
                    href={project.github}
                    className="project-link"
                    onClick={(event) => {
                      handleSeparateTabOpen(event, project.github);
                    }}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </ElementFadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
