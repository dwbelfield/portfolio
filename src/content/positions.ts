/**
 * Individual positions within each chapter, newest first, for the role
 * selector on chapter pages. Marine Corps detail comes from LinkedIn;
 * the rest is split out of the resumes by role.
 */

export type Position = {
  title: string;
  period: string;
  duration?: string;
  location: string;
  bullets: string[];
  tags?: string[];
};

export const positions: Record<string, Position[]> = {
  "marine-corps": [
    {
      title: "Senior Operations Manager",
      period: "Mar 2019 – Jun 2020",
      duration: "1 yr 4 mos",
      location: "Craven County, North Carolina",
      bullets: [
        "Managed training, mentorship, and documentation for 46 employees.",
        "Served on the Ammunition & Explosives Certification Program Board as its only non-ordnance member, with sign-off authority on explosives-handling certification for every technician in the shops.",
        "Member of the Training & Readiness Program Working Group for Naval Aviation Technical Education Command (NATEC). Rewrote the qualification standard for the entire trade. Adopted service-wide.",
      ],
      tags: ["Operations", "Service Delivery", "Training", "Certification"],
    },
    {
      title: "Senior Production Manager",
      period: "Nov 2017 – Mar 2019",
      duration: "1 yr 5 mos",
      location: "Craven County, North Carolina",
      bullets: [
        "Led 60 employees across five divisions, overseeing $1.4M in assets.",
        "Spearheaded the transition from paper-based to digital tracking systems. Recognized by the inspection team, then adopted as the model for the Navy and Marine Corps.",
        "Cleared a three-year parts backlog after finding the shop coded priority 9 when the governing regulation specified priority 3. Reduced Time to Reliably Replenish from 36 months to 3.",
        "Eliminated a standing three-day customer downtime, raising Ready-for-Issue from 15.1% to 98.3%.",
        "Relieved the maintenance sign-off bottleneck by training four quality assurance representatives and six inspectors.",
      ],
      tags: ["Operations", "Production Control", "Supply Chain", "Digital Transformation"],
    },
    {
      title: "Business Process Analyst",
      period: "Jan 2017 – Nov 2017",
      duration: "11 mos",
      location: "Okinawa, Japan",
      bullets: [
        "Developed data-driven inspection standards and trend analysis for process improvements.",
        "Served as Six Sigma Coach for three process improvement projects.",
        "Instructed and coordinated 10 Yellow Belt and 3 Green Belt Lean Six Sigma courses, training 295 students.",
      ],
      tags: ["Process Improvement", "Continuous Improvement", "Lean Six Sigma", "Instruction"],
    },
    {
      title: "Technical Supervisor",
      period: "Jan 2015 – Jan 2017",
      duration: "2 yrs 1 mo",
      location: "Okinawa, Japan",
      bullets: [
        "Led and mentored a 10-person team while establishing the CBRN protective equipment program in Okinawa.",
        "Brought in-house four shipping containers of equipment that had previously been sent back to the United States for inspection every cycle.",
        "Achieved zero discrepancies in two organizational audits.",
      ],
      tags: ["Operations", "CBRN", "Program Build", "Audit"],
    },
    {
      title: "Production Manager",
      period: "Jan 2013 – Jan 2015",
      duration: "2 yrs 1 mo",
      location: "Okinawa, Japan",
      bullets: [
        "Supervised 30 employees across three divisions, managing $1.1M in assets.",
        "Streamlined international purchasing, reducing asset turnaround from 90 days to 7 days.",
        "Integrated logistics processes across three external entities, optimizing hazardous materials handling.",
        "Established accountability and transparency processes that became the model for the Navy and Marine Corps.",
      ],
      tags: ["Operations", "Logistics", "Purchasing", "Hazmat"],
    },
  ],

  rallypay: [
    {
      title: "Consultant",
      period: "Mar 2025 – Mar 2026",
      duration: "1 yr 1 mo",
      location: "Dallas, Texas",
      bullets: [
        "Retained by the CEO post-transition to advise on operations, risk, and compliance continuity.",
      ],
      tags: ["Advisory", "Risk", "Compliance"],
    },
    {
      title: "Chief Operating Officer",
      period: "Aug 2021 – Mar 2025",
      duration: "3 yrs 8 mos",
      location: "Dallas, Texas",
      bullets: [
        "Ran company operations reporting directly to the CEO. Owned the operating cadence and the accountability layer between decision and delivery.",
        "Owner of record for PCI, KYC/AML, transaction monitoring, NACHA, and card network rules. Named on the filing for every merchant acquirer examination, with no failed examinations.",
        "Deployed a payments security microservice that cut card-testing attacks 99% and chargebacks 32%.",
        "Implemented a proprietary onboarding and underwriting microservice, reducing processing time 33%.",
        "Led an architectural overhaul that cut projected infrastructure costs 45%.",
        "Developed a multi-vendor gateway service, reducing COGS 5.6% and unlocking new strategic verticals.",
        "Executed a pricing initiative that lifted card authorization rates 11% and gross profit 5.7%.",
      ],
      tags: ["Operations", "Compliance", "Payments", "Architecture", "Pricing"],
    },
    {
      title: "Director of Operations",
      period: "May 2020 – Aug 2021",
      duration: "1 yr 4 mos",
      location: "Dallas, Texas",
      bullets: [
        "Raised same-day support ticket resolution from 3.4% to 44% while inbound volume grew 400%.",
        "Launched fraud prevention features and training that prevented $375.5K in fraud within six months.",
        "Led a $1M UI/UX overhaul, delivered on time and under budget.",
      ],
      tags: ["Operations", "Support", "Fraud Prevention", "Product"],
    },
  ],
  "pmb-companies": [
    {
      title: "Chief of Staff",
      period: "Apr 2026 – Oct 2026",
      duration: "7 mos",
      location: "Salado, Texas · Hybrid",
      bullets: [
        "Right hand to the owner across a portfolio of 16 brands and two facilities. Owned the follow-through on the initiatives he decided, from vendor negotiation to first production run.",
        "Stood up six new production divisions from an empty floor: chemical repackaging, spin-cast metal and metal customization, apparel customization, wide-format print, fragrance blending, and soil amendments. Sourced raw materials, bought and installed equipment, laid out workstations, hired the staff.",
        "Ran four to six concurrent launches at a time, most initiated on a few days of notice.",
        "Negotiated and closed vendor contracts across chemicals, feedstock, and equipment, including reopening suppliers who had previously refused to sell to us.",
        "Opened B2B accounts and closed partnerships that added a third revenue channel to the business.",
        "Wrote the company safety and compliance program from scratch: hazard communication, lockout/tagout, emergency action plans, PPE, respiratory protection. Drove adoption across every site.",
        "Specified, sourced, and installed roughly $350K in production equipment across two facilities. Ran repair-versus-replace analysis on legacy equipment and retired an unprofitable line.",
      ],
      tags: ["Operations", "Manufacturing", "Vendor Negotiation", "Safety & Compliance", "Launches"],
    },
  ],

  mythener: [
    {
      title: "Founder",
      period: "2026 – Present",
      location: "Remote",
      bullets: [
        "Originated the product from my own needs as a series author, and wrote the specification: 74 numbered requirements, domain contracts, acceptance scenarios, and an implementation plan in dependency order.",
        "Set the visual direction and locked it as the platform design system, with a test that guards against styling drift.",
        "Shipped the first release with AI coding agents working from the spec, on Cloudflare Workers, D1, and R2.",
        "Defined the modules authors see: Workspace, Build, Plan, Write, Review, Test, and Publish, with the Delphi Engine running 12 reviews and 129 checks.",
        "Priced and launched the product: author, press, house, and enterprise tiers, free for every author until January 1, 2027.",
      ],
      tags: ["Product", "Specification", "Design System", "AI Agents", "Cloudflare", "Go-to-Market"],
    },
  ],
  zenblis: [
    {
      title: "Co-Founder",
      period: "2026 – Present",
      location: "Remote",
      bullets: [
        "Originated the business idea and co-founded the company.",
        "Designed the entire front-end UI and UX.",
        "Wrote the brand system: palette, brand guidelines, and brand voice.",
        "Built the go-to-market motion from zero and landed the first customers.",
        "Established agent workflows across research, content and SEO, social media, and community outreach to support the go-to-market strategy.",
        "Built shared tracking with persistent IDs, linked assets, pipeline stages, and performance records so agents can coordinate work across sessions.",
        "Documented CMS publishing standards and reconciled historical social activity to give future agent work a traceable starting point.",
        "Built the facility outreach engine that fills the supply side of the marketplace.",
        "Partner-run day to day, with an ongoing co-founder role.",
      ],
      tags: ["Product", "UI/UX", "Brand", "Go-to-Market", "AI Agents", "Content & SEO", "Outreach"],
    },
  ],
};

