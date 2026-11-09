export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  notes?: string;
}

export const certifications: Certification[] = [
  {
    id: "visual-communication-design",
    name: "Visual Communication Design for Digital Media",
    issuer: "NPTEL — IIT Roorkee",
    issued: "October 2024"
  },
  {
    id: "hci",
    name: "Design & Implementation of Human-Computer Interfaces",
    issuer: "NPTEL — IIT Guwahati",
    issued: "November 2024"
  },
  {
    id: "interaction-design",
    name: "Introduction to Interaction Design",
    issuer: "NPTEL",
    issued: "November 2024",
    notes: "One resume version associates this course with IIT Roorkee; verify issuer/institute wording against the certificate."
  },
  {
    id: "javascript-algorithms",
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    issued: "March 2023"
  },
  {
    id: "responsive-web-design",
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issued: "January 2023"
  },
  {
    id: "introduction-to-cloud",
    name: "Introduction to Cloud",
    issuer: "IBM",
    issued: "October 2022"
  },
  {
    id: "advanced-ms-office-photoshop",
    name: "Advanced MS Office & Photoshop Systems",
    issuer: "Pioneer Computers",
    issued: "Date not specified"
  },
  {
    id: "autocad",
    name: "AutoCAD Technical Designing",
    issuer: "Radiant Technologies",
    issued: "Date not specified"
  }
];

export interface InternshipItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  highlights: string[];
  notes?: string;
}

export const internships: InternshipItem[] = [
  {
    id: "salesera",
    role: "Video Production Intern",
    organization: "SalesEra",
    duration: "3 months",
    highlights: [
      "Produced digital marketing and campaign video assets.",
      "Worked from scripting through final video editing.",
      "Created promotional and engagement content."
    ]
  },
  {
    id: "psychbeings",
    role: "Graphic & Video Design Intern",
    organization: "Psychbeings",
    duration: "3 months",
    highlights: [
      "Created motion graphics, educational content layouts, storytelling assets, thumbnails, transitions and social media creatives."
    ],
    notes: "One resume records audience growth from 100 to 2,000+ followers during the relevant work. Treat as resume-stated until analytics or user confirmation is available."
  },
  {
    id: "edugurd",
    role: "Internship Training",
    organization: "Edugurd",
    duration: "1 month",
    highlights: ["Practical foundational training focused on PLC Boards."]
  }
];
