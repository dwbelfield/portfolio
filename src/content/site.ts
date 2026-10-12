/**
 * Single source of truth for site copy. Facts here come from Derek's
 * resumes (Chief of Staff and Technical Program Manager versions).
 * Edit this file to change what the site says; components only render it.
 */

export const site = {
  name: "Derek Belfield",
  role: "Operations leader · Founder · Marine Corps veteran",
  motif: "Bringing order to chaos.",
  location: "Dallas–Fort Worth, TX",
  email: "dwbelfield@gmail.com",
  linkedin: "https://linkedin.com/in/dwbelfield",
  linkedinLabel: "linkedin.com/in/dwbelfield",
  url: "https://derekbelfield.com",
  /** Under 155 characters; what engines quote when they have nothing better. */
  description:
    "Derek Belfield: operations leader and Marine Corps veteran. Former COO of RallyPay, Chief of Staff at PMB Companies, founder of Mythener. Open to roles in DFW.",
  intro:
    "Eight years in Marine aviation logistics. Six running operations in payments and consumer products. I am the person who makes sure decisions turn into shipped outcomes, and the systems I build now are AI-first: they keep running, and keep getting faster, long after I leave.",
  pullQuote:
    "Things rarely fail because nobody knew. They fail because nobody was watching the date.",
};

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  from?: string;
};

export type Chapter = {
  slug: string;
  index: string;
  name: string;
  org: string;
  descriptor: string;
  period: string;
  location: string;
  roles: string[];
  chaos: string;
  order: string;
  summary: string;
  stats: Stat[];
  bullets: string[];
  link?: { href: string; label: string };
  /** "chapter" is an employer; "side" is a company or product of Derek's own. */
  kind?: "chapter" | "side";
  /** Optional looping background video for the chapter header (path under /public). */
  video?: { src: string; alt: string; rate?: number; opacity?: number };
  /** Optional chapter-specific decorative accent. */
  accent?: "marpat";
  /** Organisation logo, white on transparent (path under /public). */
  logo?: { src: string; alt: string; width: number; height: number };
};