/** Chapter-level notes that do not belong to a single position. Short lines
    render as a list; longer entries read as story paragraphs. */
export const highlights: Record<string, string[]> = {
  mythener: [
    "I write science fiction under the name D. W. Belfield, and by the third book of a series I had the problem every series author has: the manuscript, the outline, the story bible, the editor's notes, the beta feedback, and the publication files were in six different tools, and none of them knew which version was true. Every tool on the market solved one piece. None of them solved the relationship between the pieces.",
    "So I specified the one I wanted. Mythener keeps every character, world rule, and timeline in step across a series: the prose builds the story bible, the facts I confirm keep their authority, and the Delphi Engine checks a manuscript against all of it before a reader sees it. I wrote the requirements, set the design, and shipped the first release with AI coding agents working from the spec. It is live, and free for every author until the start of 2027.",
  ],
  zenblis: [
    "My mom runs a senior care facility in Plano, Texas. A while back she was venting to me about something that seemed small. Her Google reviews and photos were years out of date. Worse, when families asked ChatGPT or Perplexity about her community, the AI would pull old complaints and repeat them as fact. One of the reviews dinging her was about a burned-out streetlight in a courtyard, from before she even worked there. She had no idea how to get any of it fixed. Who do you even call?",
    "So I went looking for the Zillow of senior care. A place where a family could see accurate, current information and where a community could actually control its own presence. It didn't exist. What existed were referral agencies that get paid to point you somewhere, and thin directories that don't really help anyone.",
    "That bugged me enough to build the thing. It's called Zenblis. My cofounder Matt and I served in the Marines together. He writes the software, I handle the business and design, and my mom is basically our whole reason for starting.",
  ],
  "pmb-companies": [
    "I joined in April 2026 as Chief of Staff to the owner. The portfolio was already broad: manufacturing and import/export, sixteen media brands under Native Commerce, a family of storefronts, and B2B services. What it needed was someone to carry his decisions the last mile. The first stretch was building: six production divisions that did not exist, from chemical repackaging to fragrance blending, sourced, equipped, laid out, and staffed, on days of notice.",
    "The second stretch was making it hold. A safety and compliance program written from scratch and adopted at every site. Vendor contracts, including suppliers who had refused to sell to us. B2B accounts that opened a third revenue channel. Go-to-market for Doodle Videos on the B2B side. At any given time there were four to six launches moving, and my job was that none of them failed because nobody was watching the date. My last day was in October 2026.",
  ],
  "marine-corps": [
    "I enlisted in May 2012 and spent the first five years in Okinawa. As a production manager I had thirty people, three divisions, and an international purchasing pipeline that took ninety days to turn an asset around; by the time I left that job it took seven. As a technical supervisor I stood up the CBRN protective equipment program on the island, bringing in-house four containers of gear that had been shipped back to the States for inspection every cycle, and came through two organizational audits with zero discrepancies. As a business process analyst I ran the Lean Six Sigma office, coaching three improvement projects and teaching thirteen courses to 295 Marines.",
    "The last three years were in Craven County, North Carolina. I took over production control for sixty people and $1.4M in assets, found the shop coding parts at priority 9 when the regulation said 3, and cleared a three-year backlog: ready-for-issue went from 15.1% to 98.3%, replenishment from 36 months to 3. The digital tracking system I built to replace paper outlived my tenure and was adopted across the Navy and Marine Corps. I finished as a senior operations manager with 46 direct reports, a seat on the Ammunition and Explosives Certification Program Board, and a rewritten qualification standard for my trade that the service adopted. Two Navy and Marine Corps Commendation Medals. Honorably discharged in June 2020.",
  ],
  rallypay: [
    "I came in as Director of Operations with two things on my plate: customer success and payment operations. Underneath them sat two legacy platforms, Piryx.org and Rally.org, each with its own codebase and its own way of doing everything. I spent that first stretch optimizing operations across both. Same-day resolution went from 3.4% to 44% while inbound volume grew 400%.",
    "That work is what earned the promotion. As COO I took on both engineering teams and the customer success team, owned the operating cadence between the CEO's decisions and delivery, and set the product roadmap going forward: the security microservice, onboarding and underwriting, the multi-vendor gateway, the pricing initiative. When the company transitioned, the CEO retained me to keep operations, risk, and compliance continuous.",
  ],
};

