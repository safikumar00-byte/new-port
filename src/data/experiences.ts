export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  tools?: string[];
  link: string;
  type: "employment" | "freelance" | "additional";
}

export const experiences: ExperienceItem[] = [
  {
    id: "tekwissen",
    role: "Graphic Designer",
    company: "TekWissen Software Pvt. Ltd.",
    period: "December 2025 — Present",
    location: "Visakhapatnam, India",
    description:
      "Create visual communication and presentation experiences for TekWissen and AdvantEdge, translating complex technical, engineering, GCC and AI-related information into clear, brand-aligned visual stories.",
    highlights: [
      "Create visual communication assets for internal and external communications.",
      "Design graphic assets and creative campaigns for digital and social platforms.",
      "Develop motion-based content and video/creative material.",
      "Design corporate presentations, sales presentations and reusable master-slide systems.",
      "Translate technical engineering concepts, GCC models, strategic AI concepts and business information into clear visual layouts.",
      "Turn complex data and financial metrics into understandable charts and visual narratives.",
      "Support enterprise and executive presentations, including materials used in high-value client pitches.",
      "Collaborate with executive stakeholders, branding teams, product heads and cross-functional colleagues.",
      "Maintain visual identity, brand consistency, layout quality and formatting standards.",
      "Use AI-assisted creative workflows to improve design efficiency and accelerate content production."
    ],
    tools: [
      "Adobe Creative Suite",
      "Figma",
      "Microsoft PowerPoint",
      "Google Slides",
      "Video and motion tools",
      "AI-assisted creative tools"
    ],
    link: "",
    type: "employment"
  },
  {
    id: "freelance-2025",
    role: "Multidisciplinary Designer & Developer",
    company: "Independent Freelance Projects",
    period: "May 2025 — December 2025",
    location: "Remote / Project-based",
    description:
      "Delivered independent project work across graphic design, video editing, brand identity, UI/UX, frontend development and corporate digital experiences.",
    highlights: [
      "Worked on Visionicx mobile application UI and frontend development.",
      "Contributed to Core Volt Matrix company branding and enterprise HRMS design/development.",
      "Led design and frontend contributions for Karyotica Labs' brand and corporate website experience.",
      "Completed independent graphic design and video-editing engagements for Student Care, Quanthex, Ani Visa Services, Krea Property Services, Travellers Bridge and Nortiqa.",
      "Worked across identity systems, marketing creatives, digital interfaces, responsive websites, product communication and visual storytelling."
    ],
    tools: [
      "Figma",
      "React",
      "React Native",
      "Expo",
      "Next.js",
      "Tailwind CSS",
      "Adobe Creative Suite",
      "AI-assisted development tools"
    ],
    link: "",
    type: "freelance"
  },
  {
    id: "intexm",
    role: "UI/UX Designer & Developer",
    company: "Intexm Media Private Limited",
    period: "October 2023 — April 2025",
    location: "Visakhapatnam, India",
    description:
      "Worked across fintech and digital product brands, combining product UI/UX, graphic design, responsive frontend implementation, marketing communication and motion/video content.",
    highlights: [
      "Designed user flows, wireframes, interactive prototypes and product interfaces.",
      "Designed and developed websites, landing pages and conversion-focused campaign pages.",
      "Contributed to mobile application interface design and responsive frontend implementation.",
      "Worked on onboarding, gamified engagement and reward-oriented experiences, including spin-to-win flows and interactive preloaders.",
      "Created promotional creatives, banners, social media assets and product-launch materials.",
      "Produced video editing, motion graphics and commercial promotional content.",
      "Designed presentations, pitch decks, product decks and business-facing visual communication.",
      "Collaborated with product, marketing and development teams.",
      "Contributed to design systems and reusable component patterns.",
      "Worked on fintech products and brands including KeyToLoans, LowCredit, InstantCredit, LendingInd, Kredlead, CredBuddha, TurboPaisa, ShareNGain and RummyTime."
    ],
    tools: [
      "Figma",
      "Adobe Creative Suite",
      "React.js",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "PHP",
      "CodeIgniter"
    ],
    link: "",
    type: "employment"
  }
];

export const additionalExperience: ExperienceItem[] = [
  {
    id: "sagara-durga-hospital",
    role: "Part-time Hospital Administration & Digital Operations",
    company: "Sagara Durga Hospital",
    period: "Dates to be confirmed",
    location: "Visakhapatnam, India",
    description:
      "Additional foundational operations experience during academic studies, supporting hospital administration and digital workflows.",
    highlights: [
      "Supported hospital administrative and digital operations.",
      "Assisted medical, insurance, billing and accounts-related departments.",
      "Handled data entry and patient-related documentation.",
      "Coordinated medical records and administrative information.",
      "Supported insurance documentation and insurance-cycle processes.",
      "Handled or supported billing information and accounts administration.",
      "Built familiarity with accounting and business structures.",
      "Developed typing/data-entry accuracy and working knowledge of Microsoft Office.",
      "Gained familiarity with medical terminology, doctors' handwriting and Aarogyasri platform workflows.",
      "Supported digital logistics and operational asset requirements."
    ],
    tools: ["Microsoft Office", "Hospital administration systems", "Aarogyasri workflow exposure"],
    link: "",
    type: "additional"
  }
];
