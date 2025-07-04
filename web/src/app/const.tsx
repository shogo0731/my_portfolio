export const navs = [
  { label: "ホーム", href: "#home" },
  { label: "自己紹介", href: "#about" },
  { label: "スキル", href: "#skills" },
  { label: "プロジェクト", href: "#projects" },
];

export const about = {
  description: `こんにちは！私は情熱的なWeb開発者です。\n
    モダンなWebテクノロジーを使用して、ユーザーフレンドリーで視覚的に魅力的なWebサイトやアプリケーションを作成しています。
    フロントエンドからバックエンドまで幅広い技術スタックに精通しており、常に新しい技術の学習と実装に取り組んでいます。\n
    クリエイティブな問題解決とコードの品質にこだわり、ユーザーエクスペリエンスを最優先に考えた開発を心がけています。`,
  image: "profile.jpg",
};

export const skills = [
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
  {
    title: "ツール",
    description: "Git, Docker, AWS, Webpack, Sass",
    icon: "🔧",
  },
];

export const projects = [
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