/** Programs owned within a chapter, each rendered as a hexagon with an icon. */
export type Program = {
  name: string;
  blurb: string;
  icon: "parachute" | "clipboard" | "respirator" | "ordnance" | "sigma" | "shield" | "badge" | "nodes" | "chart" | "funnel" | "hazard" | "lock" | "bell" | "hardhat" | "pen" | "eye" | "book" | "globe";
};

export const programs: Record<string, Program[]> = {
  "marine-corps": [
    {
      name: "Aviation Life Support Systems",
      blurb: "One division, four work centers. Repeated at a second site across two more.",
      icon: "parachute",
    },
    {
      name: "Maintenance Production Control",
      blurb: "Priority, parts, and the backlog. Ready-for-issue from 15.1% to 98.3%.",
      icon: "clipboard",
    },
    {
      name: "CBRN Protective Equipment",
      blurb: "Established the Okinawa program. Four containers of gear brought in-house.",
      icon: "respirator",
    },
    {
      name: "Ammunition & Explosives Certification",
      blurb: "Board seat as the only non-ordnance member. Sign-off authority for every technician.",
      icon: "ordnance",
    },
    {
      name: "Lean Six Sigma Office",
      blurb: "Coach on three projects. Thirteen courses taught, 295 students.",
      icon: "sigma",
    },
  ],
  rallypay: [
    {
      name: "Payments Security",
      blurb: "Security microservice that cut card-testing attacks 99% and chargebacks 32%.",
      icon: "shield",
    },
    {
      name: "Compliance Program",
      blurb: "Owner of record for PCI, KYC/AML, NACHA, and card network rules. No failed examinations.",
      icon: "badge",
    },
    {
      name: "Onboarding & Underwriting",
      blurb: "Proprietary microservice that cut processing time 33%.",
      icon: "funnel",
    },
    {
      name: "Multi-vendor Gateway",
      blurb: "Gateway service that cut COGS 5.6% and opened new strategic verticals.",
      icon: "nodes",
    },
    {
      name: "Pricing & Authorization",
      blurb: "Pricing initiative that lifted authorization rates 11% and gross profit 5.7%.",
      icon: "chart",
    },
  ],

  "pmb-companies": [
    {
      name: "Hazard Communication",
      blurb: "Written from scratch for a business that repackages and blends chemicals. Adopted at every site.",
      icon: "hazard",
    },
    {
      name: "Lockout / Tagout",
      blurb: "Energy-control procedures for the equipment behind six new production lines.",
      icon: "lock",
    },
    {
      name: "Emergency Action Plans",
      blurb: "Evacuation, reporting, and roles for two Central Texas facilities.",
      icon: "bell",
    },
    {
      name: "Personal Protective Equipment",
      blurb: "Hazard assessments and PPE standards for every workstation on the floor.",
      icon: "hardhat",
    },
    {
      name: "Respiratory Protection",
      blurb: "Selection, fit, and clearance wherever chemical exposure calls for it.",
      icon: "respirator",
    },
  ],
  mythener: [
    { name: "Build", blurb: "A shared world bible: characters, places, creatures, and rules, with voice profiles.", icon: "globe" },
    { name: "Plan", blurb: "A canvas for acts, chapters, and beats, linked to the scenes that fulfil them.", icon: "clipboard" },
    { name: "Write", blurb: "A drafting page that feeds what it discovers back into the world bible.", icon: "pen" },
    { name: "Review", blurb: "The Delphi Engine: 12 reviews and 129 checks, tracked revisions, editor invites.", icon: "eye" },
    { name: "Test", blurb: "Protected beta and ARC reading rounds, watermarked.", icon: "badge" },
    { name: "Publish", blurb: "EPUB ebooks and print-ready paperbacks from a frozen edition.", icon: "book" },
  ],
};

