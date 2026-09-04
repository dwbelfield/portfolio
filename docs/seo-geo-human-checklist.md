# derekbelfield.com — Human SEO/GEO checklist

**Site:** https://derekbelfield.com
**Prepared:** 2026-09-04

This checklist holds the actions that require the owner, account access, or a
decision. Claude prepared the site-side work (canonicals, sitemap, robots,
JSON-LD, Open Graph card, `llms.txt`) in the same pass; see "Already handled"
at the bottom.

## Approved identity (starting point)

- Public name: **Derek Belfield**
- Contact: dwbelfield@gmail.com · linkedin.com/in/dwbelfield
- Location shown: Dallas, TX (city only; no street address is published)
- Website: https://derekbelfield.com (canonical, trailing slashes)

> Every public fact below is already on the site. If any of it is wrong, fix
> the content model first, then the profiles.

## Priority 1 — One canonical origin

- [ ] **Cloudflare → SSL/TLS → Edge Certificates → Always Use HTTPS: On.** Today `http://derekbelfield.com` serves the site directly instead of redirecting, so engines can index two copies of every page.
- [ ] **Add `www.derekbelfield.com`.** Workers → portfolio → Settings → Domains & Routes → add the custom domain. Then in the zone's Rules, add a redirect from `www` to the bare domain (301). Right now `www` does not resolve at all, which reads as a broken link when someone types it.
- [ ] **Confirm the `workers.dev` copy is off.** The code now sets `workers_dev: false`, which takes effect on the next deploy. Verify `https://portfolio.dwbelfield.workers.dev/` returns an error afterward. Until then it serves a full duplicate of the site.

## Priority 2 — Entity decisions

- [ ] Confirm the exact public wording for the current employer. The site uses **Wholesale Distributor** with **PMB Companies** as the parent. If the company prefers a different public name, or does not want to be named, say so.
- [ ] Confirm Zenblis may be linked at zenblis.com and described as "AI-native senior care marketplace" with you as co-founder.
- [ ] Confirm the RallyPay Crunchbase link is the right profile (crunchbase.com/organization/rally-org).
- [ ] Confirm the claims register below. Each of these is on the site now and is the kind of claim engines and readers will test:
  - "Three-time bestselling science fiction author" (which lists, which titles).
  - "Never failed an audit or a regulatory examination, in 14 years."
  - The RallyPay metrics: 99% fewer card-testing attacks, 32% fewer chargebacks, 45% infrastructure cost, 3.4% → 44% same-day resolution, $375.5K fraud prevented, $1M UI/UX overhaul.
  - The Marine Corps metrics: 15.1% → 98.3% ready-for-issue, 36 → 3 months, 90 → 7 days, 295 students, $1.4M assets, 60 people, 46 direct reports.
  - "Adopted as the model across the Navy and Marine Corps."
  - "$350K in production equipment," "six divisions from an empty floor," "30M subscribers," "16 brands."
- [ ] Decide whether the resume PDF should be linked from the About page. If yes, it must match the site word for word on dates, titles, and numbers.

## Priority 3 — Citation consistency

- [ ] **LinkedIn.** Make the headline, current role, dates, and company names match the site: Marine Corps May 2012 – Jun 2020; RallyPay May 2020 – Mar 2026 (Director of Operations, COO, Consultant); Wholesale Distributor / PMB Companies Apr 2026 – present; Zenblis 2026 – present. Add derekbelfield.com as the website.
- [ ] **Crunchbase.** If you have a person profile, link the site and align titles.
- [ ] **GitHub, X, author pages, Amazon author profile.** Wherever you have a public bio, use the same one-line entity statement and link the site. Record each in the citation registry below.
- [ ] **Do not create** any profile for a company you do not own or represent.

| Surface | URL | Name shown | Site linked | Status | Next review |
| --- | --- | --- | --- | --- | --- |
| LinkedIn | linkedin.com/in/dwbelfield | | | | |
| Crunchbase | | | | | |
| GitHub | | | | | |
| Author profile | | | | | |

## Priority 4 — Search Console and Bing Webmaster Tools

- [ ] Verify `derekbelfield.com` in Google Search Console (domain property, via a DNS TXT record in Cloudflare).
- [ ] Submit `https://derekbelfield.com/sitemap.xml`.
- [ ] Inspect `/`, `/work/`, `/about/`, `/consulting/`, and the four chapter pages; request indexing once each shows the canonical correctly.
- [ ] Verify the domain in Bing Webmaster Tools (it can import from Search Console) and submit the sitemap.
- [ ] After two weeks, review Coverage, Enhancements, and Manual actions.

## Priority 5 — Conversion operations

- [ ] Send yourself a test message through the Consulting page's email button and confirm the subject and template arrive intact.
- [ ] Decide whether you want a real contact form (needs an email provider key; about half an hour to wire into the Worker).
- [ ] Confirm the email address you want public. The site uses the resume address, not the Zenblis one.

## Priority 6 — Authority

- [ ] Ask one or two former colleagues or clients for a LinkedIn recommendation that describes specific work; recommendations are citations too.
- [ ] If a consulting engagement can be named (Sellamations, Spinup Brands), get written permission and add a "worked with" line to the Consulting page.
- [ ] Run the blind benchmark below before and after the profile work.

## Blind benchmark (run in fresh sessions, one engine at a time)

Direct: "Who is Derek Belfield?" · "Derek Belfield RallyPay" · "Derek Belfield Marine Corps" · "Derek Belfield Zenblis" · "Derek Belfield consultant Dallas" · "Is Derek Belfield a bestselling author?"

Category: "Fractional COO for a payments startup in Dallas" · "Chief of staff consultant for a consumer products company in Texas" · "Who can write an OSHA safety program for a small chemical repackager?" · "Operations consultant who has stood up production lines" · "AI-first operations consultant" · "Lean Six Sigma consultant with military logistics background"

Record for each: mentioned / site cited / answer correct / who was cited instead.

## Already handled in code (this pass)

- Self-referencing canonical on every page, with the trailing-slash form.
- `sitemap.xml` and `robots.txt` generated from the route list and content model at build time.
- `llms.txt` rendered from the content model: entity statement, work summary, page index.
- `Person` and `WebSite` JSON-LD in the root layout, using only facts already on the site.
- Open Graph card at `/og.png` and large-image Twitter card.
- A meta description under 155 characters (the long intro was being used before).
- `workers_dev` and preview URLs disabled in the Worker config.

## Publication rule

Do not add unconfirmed employer names, client names, metrics, awards, bestseller
claims, or relationships to the site, the structured data, `llms.txt`, LinkedIn,
or any profile. If a claim is on the site, its evidence should be one message
away.
