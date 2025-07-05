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
    title: "mentaAI",
    description:
      "AIを活用したメンタルヘルス支援アプリ。睡眠時間や体調を管理し、それらの情報を基にAIモデルと会話できる機能がある。",
    tech: ["Dart", "Flutter", "Go", "Firebase", "GCP"],
    image: "/project/mentaAI.png",
    liveDemo: "https://health-care-app-3e333.web.app/",
    github: "https://github.com/health-Care-App/health_care_app",
  },
];