export const chapters: Chapter[] = [
  {
    slug: "marine-corps",
    logo: { src: "/media/logos/usmc.png", alt: "United States Marine Corps eagle, globe, and anchor", width: 617, height: 640 },
    index: "01",
    name: "United States Marine Corps",
    org: "USMC",
    descriptor: "Aviation logistics, maintenance & operations",
    period: "2012 – 2020",
    location: "Okinawa, Japan · Craven County, NC",
    video: { src: "/media/usmc.mp4", alt: "Marine aviation maintenance footage" },
    accent: "marpat",
    roles: [
      "Senior Operations Manager",
      "Senior Production Manager",
      "Business Process Analyst",
      "Technical Supervisor",
      "Production Manager",
    ],
    chaos:
      "Paper tracking. A three-year parts backlog. A shop coded priority 9 when the governing regulation specified priority 3.",
    order:
      "A digital tracking system that outlived my tenure and became the model adopted across the Navy and Marine Corps.",
    summary:
      "A decade of ownership over safety-critical programs: aviation life support systems, CBRN protective equipment, ammunition and explosives certification, and maintenance production control.",
    stats: [
      { value: 98.3, decimals: 1, suffix: "%", label: "Parts ready for issue", from: "from 15.1%" },
      { value: 3, suffix: " mo", label: "Time to replenish", from: "from 36 months" },
      { value: 7, suffix: " days", label: "International purchasing turnaround", from: "from 90 days" },
      { value: 295, label: "Lean Six Sigma students trained", from: "across 13 courses" },
    ],
    bullets: [
      "Cleared a three-year parts backlog after finding the shop coded priority 9 when the regulation specified priority 3. Parts availability went from 15.1% to 98.3% and replenishment time from 36 months to 3, eliminating a standing three-day customer downtime.",
      "Built the digital tracking system that replaced paper for parts, status, and accountability. Recognized by the inspection team at two separate sites, then adopted as the model across the Navy and Marine Corps.",
      "Rewrote the qualification standard for the entire trade at the Training & Readiness Working Group. Adopted service-wide.",
      "Established the CBRN protective equipment program in Okinawa, bringing in-house four shipping containers of equipment that had previously been sent back to the United States for inspection every cycle.",
      "Seated on the Ammunition & Explosives Certification Program Board as its only non-ordnance member, with sign-off authority on explosives-handling certification for every technician in the shops.",
      "Relieved the maintenance sign-off bottleneck by training four quality assurance representatives and six inspectors.",
      "Led 60 people across five divisions and $1.4M in assets. 46 direct reports in a later assignment.",
      "Six Sigma coach on three improvement projects. Instructed 13 Lean Six Sigma Yellow and Green Belt courses, training 295 students.",
      "Zero discrepancies across two organizational audits. Navy and Marine Corps Commendation Medal, twice.",
    ],
  },
  {
    slug: "rallypay",
    link: { href: "https://www.crunchbase.com/organization/rally-org", label: "RallyPay on Crunchbase" },
    video: { src: "/media/rallypay.mp4", alt: "Abstract payments network footage", rate: 0.6, opacity: 40 },
    logo: { src: "/media/logos/rallypay.png", alt: "RallyPay mark", width: 474, height: 640 },
    index: "02",
    name: "RallyPay",
    org: "RallyPay",
    descriptor: "Payments infrastructure",
    period: "2020 – 2026",
    location: "Dallas, TX",
    roles: ["Director of Operations", "Chief Operating Officer", "Consultant"],
    chaos:
      "A payments company scaling fast. Inbound support volume up 400%. Card-testing attacks hammering the gateway. Compliance obligations across PCI, KYC/AML, NACHA, and the card networks.",
    order:
      "An operating cadence between decision and delivery, a compliance program that never failed an examination, and a security layer that cut attacks by 99%.",
    summary:
      "Nearly six years across three roles, from Director of Operations to COO, then retained by the CEO post-transition to advise on operations, risk, and compliance continuity.",
    stats: [
      { value: 99, suffix: "%", label: "Fewer card-testing attacks" },
      { value: 32, suffix: "%", label: "Fewer chargebacks" },
      { value: 45, suffix: "%", label: "Lower projected infrastructure cost" },
      { value: 44, suffix: "%", label: "Same-day ticket resolution", from: "from 3.4%" },
    ],
    bullets: [
      "Ran company operations reporting to the CEO. Owned the operating cadence and the accountability layer between decision and delivery.",
      "Owner of record for PCI, KYC/AML, transaction monitoring, NACHA, and card network rules. Named on the filing for every merchant acquirer examination, with no failed examinations.",
      "Deployed a payments security microservice that cut card-testing attacks 99% and chargebacks 32%.",
      "Implemented a proprietary onboarding and underwriting microservice, reducing processing time 33%.",
      "Led an architectural overhaul that cut projected infrastructure costs 45%.",
      "Developed a multi-vendor gateway service, reducing COGS 5.6% and unlocking new strategic verticals.",
      "Executed a pricing initiative that lifted card authorization rates 11% and gross profit 5.7%.",
      "As Director of Operations, raised same-day support ticket resolution from 3.4% to 44% while inbound volume grew 400%.",
      "Launched fraud prevention features and training that prevented $375.5K in fraud within six months.",
      "Led a $1M UI/UX overhaul, delivered on time and under budget.",
    ],
  },
  {
    slug: "pmb-companies",
    video: { src: "/media/pmb-loop.mp4", alt: "Warehouse and production floor footage", rate: 0.6, opacity: 35 },
    index: "03",
    name: "PMB Companies",
    org: "PMB Companies",
    descriptor: "A portfolio of manufacturing, brand, and storefront companies",
    period: "2026 – Present",
    location: "Salado, TX",
    roles: ["Chief of Staff"],
    chaos:
      "One owner, a dozen businesses, two facilities, four kinds of operation, and decisions that arrive on a few days' notice. Nothing between the decision and the floor except whoever picks it up.",
    order:
      "A chief of staff who owns the follow-through: six production divisions built from an empty floor, a safety program adopted at every site, and four to six launches in flight at any time without the owner watching the date.",
    summary:
      "Right hand to the owner of PMB Companies. I turn his decisions into shipped outcomes across manufacturing, brands, storefronts, and B2B services, from vendor contract to first production run.",
    stats: [
      { value: 6, label: "Production divisions stood up", from: "from an empty floor" },
      { value: 350, prefix: "$", suffix: "K", label: "Production equipment specified and installed" },
      { value: 6, label: "Launches in flight at any time", from: "four to six, most on days of notice" },
      { value: 5, label: "Safety programs written from scratch", from: "adopted at every site" },
    ],
    bullets: [
      "Stood up six new production divisions from a standing start: chemical repackaging, spin-cast metal and metal customization, apparel customization, wide-format print, fragrance blending, and soil amendments. Sourced raw materials, bought and installed equipment, laid out workstations, hired the staff.",
      "Run four to six concurrent launches at a time, most initiated on a few days of notice.",
      "Negotiated and closed vendor contracts across chemicals, feedstock, and equipment, including reopening suppliers who had previously refused to sell to us.",
      "Opened B2B accounts and closed partnerships that added a third revenue channel to the business.",
      "Wrote the company safety and compliance program from scratch: hazard communication, lockout/tagout, emergency action plans, PPE, respiratory protection. Drove adoption across every site.",
      "Specified, sourced, and installed roughly $350K in production equipment across two facilities. Ran repair-versus-replace analysis on legacy equipment and retired an unprofitable line.",
    ],
  },
  {
    slug: "zenblis",
    kind: "side",
    video: { src: "/media/zenblis-loop.mp4", alt: "Zenblis brand footage", rate: 0.7, opacity: 45 },
    logo: { src: "/media/logos/zenblis.png", alt: "Zenblis mark", width: 638, height: 640 },
    index: "01",
    name: "Zenblis",
    org: "Zenblis",
    descriptor: "AI-native senior care marketplace",
    period: "2026 – Present",
    location: "Co-founder",
    roles: ["Co-Founder"],
    chaos:
      "Families asking ChatGPT about a community and getting years-old complaints repeated as fact. Referral agencies paid to point you somewhere. Directories too thin to help anyone.",
    order:
      "An AI-native marketplace and directory I conceived and designed end to end: the brand, the front-end experience, the go-to-market motion, the content and SEO system, and the facility outreach engine.",
    summary:
      "My idea, co-founded in 2026. I designed the product experience and brand, landed the first customers, and built the operating foundation for autonomous agents across research, content, social media, and community outreach. Partner-run day to day, with my ongoing ownership of GTM systems.",
    stats: [
      { value: 2026, label: "Co-founded, from my idea" },
      { value: 1, label: "Brand system: palette, guidelines, voice" },
      { value: 3, label: "Growth systems: go-to-market, content and SEO, outreach" },
    ],
    bullets: [
      "Built the go-to-market motion from zero, with agent workflows spanning research, content production, social media, and community outreach.",
      "Designed the content and SEO system that drives organic discovery.",
      "Built the facility outreach engine that fills the supply side of the marketplace.",
      "Partner-run day to day, with an ongoing co-founder role.",
    ],
    link: { href: "https://zenblis.com", label: "zenblis.com" },
  },
  {
    slug: "mythener",
    kind: "side",
    index: "02",
    name: "Mythener",
    org: "Mythener",
    descriptor: "The OS of indie publishing",
    period: "2026 – Present",
    location: "Founder",
    roles: ["Founder"],
    logo: { src: "/media/logos/mythener.png", alt: "Mythener emblem", width: 640, height: 616 },
    chaos:
      "An author's manuscript, outline, story bible, editor notes, beta feedback, and publication files live in six tools that do not know about each other. Across a series, nobody can answer the only question that matters: what is true at this point in this story?",
    order:
      "One workspace where the prose builds the story bible, confirmed facts keep their authority, and a continuity engine checks the manuscript before a reader ever sees it. Live at mythener.com.",
    summary:
      "Founded from my own need as a series author. I wrote the product specification, set the design direction, and shipped the first release with AI coding agents on Cloudflare: Build, Plan, Write, Review, Test, and Publish, with the Delphi Engine running 12 reviews and 129 checks on every manuscript.",
    stats: [
      { value: 7, label: "Modules, from world bible to print-ready paperback" },
      { value: 129, label: "Continuity checks in the Delphi Engine", from: "across 12 reviews" },
      { value: 74, label: "Numbered requirements in the product spec" },
      { value: 2027, label: "Free for every author until January 1" },
    ],
    bullets: [
      "Originated the product and wrote the full specification: 74 numbered requirements, domain contracts, acceptance scenarios, and a dependency-ordered implementation plan.",
      "Set the visual direction, ancient Greece meets the future, and locked it as a platform design system with a drift guard in the build.",
      "Shipped the first release with AI coding agents working from the spec, on Cloudflare Workers, D1, and R2.",
      "Priced and launched it: author, press, house, and enterprise tiers, free for every author until January 1, 2027.",
    ],
    link: { href: "https://mythener.com", label: "mythener.com" },
  },
];

