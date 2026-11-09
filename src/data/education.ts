export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  location: string;
  boardOrUniversity?: string;
  result?: string;
}

export const education: EducationItem[] = [
  {
    id: "btech-eee",
    qualification: "Bachelor of Technology (B.Tech) — Electrical & Electronics Engineering",
    institution: "Sanketika Institute of Technology and Management (SITAM)",
    period: "2020 — 2023",
    location: "Visakhapatnam, India",
    boardOrUniversity: "JNTUK"
  },
  {
    id: "diploma-eee",
    qualification: "Diploma — Electrical & Electronics Engineering",
    institution: "Mrs. AVN Polytechnic College",
    period: "2016 — 2019",
    location: "Visakhapatnam, India",
    boardOrUniversity: "SBTET"
  },
  {
    id: "ssc",
    qualification: "Secondary School Certificate (SSC)",
    institution: "M.N.R. High School",
    period: "Completed May 2016",
    location: "Visakhapatnam, India",
    result: "8.8 CGPA"
  }
];
