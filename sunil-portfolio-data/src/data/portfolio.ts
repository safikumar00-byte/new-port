/**
 * Public-facing portfolio identity and biography.
 * Source: Sunil_Kumar_Reddy_Master_Profile.md (consolidated 9 Nov 2026).
 *
 * Verify the public email and phone before publishing. The phone is deliberately
 * not rendered by default. Do not add date of birth to the public portfolio.
 */

export interface PortfolioData {
  name: string;
  brand: string;
  professionalTitle: string;
  roles: string[];
  location: string;
  timeZone: string;
  avatar: string;
  heroHeadline: string;
  heroFontBadge: string;
  heroSubline: string;
  positioningStatement: string;
  shortBio: string;
  extendedBio: string;
  bioBullets: Array<{
    text: string;
    highlights: string[];
    isHobby?: boolean;
    hobbyWord?: string;
  }>;
  email: string;
  emailNeedsVerification: boolean;
  phone?: string;
  showPhone: boolean;
  githubUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
  resumeUrl: string;
  portfolioUrl?: string;
  footerName: string;
  availabilityLabel: string;
}

export const portfolioData: PortfolioData = {
  name: "Sunil Kumar Reddy",
  brand: "Sunil",
  professionalTitle: "Multidisciplinary Designer & Developer",
  roles: [
    "Graphic Designer",
    "Multidisciplinary Designer",
    "UI/UX Designer",
    "Product Designer",
    "Frontend Developer"
  ],
  location: "Visakhapatnam, Andhra Pradesh, India",
  timeZone: "Asia/Kolkata",
  avatar: "/images/sunil-profile.jpg", // Replace with the approved profile photograph.
  heroHeadline: "Design, develop, deliver.",
  heroFontBadge: "Multidisciplinary Designer & Developer",
  heroSubline: "Turning ideas into identities, interfaces and working digital experiences.",
  positioningStatement: "I turn ideas into identities, interfaces and working digital experiences.",
  shortBio:
    "I'm Sunil Kumar Reddy, a multidisciplinary designer and developer based in Visakhapatnam, India. I work across graphic design, brand identity, UI/UX, product design, web and mobile development, motion graphics, video editing and presentation design. I combine visual problem-solving with frontend engineering and AI-assisted workflows to take projects from concept through implementation and delivery.",
  extendedBio:
    "I'm Sunil Kumar Reddy, a multidisciplinary designer and developer with experience across graphic design, visual communication, branding, UI/UX and product design, frontend development, mobile applications, motion graphics, video editing and enterprise presentation design. My professional experience includes TekWissen Software Pvt. Ltd. and Intexm Media Private Limited, alongside independent freelance engagements for brands and businesses. I have worked on fintech product experiences, corporate branding, agricultural biotechnology communication, enterprise HRMS interfaces and mobile application development. My approach connects visual thinking with technical implementation, supported by modern design tools, frontend technologies and AI-assisted workflows. I enjoy working across the full journey—from understanding a requirement and shaping its visual direction to designing, building and refining the final experience.",
  bioBullets: [
    {
      text: "I'm Sunil Kumar Reddy, a multidisciplinary designer and developer working across graphic design, brand identity, UI/UX, product design and digital experiences.",
      highlights: ["multidisciplinary designer and developer", "graphic design", "brand identity", "UI/UX", "product design"]
    },
    {
      text: "I connect visual problem-solving with frontend and application development, taking work from early concepts and interface design through implementation and delivery.",
      highlights: ["visual problem-solving", "frontend and application development", "implementation and delivery"]
    },
    {
      text: "My work also spans motion graphics, video editing, presentation design and AI-assisted creative and development workflows.",
      highlights: ["motion graphics", "video editing", "presentation design", "AI-assisted"]
    }
  ],
  // This is the most frequently listed email in the supplied resume versions.
  // Confirm it is still current before displaying it publicly.
  email: "vsunilkumarvzg@gmail.com",
  emailNeedsVerification: true,
  phone: "+91 8790549591",
  showPhone: false,
  githubUrl: "https://github.com/sunilkumar029",
  linkedinUrl: "https://www.linkedin.com/in/sunilkumarvzg/",
  behanceUrl: "https://www.behance.net/8fc59bee",
  resumeUrl: "", // Add the final public resume PDF path.
  portfolioUrl: "", // Add the final production portfolio URL after launch.
  footerName: "Sunil Kumar Reddy",
  availabilityLabel: "Open to thoughtful collaborations"
};

/**
 * Keep personal details out of the public portfolio:
 * date of birth is intentionally omitted. The master profile also contains
 * an alternate email and older portfolio URLs; see README for verification.
 */