export type Transformation = {
  /** Starting number, or a short phrase when there is no number to count from. */
  from?: number;
  fromText?: string;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
};

/** Before-and-after pairs, all Derek's own outcomes. Counters run from -> to. */
export const transformations: Transformation[] = [
  { from: 15.1, to: 98.3, decimals: 1, suffix: "%", label: "Parts ready for issue" },
  { from: 36, to: 3, suffix: " mo", label: "Time to replenish" },
  { from: 90, to: 7, suffix: " days", label: "International purchasing turnaround" },
  { from: 3.4, to: 44, decimals: 1, suffix: "%", label: "Same-day ticket resolution", note: "while inbound volume grew 400%" },
  { fromText: "Under attack", to: 99, prefix: "−", suffix: "%", label: "Card-testing attacks", note: "chargebacks down 32% alongside" },
  { fromText: "Empty floor", to: 6, label: "Production divisions stood up", note: "in under a year" },
];

export const range =
  "Eight years in Marine aviation logistics. Six running operations. Two companies founded. Three bestselling novels. Zero failed audits in fourteen years.";


export const principles = [
  {
    title: "Follow-through",
    body: "I write down what got decided, who has it, and when it lands. Then I go get it. Things rarely fail because nobody knew. They fail because nobody was watching the date.",
  },
  {
    title: "Systems that stick",
    body: "Anyone can roll out a tracker. The test is whether it is still running in month six, after the novelty wears off and the first person tries to route around it. Mine have been.",
  },
  {
    title: "Filtering",
    body: "I handle what I can handle. If I am bringing it to you, there is a reason, and I will have already done the work to make the decision a short one.",
  },
  {
    title: "Range",
    body: "I read a P&L and a hazard communication plan with the same attention. Equally at home on a production floor and in a software engineering standup.",
  },
  {
    title: "AI-first",
    body: "Every system I build now assumes AI in the loop: intake, tracking, documentation, and the first pass on analysis. People make the decisions. The tooling keeps the date.",
  },
];