/** Section label per chapter; defaults to "Programs owned". */
export const programLabels: Record<string, string> = {
  rallypay: "Initiatives owned",
  mythener: "Modules shipped",
};

/** How a portfolio chapter's entities fit together, for the entity map. */
export type Entity = { name: string; note?: string; href?: string; children?: { name: string; href?: string }[] };
export type EntityGroup = { name: string; blurb: string; work?: string; entities: Entity[] };
export type EntityMap = { parent: string; parentBlurb: string; parentHref?: string; parentWork?: string; groups: EntityGroup[] };

export const entityMaps: Record<string, EntityMap> = {
  "pmb-companies": {
    parent: "PMB Companies",
    parentHref: "https://perrybelcher.com/#about-perry",
    parentBlurb: "Owner-led portfolio. Two Central Texas facilities, sixteen brands, thirty million readers.",
    parentWork: "Chief of Staff across all of it: the operating cadence between the owner's decisions and delivery, and the safety and compliance program every site runs on.",
    groups: [
      {
        name: "Manufacturing, fulfillment & trade",
        blurb: "Sourcing, production floors, equipment, and shipping for the whole portfolio.",
        work: "Six divisions from an empty floor. $350K in equipment specified and installed. Suppliers who had refused us, reopened.",
        entities: [
          { name: "Wholesale Distributor", note: "Import and export", href: "https://wholesaledistributor.com/" },
          { name: "Spin Up Brands", note: "Manufacturing and fulfillment", href: "https://spinupbrands.com/" },
        ],
      },
      {
        name: "Brands",
        blurb: "The consumer brands, sold direct and through the storefronts.",
        work: "Sourced joint-venture deals to sell through the brands' lists.",
        entities: [
          {
            name: "Native Commerce",
            note: "Sixteen brands, thirty million readers",
            href: "https://nativecommerce.com/",
            children: [
              { name: "Homesteading", href: "https://homesteading.com/" },
              { name: "DIY Projects", href: "https://diyprojects.com/" },
              { name: "Survival Life", href: "https://survivallife.com/" },
              { name: "Garden Season", href: "https://gardenseason.com/" },
              { name: "Homemade Recipes", href: "https://homemaderecipes.com/" },
              { name: "Mighty Goodness", href: "https://mightygoodness.com/" },
              { name: "The Capitalist", href: "https://thecapitalist.com/" },
              { name: "Makeup Tutorials", href: "https://makeuptutorials.com/" },
              { name: "Cute Outfits", href: "https://cuteoutfits.com/" },
              { name: "Nail Designs", href: "https://naildesigns.com/" },
              { name: "Sewing.com", href: "https://sewing.com/" },
              { name: "Gun Carrier", href: "https://guncarrier.com/" },
            ],
          },
        ],
      },
      {
        name: "Storefronts",
        blurb: "Customer-facing businesses, each with its own trade and audience.",
        work: "B2B accounts and partnerships that added a third revenue channel. Four to six launches in flight at any time.",
        entities: [
          { name: "Raven Steelworks", href: "https://ravensteelworks.com/" },
          { name: "Hotshot Laser", href: "https://hotshotlaser.com/" },
          { name: "Carbonless Forms", href: "https://carbonlessforms.com/" },
          { name: "Black Label Fragrances" },
          { name: "Mother's Country Store", href: "https://sourdoughstarter.com/" },
          { name: "Custom Monogrammed", href: "https://custommonogrammed.com/" },
          { name: "and more" },
        ],
      },
      {
        name: "B2B services",
        blurb: "Business-to-business operations that sit apart from the consumer storefronts.",
        work: "Go-to-market for Doodle Videos.",
        entities: [
          {
            name: "Conventions.com",
            note: "Live-event planning for influencers and associations, on a revenue share",
            href: "https://conventions.com/",
          },
          {
            name: "Doodle Videos",
            note: "AI-assisted animated videos for business owners",
            href: "https://doodlevideos.com/",
          },
        ],
      },
    ],
  },
};

