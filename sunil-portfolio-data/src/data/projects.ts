/**
 * Project cards for the existing LiveTools-style grid.
 * Keep categories within the original component's expected union where possible.
 * The project gallery includes both shipped/known engagements and case-study work;
 * status labels intentionally avoid claiming an unverified public launch.
 */
export interface LiveTool {
  id: string;
  title: string;
  category: "web" | "ai" | "framer";
  subCategory?: string;
  statusBadge: string;
  pillRight: string;
  yearOrDomain: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export const liveTools: LiveTool[] = [
  {
    id: "karyotica-labs",
    title: "Karyotica Labs",
    category: "web",
    statusBadge: "Case study",
    pillRight: "Brand + website",
    yearOrDomain: "2025",
    description: "Brand identity, corporate website design and frontend implementation, CMS/admin experience, SEO, product brochures and packaging for an agricultural biotechnology company.",
    image: "/images/projects/karyotica-cover.jpg",
    tags: ["Brand identity", "Next.js", "React", "CMS"],
    link: "https://karyotica.ca/"
  },
  {
    id: "visionicx",
    title: "Visionicx",
    category: "web",
    statusBadge: "Project",
    pillRight: "Enterprise mobile app",
    yearOrDomain: "2025",
    description: "Mobile UI/UX and frontend development. The supplied master resume records 40+ screens, 200+ REST API integrations and a four-week delivery timeline.",
    image: "/images/projects/visionicx-cover.jpg",
    tags: ["React Native", "Expo", "NativeWind"],
    link: ""
  },
  {
    id: "core-volt-matrix",
    title: "Core Volt Matrix",
    category: "web",
    statusBadge: "Project",
    pillRight: "Brand + HRMS",
    yearOrDomain: "2025",
    description: "Corporate identity and enterprise HRMS design/development, including identity assets, employee workflows, Figma prototypes and responsive frontend.",
    image: "/images/projects/core-volt-matrix-cover.jpg",
    tags: ["Figma", "React", "Tailwind CSS"],
    link: ""
  },
  {
    id: "intexm-fintech",
    title: "Fintech Product Experiences",
    category: "web",
    statusBadge: "Selected work",
    pillRight: "Intexm Media",
    yearOrDomain: "2023–2025",
    description: "Product UI/UX, landing pages, responsive frontend, gamified engagement, campaign creatives and motion/video work across nine fintech and digital product brands.",
    image: "/images/projects/intexm-fintech-cover.jpg",
    tags: ["UI/UX", "Fintech", "Frontend", "Motion"],
    link: ""
  },
  {
    id: "tekwissen",
    title: "TekWissen & AdvantEdge",
    category: "web",
    statusBadge: "Current role",
    pillRight: "Corporate communication",
    yearOrDomain: "2025–Present",
    description: "Corporate and executive presentation design, visual storytelling, social campaigns and motion content for technical and business communication.",
    image: "/images/projects/tekwissen-communication-cover.jpg",
    tags: ["Graphic design", "PowerPoint", "Visual storytelling"],
    link: ""
  },
  {
    id: "trade-signals",
    title: "Cross-Device Trade Signal App",
    category: "web",
    statusBadge: "Status to confirm",
    pillRight: "Application",
    yearOrDomain: "Unconfirmed",
    description: "Resume-recorded application concept spanning trading signals, notifications, P&L calculations and cross-device workflows.",
    image: "/images/projects/trade-signals-cover.jpg",
    tags: ["React Native", "Expo", "Firebase", "Supabase"],
    link: ""
  }
];
