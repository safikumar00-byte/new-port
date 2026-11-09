export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "graphic-design",
    title: "Graphic Design & Visual Communication",
    description: "Visual systems and communication for brands, campaigns, products and business audiences.",
    skills: [
      "Graphic design", "Visual design", "Brand identity", "Logo systems", "Corporate identity",
      "Art direction", "Marketing collateral", "Social media creatives", "Campaign design",
      "Typography", "Composition", "Color theory", "Visual hierarchy", "Brochure design",
      "Document design", "Product documentation", "Packaging design", "Label design",
      "Print-ready artwork", "Infographics", "Data visualization", "Visual storytelling"
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    description: "Research, structure, interaction and interface design for web and mobile products.",
    skills: [
      "UX strategy", "User research", "Competitor analysis", "Usability testing",
      "Information architecture", "Design thinking", "User flows", "Journey mapping",
      "Wireframing", "High-fidelity design", "Interactive prototyping", "Interaction design",
      "Behavioral UX patterns", "Onboarding flows", "Conversion flows", "Gamification",
      "Design systems", "Component libraries", "Responsive interface design",
      "Accessibility awareness", "WCAG awareness", "Cross-device validation", "Developer handoff"
    ]
  },
  {
    id: "frontend",
    title: "Frontend & Application Development",
    description: "Design-aware implementation for responsive websites and mobile applications.",
    skills: [
      "HTML5", "CSS3", "JavaScript ES6+", "TypeScript", "React.js", "Next.js",
      "React Native", "Expo", "jQuery", "Tailwind CSS", "NativeWind",
      "shadcn-style components", "Bootstrap", "Framer Motion", "GSAP"
    ]
  },
  {
    id: "backend",
    title: "Backend, Data & Integrations",
    description: "Application integration, APIs, data services and implementation support.",
    skills: [
      "Node.js", "Express.js", "PHP", "CodeIgniter", "REST APIs", "Postman",
      "Supabase SQL", "Supabase Edge Functions", "Supabase Realtime",
      "Firebase Authentication", "Firebase Firestore", "Firebase Cloud Messaging",
      "MongoDB", "MySQL", "Redis", "Middleware integration", "API debugging",
      "API validation", "Error handling", "Caching strategies", "Offline-first capabilities",
      "Deep linking", "Push notifications", "Backend/API integration"
    ]
  },
  {
    id: "design-media-tools",
    title: "Design, Media & Productivity Tools",
    description: "Design, prototyping, visual production, presentation and productivity software.",
    skills: [
      "Figma", "FigJam", "ProtoPie", "Framer", "Balsamiq", "Adobe XD", "Canva",
      "LottieFiles", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign",
      "Adobe Acrobat Pro", "Adobe After Effects", "Adobe Premiere Pro",
      "DaVinci Resolve", "CapCut", "Filmora", "Microsoft PowerPoint",
      "Microsoft Word", "Microsoft Excel", "Microsoft Office", "Google Slides",
      "Keynote", "SharePoint", "Notion"
    ]
  },
  {
    id: "ai-workflows",
    title: "AI-Assisted Design & Development",
    description: "AI-supported creative exploration, prototyping, coding and workflow acceleration.",
    skills: [
      "Replit", "Lovable", "Bolt", "GitHub Copilot", "Windsurf", "Cursor", "Trae",
      "Midjourney", "Claude Design", "MCP integrations", "AI-assisted design",
      "AI-assisted frontend development", "Context engineering", "Agentic AI workflows",
      "Prompt engineering", "Specification-driven development", "AI-supported prototyping"
    ]
  },
  {
    id: "delivery",
    title: "Infrastructure, Delivery & Collaboration",
    description: "Version control, deployment collaboration, troubleshooting and delivery practices.",
    skills: [
      "Git", "GitHub", "Cloudflare", "DigitalOcean", "Apache2", "CI/CD collaboration",
      "Deployment collaboration", "Environment troubleshooting", "Root cause analysis",
      "Requirements analysis", "Bug tracking", "SDLC", "Agile methodology",
      "Technical documentation in Markdown"
    ]
  },
  {
    id: "presentation",
    title: "Presentation & Information Design",
    description: "Executive-ready communication from complex technical and business information.",
    skills: [
      "Master deck architecture", "Corporate pitch decks", "Executive summaries",
      "C-suite presentations", "Investor presentations", "Product presentations",
      "Information hierarchy", "Complex data visualization", "Executive formatting",
      "Visual storytelling", "Brand guideline consistency", "Technical information design"
    ]
  }
];

/**
 * Compact tool strip for the portfolio's existing toolkit component.
 * Keep category values aligned with the existing UI's design/code/ship filters.
 */
export interface ToolItem {
  id: string;
  name: string;
  category: "design" | "code" | "ship";
  subCategory?: string;
  iconType: "symbol" | "iconUrl";
  iconValue: string;
  color?: string;
}

export const toolkitItems: ToolItem[] = [
  { id: "figma", name: "Figma", category: "design", iconType: "symbol", iconValue: "#i-frame" },
  { id: "photoshop", name: "Photoshop", category: "design", iconType: "symbol", iconValue: "#i-image" },
  { id: "illustrator", name: "Illustrator", category: "design", iconType: "symbol", iconValue: "#i-pen-tool" },
  { id: "indesign", name: "InDesign", category: "design", iconType: "symbol", iconValue: "#i-layout" },
  { id: "after-effects", name: "After Effects", category: "design", iconType: "symbol", iconValue: "#i-film" },
  { id: "premiere-pro", name: "Premiere Pro", category: "design", iconType: "symbol", iconValue: "#i-video" },
  { id: "react", name: "React", category: "code", iconType: "symbol", iconValue: "#i-code" },
  { id: "nextjs", name: "Next.js", category: "code", iconType: "symbol", iconValue: "#i-code" },
  { id: "typescript", name: "TypeScript", category: "code", iconType: "symbol", iconValue: "#i-code" },
  { id: "react-native", name: "React Native", category: "code", iconType: "symbol", iconValue: "#i-smartphone" },
  { id: "tailwind", name: "Tailwind CSS", category: "code", iconType: "symbol", iconValue: "#i-layers" },
  { id: "node", name: "Node.js", category: "code", iconType: "symbol", iconValue: "#i-server" },
  { id: "supabase", name: "Supabase", category: "ship", iconType: "symbol", iconValue: "#i-database" },
  { id: "firebase", name: "Firebase", category: "ship", iconType: "symbol", iconValue: "#i-database" },
  { id: "github", name: "GitHub", category: "ship", iconType: "symbol", iconValue: "#i-github" },
  { id: "digitalocean", name: "DigitalOcean", category: "ship", iconType: "symbol", iconValue: "#i-cloud" },
  { id: "cloudflare", name: "Cloudflare", category: "ship", iconType: "symbol", iconValue: "#i-cloud" },
  { id: "powerpoint", name: "PowerPoint", category: "design", iconType: "symbol", iconValue: "#i-presentation" }
];
