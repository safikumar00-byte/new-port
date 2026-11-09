export interface CaseStudy {
  id: string;
  title: string;
  featured?: boolean;
  pillLeft: string;
  pillRight: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  role: string;
  context: string;
  challenge: string;
  approach: string[];
  deliverables: string[];
  technology?: string[];
  attribution: string;
  statusNote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "karyotica-labs",
    title: "Karyotica Labs — Brand, Website & CMS",
    featured: true,
    pillLeft: "Featured",
    pillRight: "Brand + Digital",
    year: "2025",
    description:
      "A corporate brand and digital experience for an agricultural biotechnology business, spanning identity, website design, frontend implementation, product communication and a custom content-management experience.",
    image: "/images/projects/karyotica-cover.jpg",
    tags: ["Brand identity", "Next.js", "CMS", "Product communication"],
    link: "https://karyotica.ca/",
    role: "Design and frontend lead/contributor",
    context: "Independent freelance project during May–December 2025.",
    challenge:
      "Bring the company's brand, product information and corporate website into a coherent digital experience while making key website content manageable through an admin interface.",
    approach: [
      "Developed the visual identity direction and logo/brand refresh.",
      "Designed and implemented the corporate website frontend and responsive layouts.",
      "Structured website sections including Home, About, Products, Product Details, Blog, Contact, Testimonials and Careers.",
      "Contributed to a CMS/admin panel for products, blog posts, images, testimonials, leads, SEO metadata and website sections.",
      "Created product brochures, packaging concepts, labels and technical visual documentation for GrowFast, Thrive and Bountiful.",
      "Prepared selected French-language product-documentation and packaging adaptations."
    ],
    deliverables: [
      "Brand identity and logo work",
      "Corporate website design and frontend",
      "CMS/admin panel experience",
      "Product brochures and technical documentation",
      "Packaging and label design"
    ],
    technology: ["Figma", "Next.js", "React", "Tailwind CSS", "MongoDB", "Express.js", "Node.js", "DigitalOcean", "Apache2", "Git"],
    attribution:
      "Design and frontend work by Sunil. Backend, CI/CD and deployment were collaborative contributions; do not attribute the entire infrastructure implementation solely to Sunil.",
    statusNote: "Use approved screenshots, original brand assets and product collateral when available."
  },
  {
    id: "visionicx",
    title: "Visionicx — Enterprise Mobile Application",
    pillLeft: "Mobile product",
    pillRight: "Freelance",
    year: "2025",
    description:
      "Mobile UI/UX and frontend contribution for an enterprise application, with resume-recorded scope including 40+ screens and 200+ REST API integrations over a four-week delivery timeline.",
    image: "/images/projects/visionicx-cover.jpg",
    tags: ["React Native", "Expo", "Mobile UX", "API integration"],
    link: "",
    role: "Mobile UI/UX and frontend development",
    context: "Freelance project; organization association in the resume: VisionariesAI Labs.",
    challenge:
      "Design and implement a multi-screen enterprise mobile experience covering inventory and tracking workflows.",
    approach: [
      "Designed and engineered the mobile application interface.",
      "Mapped screen flows across 40+ production screens, as recorded in the master resume.",
      "Worked on integration of 200+ REST APIs, as recorded in the master resume.",
      "Contributed to inventory and tracking workflows.",
      "Worked with advanced caching strategies and offline-first capabilities.",
      "Focused on application performance and latency optimization.",
      "Used AI-assisted development workflows where appropriate."
    ],
    deliverables: ["Mobile UI/UX", "Screen-flow architecture", "React Native frontend", "API-connected workflows"],
    technology: ["React Native", "Expo", "NativeWind", "REST APIs"],
    attribution: "AI tools identified for the user's broader workflow include Replit, Lovable, Bolt, GitHub Copilot and Windsurf; do not imply all were used on this project.",
    statusNote: "Release/production status is not confirmed. Do not describe this as launched until verified."
  },
  {
    id: "core-volt-matrix",
    title: "Core Volt Matrix — Branding & Enterprise HRMS",
    pillLeft: "Brand + Product",
    pillRight: "Freelance",
    year: "2025",
    description:
      "Company branding and enterprise HRMS design/development, combining corporate identity assets with employee workflows and responsive product interfaces.",
    image: "/images/projects/core-volt-matrix-cover.jpg",
    tags: ["Brand identity", "HRMS", "React", "Tailwind CSS"],
    link: "",
    role: "Design and development contributor",
    context: "Independent freelance project.",
    challenge:
      "Connect a coherent corporate identity with practical enterprise HRMS workflows and interfaces.",
    approach: [
      "Worked on company branding and visual identity.",
      "Created or contributed to logo systems and corporate identity assets.",
      "Designed letterheads, corporate stationery, identity cards and related assets.",
      "Worked on enterprise HRMS employee workflows.",
      "Created wireframes and interactive prototypes in Figma.",
      "Developed reusable design patterns and responsive frontend interfaces."
    ],
    deliverables: ["Logo/identity assets", "Corporate stationery", "HRMS wireframes", "Interactive prototypes", "Responsive frontend"],
    technology: ["Figma", "React.js", "Tailwind CSS"],
    attribution: "The user confirms both design and development contributions. Exact division among collaborators and release status are not documented.",
    statusNote: "Add actual HRMS screens and brand assets after checking permission to display."
  },
  {
    id: "intexm-fintech",
    title: "Fintech & Digital Product Experiences",
    pillLeft: "Product portfolio",
    pillRight: "Intexm Media",
    year: "2023 — 2025",
    description:
      "A collection of fintech and digital product work completed through Intexm Media across product UI/UX, landing pages, responsive frontend, marketing creatives and engagement experiences.",
    image: "/images/projects/intexm-fintech-cover.jpg",
    tags: ["Fintech", "UI/UX", "Frontend", "Marketing"],
    link: "",
    role: "UI/UX Designer & Developer",
    context: "Employment at Intexm Media Private Limited, October 2023–April 2025.",
    challenge:
      "Support multiple product and marketing brands with clear user journeys, conversion-focused pages and consistent visual communication.",
    approach: [
      "Worked on KeyToLoans, LowCredit, InstantCredit, LendingInd, Kredlead, CredBuddha, TurboPaisa, ShareNGain and RummyTime.",
      "Designed user flows, wireframes, prototypes and product interfaces.",
      "Designed and developed websites, landing pages and campaign pages.",
      "Contributed to onboarding and gamified engagement experiences, including spin-to-win flows and interactive preloaders.",
      "Created promotional creatives, banners, social media assets, videos and motion graphics.",
      "Collaborated with product, marketing and development teams."
    ],
    deliverables: ["Product UI/UX", "Landing pages", "Responsive frontend", "Campaign creatives", "Motion/video assets", "Presentation design"],
    technology: ["Figma", "React.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "CodeIgniter"],
    attribution: "All listed brands are products/brands worked on through Intexm Media, not independent freelance clients.",
    statusNote: "Use only approved screens and campaign materials. Do not imply ownership of the brands."
  },
  {
    id: "cross-device-trade-signals",
    title: "Cross-Device Trade Signal Application",
    pillLeft: "Application concept",
    pillRight: "Status to confirm",
    year: "Unconfirmed",
    description:
      "A cross-device trading signal application concept with market information workflows, real-time notifications and profit-and-loss calculation tools.",
    image: "/images/projects/trade-signals-cover.jpg",
    tags: ["React Native", "Expo", "Trading UX", "Notifications"],
    link: "",
    role: "Design/development contribution — exact scope to confirm",
    context: "Project appears in the supplied resume. Engagement type (personal, academic, freelance or client) has not been confirmed.",
    challenge:
      "Present data-heavy market information and signal workflows across devices while supporting timely notifications and useful calculations.",
    approach: [
      "Worked on cross-device trading signal application workflows.",
      "Project feature descriptions include market signals and real-time push notifications.",
      "The resume lists profit-and-loss calculators and offline-first token support.",
      "High-fidelity screen flows and interactive prototypes are included in the recorded project scope."
    ],
    deliverables: ["Application screen flows", "Trading signal UI", "P&L calculator UX", "Notification workflows"],
    technology: ["React Native", "Expo", "Tailwind CSS", "Firebase", "Supabase"],
    attribution: "Keep ownership and engagement type unspecified until the user confirms them.",
    statusNote: "Confirm project status, ownership and evidence before publishing as a featured case study."
  },
  {
    id: "tekwissen-advantedge",
    title: "Corporate & Executive Communication Design",
    pillLeft: "Current role",
    pillRight: "TekWissen + AdvantEdge",
    year: "2025 — Present",
    description:
      "Corporate graphic design, executive presentations, sales decks, social content and visual storytelling for technical, engineering, GCC and AI-related subject matter.",
    image: "/images/projects/tekwissen-communication-cover.jpg",
    tags: ["Graphic design", "Presentation design", "Visual storytelling", "Motion"],
    link: "",
    role: "Graphic Designer",
    context: "TekWissen Software Pvt. Ltd., December 2025–Present.",
    challenge:
      "Make complex business, engineering and technology information understandable, polished and consistent with the relevant brand.",
    approach: [
      "Create internal and external visual communication assets.",
      "Design corporate and sales presentations, including reusable master-slide systems.",
      "Translate technical engineering concepts, GCC models and strategic AI concepts into clear visual layouts.",
      "Create charts and visual narratives from complex information and financial metrics.",
      "Develop social media, campaign, motion and video content.",
      "Collaborate with executive stakeholders, branding teams, product heads and cross-functional colleagues."
    ],
    deliverables: ["Corporate presentations", "Master slide systems", "Social media creatives", "Campaign assets", "Motion/video content", "Data visualization"],
    technology: ["Adobe Creative Suite", "Figma", "PowerPoint", "Google Slides", "Video/motion tools"],
    attribution: "Work belongs to the user's current employment context. Publish only materials cleared for public display.",
    statusNote: "Exact project names and approved portfolio samples are still to be added."
  }
];
