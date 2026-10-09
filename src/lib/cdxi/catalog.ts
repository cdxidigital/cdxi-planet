export type GroupId = "business" | "brand" | "digital" | "growth" | "intelligence" | "systems";
export type PriceKind = "hourly" | "from" | "monthly";

export type Service = {
  id: string;
  name: string;
  group: GroupId;
  included: string;
  priceLabel: string;
  amount: number;
  kind: PriceKind;
};

export type Retainer = {
  id: string;
  name: string;
  included: string;
  priceLabel: string;
  amount: number;
  hours: string;
};

export const groups: { id: GroupId | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "business", label: "Business" },
  { id: "brand", label: "Brand" },
  { id: "digital", label: "Digital" },
  { id: "growth", label: "Growth" },
  { id: "intelligence", label: "AI" },
  { id: "systems", label: "Systems" },
];

export const services: Service[] = [
  {
    id: "consulting",
    name: "Business Consulting",
    group: "business",
    included:
      "Up to 60 minutes of one-to-one consultation, challenge review, practical recommendations and a brief written action summary.",
    priceLabel: "$95/hr",
    amount: 95,
    kind: "hourly",
  },
  {
    id: "plans",
    name: "Business Plans & Strategy",
    group: "business",
    included:
      "Discovery questionnaire, business overview, target market, value proposition, basic competitor review and a concise implementation plan.",
    priceLabel: "From $350",
    amount: 350,
    kind: "from",
  },
  {
    id: "logo",
    name: "Logo & Branding",
    group: "brand",
    included:
      "Discovery questionnaire, one original logo concept, two revision rounds, a basic colour palette, and PNG, JPG and SVG files.",
    priceLabel: "From $295",
    amount: 295,
    kind: "from",
  },
  {
    id: "graphic",
    name: "Graphic Design",
    group: "brand",
    included:
      "Custom artwork for print or digital use, preparation, one revision round and final exports within booked time.",
    priceLabel: "$75/hr",
    amount: 75,
    kind: "hourly",
  },
  {
    id: "website",
    name: "Website Design & Development",
    group: "digital",
    included:
      "A custom responsive site of up to 3 standard pages, basic SEO metadata, contact form, social links, client-supplied content, testing, deployment to client hosting and 2 revision rounds.",
    priceLabel: "From $995",
    amount: 995,
    kind: "from",
  },
  {
    id: "ecommerce",
    name: "Ecommerce Websites",
    group: "digital",
    included:
      "A storefront on an established platform, up to 10 supplied products, cart, supported payment integration, shipping configuration, responsive design, testing and handover.",
    priceLabel: "From $2,500",
    amount: 2500,
    kind: "from",
  },
  {
    id: "apps",
    name: "Apps & Software",
    group: "digital",
    included:
      "Requirements consultation and a scoped web MVP with one core workflow, responsive UI, basic testing and deployment guidance. Native apps and complex integrations are extra.",
    priceLabel: "From $3,500",
    amount: 3500,
    kind: "from",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    group: "growth",
    included:
      "Review of one channel, audience and messaging recommendations, one campaign concept and a short action plan. Ad spend is excluded.",
    priceLabel: "From $250",
    amount: 250,
    kind: "from",
  },
  {
    id: "social",
    name: "Social Media Management",
    group: "growth",
    included:
      "One platform, a monthly plan, 4 original static posts with captions, scheduling and a brief monthly report. Client supplies imagery where needed.",
    priceLabel: "$295/mo",
    amount: 295,
    kind: "monthly",
  },
  {
    id: "ai",
    name: "AI & Automation",
    group: "intelligence",
    included:
      "Assessment and setup of one straightforward automation or AI-assisted process, basic testing and handover. API and subscription costs are extra.",
    priceLabel: "From $500",
    amount: 500,
    kind: "from",
  },
  {
    id: "crm",
    name: "CRM & Business Systems",
    group: "systems",
    included:
      "One existing CRM or tool setup, one basic workflow, up to 5 custom fields, one clean data import, testing and handover.",
    priceLabel: "From $500",
    amount: 500,
    kind: "from",
  },
  {
    id: "it",
    name: "IT & Technical Support",
    group: "systems",
    included:
      "Remote troubleshooting, technical advice, configuration, fixes and integrations. One-hour minimum.",
    priceLabel: "$95/hr",
    amount: 95,
    kind: "hourly",
  },
];

export const retainers: Retainer[] = [
  {
    id: "basic",
    name: "Basic",
    hours: "Up to 2 hours",
    included: "Minor website updates, fixes, advice or design. Business-hours email support.",
    priceLabel: "$195/mo",
    amount: 195,
  },
  {
    id: "business",
    name: "Business",
    hours: "Up to 4 hours",
    included: "Website, brand, marketing and technical support, plus a monthly priorities review.",
    priceLabel: "$395/mo",
    amount: 395,
  },
  {
    id: "dedicated",
    name: "Dedicated Partnership",
    hours: "Up to 8 hours",
    included: "Strategy, creative and digital work, priority scheduling and a monthly progress review.",
    priceLabel: "$750/mo",
    amount: 750,
  },
];

export const bands = [
  { name: "Quick Task", scope: "Minor design, technical fixes and small tasks.", guide: "$95–$500" },
  { name: "Project", scope: "Defined creative, business or digital deliverables.", guide: "$500–$2,500" },
  { name: "Build", scope: "Larger websites, systems, software and integrations.", guide: "$2,500+" },
  { name: "Custom", scope: "Complex or multidisciplinary solutions.", guide: "Quoted" },
];