/** A single-role chapter's mandate, shown in place of the role selector. */
export type Mandate = { lane: string; lines: string[] };

export const mandates: Record<string, Mandate[]> = {
  mythener: [
    {
      lane: "Idea and specification",
      lines: [
        "Originated the product from my own needs as a series author.",
        "Wrote the specification: 74 numbered requirements, domain contracts, acceptance scenarios, and an implementation plan in dependency order.",
      ],
    },
    {
      lane: "Design",
      lines: [
        "Set the visual direction, ancient Greece meets the future, and locked it as the platform design system with a drift guard in the build.",
      ],
    },
    {
      lane: "Build and ship",
      lines: [
        "Shipped the first release with AI coding agents working from the spec, on Cloudflare Workers, D1, and R2.",
        "Six modules live: Build, Plan, Write, Review, Test, and Publish, with the Delphi Engine at the centre.",
      ],
    },
    {
      lane: "Go-to-market",
      lines: [
        "Priced the product in author, press, house, and enterprise tiers, free for every author until January 1, 2027.",
        "Editors, beta readers, and admins join free, so an author's whole team can work inside it.",
      ],
    },
  ],
  zenblis: [
    {
      lane: "Idea and product",
      lines: [
        "Originated the business idea: an AI-native marketplace and directory for senior care.",
        "Designed the entire front-end UI and UX.",
      ],
    },
    {
      lane: "Brand",
      lines: ["Wrote the brand system from scratch: palette, brand guidelines, and brand voice."],
    },
    {
      lane: "Go-to-market",
      lines: [
        "Built the go-to-market motion from zero and landed the first customers.",
        "Set up workflows for autonomous agents across research, content and SEO, social media, and community outreach.",
      ],
    },
    {
      lane: "Agent coordination",
      lines: [
        "Built a shared operating system in Google Drive and Sheets: research queues, editorial pipelines, social calendars, asset records, community prospects, and outreach logs.",
        "Defined persistent IDs and relationships so agents can match content to assets, preserve history, and check existing work before creating duplicates.",
      ],
    },
    {
      lane: "Publishing and measurement",
      lines: [
        "Documented CMS workflows covering template selection, audience placement, author attribution, citations, FAQs, and SEO metadata.",
        "Audited historical social activity and backfilled post, engagement, asset, and performance records to establish a baseline for future experiments.",
      ],
    },
    {
      lane: "Supply side",
      lines: [
        "Built the facility outreach engine that fills the supply side of the marketplace.",
        "Partner-run day to day, with an ongoing co-founder role.",
      ],
    },
  ],
  "pmb-companies": [
    {
      lane: "Follow-through",
      lines: [
        "Owned the follow-through on the owner's decisions, from vendor negotiation to first production run.",
        "Ran four to six concurrent launches at a time, most initiated on a few days of notice.",
      ],
    },
    {
      lane: "Build",
      lines: [
        "Stood up six production divisions from an empty floor: chemical repackaging, spin-cast metal and metal customization, apparel customization, wide-format print, fragrance blending, and soil amendments. Sourced raw materials, bought and installed equipment, laid out workstations, hired the staff.",
        "Specified, sourced, and installed roughly $350K in production equipment across two facilities. Retired an unprofitable line after a repair-versus-replace analysis.",
      ],
    },
    {
      lane: "Protect",
      lines: [
        "Wrote the company safety and compliance program from scratch: hazard communication, lockout/tagout, emergency action plans, PPE, respiratory protection. Drove adoption across every site.",
      ],
    },
    {
      lane: "Grow",
      lines: [
        "Negotiated and closed vendor contracts across chemicals, feedstock, and equipment, including reopening suppliers who had previously refused to sell to us.",
        "Opened B2B accounts and closed partnerships that added a third revenue channel to the business.",
        "Sourced joint-venture deals to sell through the Native Commerce lists.",
        "Go-to-market for Doodle Videos on the B2B side.",
      ],
    },
  ],
};
