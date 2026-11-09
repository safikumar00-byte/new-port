export interface FreelanceClient {
  id: string;
  name: string;
  engagement: string;
  confirmedDeliverables: string[];
  period: string;
  image: string;
  link: string;
  notes: string;
}

export const freelanceClients: FreelanceClient[] = [
  ...[
    "Student Care",
    "Quanthex",
    "Ani Visa Services",
    "Krea Property Services",
    "Travellers Bridge",
    "Nortiqa"
  ].map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    engagement: "Independent freelance client",
    confirmedDeliverables: ["Graphic design", "Video editing"],
    period: "May 2025 — December 2025",
    image: "/images/clients/client-work-placeholder.jpg",
    link: "",
    notes: "Individual formats, campaign names, dates, quantities and outcomes must be added from actual work samples. Do not assume identical deliverables for every client."
  }))
];
