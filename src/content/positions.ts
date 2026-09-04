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
      period: "Apr 2026 – Present",
      location: "Salado, Texas · Hybrid",
      bullets: [
        "Right hand to the owner across a portfolio of 16 brands and two facilities. Own the follow-through on the initiatives he decides, from vendor negotiation to first production run.",
        "Stood up six new production divisions from an empty floor: chemical repackaging, spin-cast metal and metal customization, apparel customization, wide-format print, fragrance blending, and soil amendments. Sourced raw materials, bought and installed equipment, laid out workstations, hired the staff.",
        "Run four to six concurrent launches at a time, most initiated on a few days of notice.",
        "Negotiated and closed vendor contracts across chemicals, feedstock, and equipment, including reopening suppliers who had previously refused to sell to us.",
        "Opened B2B accounts and closed partnerships that added a third revenue channel to the business.",
        "Wrote the company safety and compliance program from scratch: hazard communication, lockout/tagout, emergency action plans, PPE, respiratory protection. Drove adoption across every site.",
        "Specified, sourced, and installed roughly $350K in production equipment across two facilities. Ran repair-versus-replace analysis on legacy equipment and retired an unprofitable line.",
      ],
      tags: ["Operations", "Manufacturing", "Vendor Negotiation", "Safety & Compliance", "Launches"],
    },
  ],

  zenblis: [
    {
      title: "Co-Founder",
      period: "2026 – Present",
      location: "Remote",
      bullets: [
        "Built the go-to-market motion from zero.",
        "Designed the content and SEO system that drives organic discovery.",
        "Built the facility outreach engine that fills the supply side of the marketplace.",
        "Partner-run day to day, with an ongoing co-founder role.",
      ],
      tags: ["Go-to-Market", "Content & SEO", "Outreach", "Marketplace"],
    },
  ],
};

/** Chapter-level notes that do not belong to a single position. */
export const highlights: Record<string, string[]> = {
  "marine-corps": [
    "Eight years of service, May 2012 to June 2020. Honorably discharged.",
    "Navy and Marine Corps Commendation Medal, twice.",
  ],
  rallypay: [
    "Five years, eleven months across three roles, reporting to the CEO throughout.",
    "Named on the filing for every merchant acquirer examination. None failed.",
    "Operating cadence tracked in Asana, with Slack carrying the day-to-day conversation.",
    "Retained after the transition to advise on operations, risk, and compliance continuity.",
  ],
};

/** Programs owned within a chapter, each rendered as a hexagon with an icon. */
export type Program = {
  name: string;
  blurb: string;
  icon: "parachute" | "clipboard" | "respirator" | "ordnance" | "sigma" | "shield" | "badge" | "nodes" | "chart" | "funnel";
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
};

/** Section label per chapter; defaults to "Programs owned". */
export const programLabels: Record<string, string> = {
  rallypay: "Initiatives owned",
};