export const terms: { title: string; body: string }[] = [
  {
    title: "Pricing and quotations",
    body: "Prices are in AUD. GST is added where CDXI is registered and required to charge it. Starting prices apply only to stated inclusions. Written quotations confirm scope, deliverables, cost and timing, and remain valid for 14 days unless otherwise stated.",
  },
  {
    title: "Payment terms",
    body: "Under $500: 100% upfront. $500–$2,500: 50% upfront and 50% at completion. Over $2,500: 40% upfront, 30% at an agreed milestone and 30% at completion. Monthly services are billed in advance. Alternative arrangements may be agreed in writing.",
  },
  {
    title: "Commencement and timing",
    body: "Work starts after quote acceptance, initial payment and receipt of essential project materials and access. Delivery estimates depend on timely client cooperation and approvals.",
  },
  {
    title: "Revisions and changes",
    body: "Fixed-price work includes only the revision rounds stated in the service or accepted proposal. Material changes of direction, new features or additional work require a revised quote and client approval before billing.",
  },
  {
    title: "Client responsibilities",
    body: "Clients provide accurate information, approvals, lawful content, appropriate access and materials they have permission to use. Delays may affect delivery.",
  },
  {
    title: "Third-party costs",
    body: "Domains, hosting, software, AI and API usage, ad spend, printing, licences, stock assets, processing fees and external suppliers are extra unless included in writing. Additional expenses require approval.",
  },
  {
    title: "Intellectual property",
    body: "After payment of agreed fees, clients receive the ownership or licence to final custom deliverables specified in the proposal. Third-party assets and pre-existing CDXI tools, code, frameworks and IP remain subject to their respective licences and agreed terms.",
  },
  {
    title: "Confidentiality and privacy",
    body: "CDXI handles confidential information with reasonable care and appropriate security practices. Sensitive data or regulated workflows may require additional privacy and processing terms.",
  },
  {
    title: "Testing, delivery and acceptance",
    body: "CDXI conducts testing appropriate to scope. Clients have a reasonable opportunity to review and report defects or departures from the agreed specification. Acceptance does not restrict statutory rights.",
  },
  {
    title: "Post-delivery support",
    body: "Website and software projects include 14 calendar days of help for reproducible defects attributable to CDXI work, without extra charge. This does not limit Australian Consumer Law rights. New features, content changes and third-party issues are separately quoted.",
  },
  {
    title: "Cancellation and refunds",
    body: "Cancellation may be requested in writing. CDXI accounts for completed work and authorised non-recoverable costs. Refunds and payment obligations follow the contract and applicable law, including Australian Consumer Law. No blanket non-refundable deposit applies.",
  },
  {
    title: "Service limitations",
    body: "CDXI does not promise particular search rankings, advertising returns, revenue growth, universal third-party compatibility or uninterrupted external platform availability. Applicable legal obligations and due care and skill remain required.",
  },
  {
    title: "Specialist services",
    body: "Legal, accounting, regulated financial advice, licensed compliance assessments and other regulated professional services are excluded unless separately arranged with appropriately qualified professionals.",
  },
  {
    title: "Governing law",
    body: "Western Australian and applicable Commonwealth law governs the agreement. Nothing excludes or restricts non-excludable statutory rights, including Australian Consumer Law guarantees.",
  },
];

export const practiceAreas: { group: GroupId; title: string; line: string }[] = [
  { group: "business", title: "Business & Strategy", line: "Consulting, business planning, development and growth." },
  { group: "brand", title: "Branding & Creative", line: "Brand identities, graphic design, creative direction and communications." },
  { group: "digital", title: "Websites & Digital Products", line: "Bespoke websites, ecommerce, applications and digital platforms." },
  { group: "intelligence", title: "AI & Automation", line: "Intelligent assistants, business automation and practical AI integration." },
  { group: "growth", title: "Marketing & Growth", line: "Digital marketing, social media, campaigns and customer engagement." },
  { group: "systems", title: "Technology & Systems", line: "CRM solutions, integrations, technical support and business infrastructure." },
];

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export function formatAud(amount: number) {
  return aud.format(amount);
}

export function findService(id: string) {
  return services.find((service) => service.id === id);
}

export function lineAmount(service: Service, hours: number) {
  if (service.kind === "hourly") return service.amount * Math.max(1, hours);
  return service.amount;
}

export type PaymentPart = { name: string; amount: number };

export function paymentPlan(total: number): { rule: string; parts: PaymentPart[] } {
  if (total <= 0) {
    return { rule: "Add project work to see how payment would be staged.", parts: [] };
  }
  if (total < 500) {
    return { rule: "Under $500 — 100% upfront.", parts: [{ name: "Upfront", amount: total }] };
  }
  if (total <= 2500) {
    const first = Math.round(total * 0.5);
    return {
      rule: "$500–$2,500 — 50% upfront and 50% at completion.",
      parts: [
        { name: "Upfront", amount: first },
        { name: "Completion", amount: total - first },
      ],
    };
  }
  const upfront = Math.round(total * 0.4);
  const milestone = Math.round(total * 0.3);
  return {
    rule: "Over $2,500 — 40% upfront, 30% at an agreed milestone and 30% at completion.",
    parts: [
      { name: "Upfront", amount: upfront },
      { name: "Milestone", amount: milestone },
      { name: "Completion", amount: total - upfront - milestone },
    ],
  };
}

export function projectBand(total: number) {
  if (total <= 0) return null;
  if (total < 500) return bands[0];
  if (total <= 2500) return bands[1];
  return bands[2];
}