export const services = [
  {
    title: "Operating cadence",
    body: "The accountability layer between decision and delivery. Who owns what, when it lands, and the system that keeps it visible after the novelty wears off.",
  },
  {
    title: "Compliance and safety programs",
    body: "PCI, KYC/AML, NACHA, and card network rules on the payments side. Hazard communication, lockout/tagout, and emergency action plans on the floor. Built from scratch, adopted across sites.",
  },
  {
    title: "Standing up new lines",
    body: "From an empty floor to first production run: sourcing, equipment, layout, hiring, vendor contracts.",
  },
  {
    title: "Process improvement",
    body: "Lean Six Sigma Green Belt. Find the constraint holding the schedule and remove it.",
  },
  {
    title: "AI-first operations",
    body: "Rebuilding a team's operating cadence around AI-assisted workflows: intake, tracking, documentation, and the first draft of everything. Built so the people stay accountable and the tooling does the carrying.",
  },
  {
    title: "Founder advisory",
    body: "Ongoing counsel for founders and owners on operations, risk, and what to build next. Retainer or by the project.",
  },
];

export const engagement = [
  {
    step: "01",
    title: "A conversation",
    body: "Thirty minutes on what is broken, what has been tried, and what a good outcome looks like. No deck.",
  },
  {
    step: "02",
    title: "A short written plan",
    body: "What got decided, who has it, and when it lands. Short enough to read, specific enough to hold people to.",
  },
  {
    step: "03",
    title: "Execution and handoff",
    body: "I do the work alongside your team and leave an AI-first system that is still running in month six.",
  },
];

export const credentials = [
  "B.A., Intelligence Studies, American Military University, cum laude",
  "Lean Six Sigma Green Belt. Instructor for 13 Yellow and Green Belt courses",
  "Navy and Marine Corps Commendation Medal, twice",
  "Honorably discharged, United States Marine Corps",
];

export const alongside = [
  "Three-time bestselling science fiction author, independently published and marketed to bestseller.",
  "AI-first operator. Claude, Jira, Asana, Monday, ClickUp, Notion, and Google Workspace, wired into operating workflows rather than used one at a time.",
];
