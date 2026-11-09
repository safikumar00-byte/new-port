# Sunil Kumar Reddy — Portfolio Data Pack

This package replaces the reference designer's personal data with Sunil Kumar Reddy's supplied master profile while preserving the existing portfolio's data-driven approach.

## Included files

- `portfolio.ts` — public identity, hero copy, bio, contact and social links.
- `experiences.ts` — TekWissen, freelance, Intexm and separate additional hospital experience.
- `projects.ts` — Live Tools-compatible project cards for the existing grid.
- `caseStudies.ts` — detailed case-study content for the main portfolio projects.
- `freelanceClients.ts` — six independent freelance clients and confirmed deliverable types.
- `skills.ts` — grouped capabilities and a compact toolkit list.
- `education.ts` — education history.
- `certifications.ts` — certifications and internships.
- `articles.ts` — intentionally empty until Sunil supplies actual article links.
- `profileDetails.ts` — languages, interests, working approach, resume-stated metrics and verification notes.
- `github.ts` — empty verified-data placeholder; do not reuse the reference owner's contribution history.

## Integration

Copy the files into the existing project's `src/data/` directory. Review existing imports and component types before replacing files.

The original reference data used `portfolioData`, `liveTools`, `caseStudies`, `articles`, `toolkitItems` and `experiences`. Those principal exports are retained where applicable. New exports are available for deeper profile sections.

### Suggested section additions

To represent the profile in depth without overloading the first screen, keep the existing reference order and add expandable/secondary sections:

1. Hero + profile + concise About.
2. Selected Work / Live Tools — use `liveTools`.
3. Case Studies — use `caseStudies`.
4. Experience — use `experiences`, with `additionalExperience` in a visually separate subsection.
5. Freelance Clients — use `freelanceClients`.
6. Skills & Toolkit — use `skillGroups` and `toolkitItems`.
7. Education & Certifications — use `education`, `certifications`, `internships`.
8. Writing — only when real writing links are provided.
9. Contact + Footer.

## Image assets to add

The files reference these replaceable paths. Add approved assets or change the paths:

- `/images/sunil-profile.jpg`
- `/images/projects/karyotica-cover.jpg`
- `/images/projects/visionicx-cover.jpg`
- `/images/projects/core-volt-matrix-cover.jpg`
- `/images/projects/intexm-fintech-cover.jpg`
- `/images/projects/trade-signals-cover.jpg`
- `/images/projects/tekwissen-communication-cover.jpg`
- `/images/clients/client-work-placeholder.jpg`

Do not use the old Arunkumar images for Sunil's work. Until real project visuals are supplied, use neutral placeholders clearly marked as placeholders.

## Important factual and privacy rules

- Public display name: Sunil Kumar Reddy.
- Professional positioning: Multidisciplinary Designer & Developer.
- Current role: Graphic Designer at TekWissen Software Pvt. Ltd. (December 2025–Present).
- Location: Visakhapatnam, Andhra Pradesh, India.
- Do not include date of birth on the public portfolio.
- Phone is included in the data but hidden by default. Verify before publishing.
- Email is the most frequently listed resume address but marked as needing verification.
- Do not publish the alternate email unless the user confirms it.
- Do not show the old portfolio URLs as current without confirmation.
- Do not include Pravishree Design Co. as direct professional experience.
- Keep Sagara Durga Hospital in Additional Experience, not core design experience; its dates conflict and remain unconfirmed.
- Do not claim unverified project launches, client results, metrics, awards or testimonials.
- Karyotica backend, CI/CD and deployment are described as collaborative contributions, not solely Sunil's work.
- Intexm brands are attributed to Intexm Media employment, not freelance clients.
- Student Care, Quanthex, Ani Visa Services, Krea Property Services, Travellers Bridge and Nortiqa are independent freelance clients; confirmed deliverables are graphic design and video editing.
- Visionicx figures (40+ screens, 200+ APIs, four weeks) are resume-recorded and should be validated before prominent public claims.
- Cross-Device Trade Signal Application ownership/engagement type is unconfirmed.
- Older resume projects remain excluded from the active gallery until confirmed.

## Compatibility note

The existing app's component props may be narrower than the expanded data interfaces. If TypeScript reports a mismatch, update the component interfaces to accept the added optional fields or map the data to the component's existing view model. Do not delete profile details simply to silence type errors.
