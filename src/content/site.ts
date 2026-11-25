/**
 * Single source of truth for site copy. Facts here come from Derek's
 * resumes (Chief of Staff and Technical Program Manager versions).
 * Edit this file to change what the site says; components only render it.
 */

export const site = {
  name: "Derek Belfield",
  role: "AI enablement · Technical Program Manager · Marine Corps veteran",
  motif: "Bringing order to chaos.",
  location: "Dallas–Fort Worth, TX",
  email: "dwbelfield@gmail.com",
  linkedin: "https://linkedin.com/in/dwbelfield",
  linkedinLabel: "linkedin.com/in/dwbelfield",
  url: "https://derekbelfield.com",
  /** Under 155 characters; what engines quote when they have nothing better. */
  description:
    "Derek Belfield: AI enablement and technical program management. Ships production software with AI agents. Open to roles, remote or relocation.",
  intro:
    "I put AI to work inside real operations. A decade owning safety-critical technical programs in Marine aviation, six years running operations in payments and consumer products, and a production software platform built by AI agents working from my specification. I find the constraint holding the schedule, remove it, and leave a team that can run the tooling without me.",
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
  /** Show a thousands separator. Leave off for years. */
  grouped?: boolean;
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
    period: "Apr – Oct 2026",
    location: "Salado, TX",
    roles: ["Chief of Staff"],
    chaos:
      "One owner, a dozen businesses, two facilities, four kinds of operation, and decisions that arrive on a few days' notice. Nothing between the decision and the floor except whoever picks it up.",
    order:
      "A chief of staff who owns the follow-through: six production divisions built from an empty floor, a safety program adopted at every site, and four to six launches in flight at any time without the owner watching the date.",
    summary:
      "Right hand to the owner of PMB Companies for seven months in 2026. I turned his decisions into shipped outcomes across manufacturing, brands, storefronts, and B2B services, from vendor contract to first production run.",
    stats: [
      { value: 6, label: "Production divisions stood up", from: "from an empty floor" },
      { value: 350, prefix: "$", suffix: "K", label: "Production equipment specified and installed" },
      { value: 6, label: "Launches in flight at any time", from: "four to six, most on days of notice" },
      { value: 5, label: "Safety programs written from scratch", from: "adopted at every site" },
    ],
    bullets: [
      "Stood up six new production divisions from a standing start: chemical repackaging, spin-cast metal and metal customization, apparel customization, wide-format print, fragrance blending, and soil amendments. Sourced raw materials, bought and installed equipment, laid out workstations, hired the staff.",
      "Ran four to six concurrent launches at a time, most initiated on a few days of notice.",
      "Negotiated and closed vendor contracts across chemicals, feedstock, and equipment, including reopening suppliers who had previously refused to sell to us.",
      "Opened B2B accounts and closed partnerships that added a third revenue channel to the business.",
      "Wrote the company safety and compliance program from scratch: hazard communication, lockout/tagout, emergency action plans, PPE, respiratory protection. Drove adoption across every site.",
      "Specified, sourced, and installed roughly $350K in production equipment across two facilities. Ran repair-versus-replace analysis on legacy equipment and retired an unprofitable line.",
    ],
  },
  {
    slug: "mythener",
    kind: "side",
    index: "01",
    name: "Mythener",
    org: "Mythener",
    descriptor: "The OS of indie publishing",
    period: "2026 – Present",
    location: "Co-founder",
    roles: ["Co-Founder"],
    logo: { src: "/media/logos/mythener.png", alt: "Mythener emblem", width: 640, height: 616 },
    chaos:
      "An author's manuscript, outline, story bible, editor notes, beta feedback, and publication files live in six tools that do not know about each other. Across a series, nobody can answer the only question that matters: what is true at this point in this story?",
    order:
      "One workspace where the prose builds the story bible, confirmed facts keep their authority, and a continuity engine checks the manuscript before a reader ever sees it. Built by AI coding agents from my specification, and live at mythener.com.",
    summary:
      "Co-founded from my own need as a series author, and the clearest example of how I work with AI. I wrote the product specification, set the design direction, and designed the Delphi Engine myself: a continuity-review system that chains embedding retrieval, LLM analysis, and a decision model, iterated until it ran 12 reviews and 145 checks on every manuscript. AI coding agents wrote the code from the spec: 705 pull requests and 1,754 automated tests, on Cloudflare.",
    stats: [
      { value: 705, label: "Pull requests by AI coding agents", from: "524 in the first four weeks" },
      { value: 1754, grouped: true, label: "Automated tests in the codebase" },
      { value: 74, label: "Numbered requirements in the product spec" },
      { value: 145, label: "Checks in the Delphi Engine", from: "across 12 reviews" },
    ],
    bullets: [
      "Originated the product and wrote the full specification: 74 numbered requirements, domain contracts, acceptance scenarios, and a dependency-ordered implementation plan.",
      "Set the visual direction, ancient Greece meets the future, and locked it as a platform design system with a drift guard in the build.",
      "Designed the Delphi Engine iteratively: embedding retrieval over the manuscript and story bible, LLM analysis, and a decision model that gates what reaches the author.",
      "Shipped it with AI coding agents working from the spec, on Cloudflare Workers, D1, and R2: 705 pull requests and 2,049 commits, 524 of those pull requests in the first four weeks.",
      "Kept the agents honest with 1,754 automated tests and a check suite that every release build has to pass.",
      "Priced and launched it: author, press, house, and enterprise tiers, free for every author until January 1, 2027.",
    ],
    link: { href: "https://mythener.com", label: "mythener.com" },
  },
  {
    slug: "zenblis",
    kind: "side",
    video: { src: "/media/zenblis-loop.mp4", alt: "Zenblis brand footage", rate: 0.7, opacity: 45 },
    logo: { src: "/media/logos/zenblis.png", alt: "Zenblis mark", width: 638, height: 640 },
    index: "02",
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
    title: "AI readiness walkthrough",
    body: "A walk through the business the way the work actually moves: intake, scheduling, quoting, follow-up, reporting. Lean Six Sigma first, AI second. You get a short list of where AI pays for itself now and where it does not belong yet.",
  },
  {
    title: "Team training",
    body: "Hands-on sessions built on your own documents and your own work, with no slide deck about prompts. I taught 13 Lean Six Sigma courses to 295 students. This is the same job with newer tools.",
  },
  {
    title: "Workflow and agent builds",
    body: "The repetitive work rebuilt as AI-assisted workflows and agents: intake, tracking, documentation, follow-up, and the first draft of everything. Built on the tools you already pay for wherever that works.",
  },
  {
    title: "Guardrails and AI policy",
    body: "What can go into a model, who reviews what comes out, and how you show it later. Written by someone who owned PCI, KYC/AML, and NACHA compliance and never failed an examination.",
  },
  {
    title: "Operating cadence",
    body: "The accountability layer between decision and delivery. Who owns what, when it lands, and the system that keeps it visible after the novelty wears off.",
  },
  {
    title: "Fractional AI lead",
    body: "Ongoing counsel for founders and owners on what to automate next, what to buy, and what to leave alone. Retainer or by the project.",
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

export type Book = {
  title: string;
  number: string;
  status: string;
  blurb?: string;
  href?: string;
};

/** Derek's fiction, published as D. W. Belfield. Facts from dwbelfield.com. */
export const author = {
  penName: "D. W. Belfield",
  site: "https://dwbelfield.com",
  siteLabel: "dwbelfield.com",
  series: "The Scourge Wars",
  seriesBlurb:
    "A twelve-book dark LitRPG saga. A murdered politician is revived by an exiled goddess and must turn refugees into a predatory army.",
  claim: "#1 Amazon Best Seller, Military Fiction",
  intro:
    "I write under the name D. W. Belfield. The Scourge Wars is a twelve-book saga; three of its books have hit the Amazon bestseller list, and the fourth arrives in November. The series is where the long-form muscle comes from, and where Mythener came from too: I built the tool I needed to keep a world of this size consistent.",
  links: [
    { label: "Author site", href: "https://dwbelfield.com" },
    { label: "Amazon author page", href: "https://www.amazon.com/stores/Derek-Belfield/author/B07YVNVGZK" },
    { label: "Goodreads", href: "https://www.goodreads.com/author/show/19622809.Derek_Belfield" },
    { label: "Patreon", href: "https://www.patreon.com/cw/dwbelfield" },
  ],
  books: [
    { title: "Evolve", number: "Book I", status: "Available", blurb: "#1 Amazon Best Seller, Military Fiction", href: "https://www.amazon.com/dp/B07YR5PY94" },
    { title: "Adapt", number: "Book II", status: "Available" },
    { title: "Resist", number: "Book III", status: "Available in print" },
    { title: "Siege", number: "Book IV", status: "Pre-order · November 15", href: "https://www.amazon.com/dp/B0HMMCH29S" },
    { title: "Breach", number: "Book V", status: "Drafting" },
    { title: "Sunder", number: "Book VI", status: "Next" },
  ] as Book[],
};

export const credentials = [
  "B.A., Intelligence Studies, American Military University, cum laude",
  "Lean Six Sigma Green Belt. Instructor for 13 Yellow and Green Belt courses",
  "Navy and Marine Corps Commendation Medal, twice",
  "Honorably discharged, United States Marine Corps",
];

export type Training = {
  name: string;
  issuer: string;
  kind: string;
  date: string;
  /** The issuer's public verification page: the proof the badge links to. */
  href: string;
  /** The badge shape alone on a transparent background, made with scripts/cut-badge.py (path under /public). */
  image?: { src: string; alt: string; width: number; height: number };
};

/** AI courses completed, each with its public verification link. Add one only once it is earned. */
export const training: Training[] = [
  {
    name: "AI Fluency for Small Businesses",
    issuer: "Claude Academy (Anthropic)",
    kind: "Course completion badge",
    date: "November 2026",
    href: "https://academy.claude.com/verify/24488c4f3592e265ca4dff551380ad14",
    image: {
      src: "/media/badges/claude-academy-ai-fluency-small-businesses-badge.png",
      alt: "Claude Academy course completion badge: AI Fluency for small businesses, presented to Derek, issued November 25, 2026",
      width: 640,
      height: 643,
    },
  },
  {
    name: "AI Fluency for Nonprofits",
    issuer: "Claude Academy (Anthropic)",
    kind: "Course completion badge",
    date: "November 2026",
    href: "https://academy.claude.com/verify/b02b10cbd292e2f6a9b60b9665b01d5d",
    image: {
      src: "/media/badges/claude-academy-ai-fluency-nonprofits.png",
      alt: "Claude Academy course completion badge: AI Fluency for nonprofits, presented to Derek, issued November 25, 2026",
      width: 640,
      height: 643,
    },
  },
  {
    name: "AI Capabilities and Limitations",
    issuer: "Claude Academy (Anthropic)",
    kind: "Course completion badge",
    date: "November 2026",
    href: "https://academy.claude.com/verify/0d522715dcf288a4f72a339a26ac9df4",
    image: {
      src: "/media/badges/claude-academy-ai-capabilities-and-limitations.png",
      alt: "Claude Academy course completion badge: AI capabilities and limitations, presented to Derek, issued November 25, 2026",
      width: 640,
      height: 643,
    },
  },
  {
    // Issued November 25, 2026; the credential expires May 25, 2027.
    name: "AI Foundations",
    issuer: "OpenAI Academy",
    kind: "Course badge, assessment passed",
    date: "November 2026",
    href: "https://oaiacademy.credential.net/83748e7a-4b45-4118-be83-5715f625aac1",
    image: {
      src: "/media/badges/openai-academy-ai-foundations.png",
      alt: "OpenAI Academy badge: AI Foundations",
      width: 480,
      height: 480,
    },
  },
  {
    // Issued November 25, 2026; the credential expires May 25, 2027.
    name: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    kind: "Course badge, assessment passed",
    date: "November 2026",
    href: "https://oaiacademy.credential.net/9aa0bd10-5ce5-4dab-97a9-95b4f6a29360",
    image: {
      src: "/media/badges/openai-academy-applied-ai-foundations.png",
      alt: "OpenAI Academy badge: Applied AI Foundations",
      width: 480,
      height: 480,
    },
  },
  {
    // Issued November 25, 2026; the credential expires May 25, 2027.
    name: "Agents and Workflows",
    issuer: "OpenAI Academy",
    kind: "Course badge, assessment passed",
    date: "November 2026",
    href: "https://oaiacademy.credential.net/b8ae443f-bd3d-4a59-8910-4c5c21e9d457",
    image: {
      src: "/media/badges/openai-academy-agents-and-workflows.png",
      alt: "OpenAI Academy badge: Agents and Workflows",
      width: 480,
      height: 480,
    },
  },
  {
    // Issued November 25, 2026; the credential expires May 25, 2027.
    name: "AI Leadership",
    issuer: "OpenAI Academy",
    kind: "Course badge, assessment passed",
    date: "November 2026",
    href: "https://oaiacademy.credential.net/de04ee92-8174-4713-bc0e-71518ef56356",
    image: {
      src: "/media/badges/openai-academy-ai-leadership.png",
      alt: "OpenAI Academy badge: AI Leadership",
      width: 480,
      height: 480,
    },
  },
];

export const alongside = [
  "AI-first program manager. Jira, Asana, Monday, ClickUp, Notion, Google Workspace, and Claude, wired into operating workflows rather than used one at a time. Military maintenance and training systems: NALCOMIS and ASM.",
];
