export const navs = [
  { label: "ホーム", href: "#home" },
  { label: "自己紹介", href: "#about" },
  { label: "スキル", href: "#skills" },
  { label: "プロジェクト", href: "#projects" },
];

export const about = {
  description: `初めまして、大井祥伍です。
私はWeb技術として、フロントエンドとバックエンドの両方に興味を持っています。
特に、ReactやNext.jsを使用したフロントエンド開発と、Node.jsやDjangoを使用したバックエンド開発経験があります。
最近はAI技術にも興味を持ち、pythonを使ったAIモデル構築をしたり、Web開発にAIを取り入れてたりしています。`,
  image: "profile.jpg",
};

export const skills = [
  {
    title: "フロントエンド",
    description:
      "HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Dart, Flutter",
    icon: "🌐",
  },
  {
    title: "バックエンド",
    description:
      "Node.js, Python, Django, Go, MySQL, PostgreSQL, SQLite, MongoDB",
    icon: "⚙️",
  },
  {
    title: "デザイン",
    description: "Figma, Tailwind CSS, Bootstrap",
    icon: "🎨",
  },
  {
    title: "クラウド",
    description: "AWS, GCP, Firebase, Vercel",
    icon: "☁️",
  },
  {
    title: "ツール",
    description: "Git, Docker",
    icon: "🔧",
  },
];

export const projects = [
    {
    title: "my-portfolio",
    description: "このポートフォリオサイト自体です。",
    tech: ["TypeScript", "React", "Next.js", "Git", "Docker", "Vercel"],
    image: "/image/my-portfolio.png",
    liveDemo: "https://my-portfolio-nzmp.vercel.app/",
    github: "https://github.com/shogo0731/my_portfolio"
  },
  {
    title: "mentaAI",
    description:
      "AIを活用したメンタルヘルス支援アプリ。睡眠時間や体調を管理し、それらの情報を基にAIモデルと会話できる機能がある。",
    tech: ["Dart", "Flutter", "Go", "Firebase", "GCP", "Git", "Docker"],
    image: "/image/mentaAI.png",
    liveDemo: "https://health-care-app-3e333.web.app/",
    github: "https://github.com/health-Care-App/health_care_app",
  },
  {
    title: "Beatlink",
    description:
      "音楽とSNSを組み合わせたプラットフォーム。ユーザーは音楽を共有し、他のユーザーと交流できる。",
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS","Git", "Docker", "Vercel", "Convex"],
    image: "/image/Beatlink.png",
    liveDemo: "https://deployed-beetlink.vercel.app",
    github: "https://github.com/UtakataKyosui/DeployedBeatlink"
  },
  {
    title: "コエレシピ",
    description:"音声対話でレシピのガイドをしてくれるWebアプリケーション。音声でレシピ手順を案内してくれる。",
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS","Git", "Docker", "Vercel"],
    image: "/image/coe-recipe.png",
    liveDemo: "https://hands-free-cooking.vercel.app/home",
    github: "https://github.com/2024-vol11-18/hands-free-cooking"
  },
];
