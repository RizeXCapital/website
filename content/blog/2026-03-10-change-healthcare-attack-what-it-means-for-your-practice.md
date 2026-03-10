---
title: "What the Change Healthcare Attack Means for Your Practice"
date: "2026-03-10"
author: "Navid M. Rahman, PE"
category: "sovereign-rcm"
excerpt: "The largest healthcare data breach in U.S. history wasn't a sophisticated attack. It was a structural failure -- one that was entirely predictable, and one your practice may still be exposed to."
slug: "change-healthcare-attack-what-it-means-for-your-practice"
keywords:
  - Change Healthcare cyberattack
  - Change Healthcare breach
  - healthcare data breach 2024
  - medical practice cybersecurity
  - on-premise medical billing security
  - healthcare ransomware attack
  - HIPAA security rule
  - medical billing infrastructure
featured: true
image: "/blog/change-healthcare-hero.svg"
---

I've spent my career designing systems that cannot fail. Bridges, water treatment plants, stormwater infrastructure. When you sign a drawing as a Professional Engineer, you're certifying that what you've designed will carry the loads it was built for -- including the ones nobody anticipated.

I've been watching the healthcare IT space for the past two years through those same eyes. What I saw in the Change Healthcare attack is something I'd recognize on any infrastructure review: a non-redundant critical node with no backup load path, sitting behind a door with no lock.

## What Change Healthcare Actually Was

Most physician practices know Change Healthcare as the company that suddenly couldn't process their claims in February 2024. What the headlines didn't fully convey is just how much of the U.S. healthcare revenue cycle was flowing through a single point.

At the time of the attack, Change Healthcare processed approximately 40% of all U.S. medical claims -- roughly 15 billion transactions per year representing $1.5 trillion in health claims. The company touched one in every three patient records in the United States. It handled eligibility verification, claims submission, prior authorization, pharmacy benefits, electronic prescribing, and electronic payments. For the majority of U.S. practices, there was no alternative route. Claims went through Change, or they didn't go at all.

![How healthcare claims flowed through Change Healthcare -- and why that concentration created catastrophic risk](/blog/change-healthcare-hub-spoke.svg)

In structural engineering, we call this a non-redundant system. A single load path. If the critical member fails, the structure comes down. We've seen this pattern before: the 2003 Northeast power outage knocked out electricity for 55 million people because a software bug in one Ohio control room triggered a cascading failure across an entire interconnected grid. The design assumption was that no single node could fail catastrophically. That assumption was wrong.

Change Healthcare was the Ohio node.

## How It Failed

On February 12, 2024, an attacker used stolen credentials to access a Citrix remote desktop portal that Change Healthcare had left exposed to the internet. There was no multi-factor authentication on this portal. A username and a password were all it took.

The attacker then spent nine days moving through the network undetected, escalating privileges, mapping internal systems, and identifying data stores. No alerts fired. On February 21, ransomware was deployed across the infrastructure, and Change Healthcare took its systems offline.

The attacker group was ALPHV/BlackCat, a ransomware-as-a-service operation with Russian ties. They claimed to have exfiltrated 6 terabytes of data. UnitedHealth Group, which had acquired Change Healthcare in 2022 for $13 billion, paid a ransom of 350 bitcoin -- roughly $22 million -- to recover access.

The payment did not resolve the situation. ALPHV leadership then executed what security researchers call an exit scam: they kept the $22 million and disappeared, leaving their own affiliate unpaid. That affiliate partnered with a new group called RansomHub and attempted a second extortion using the same stolen data. The 6 terabytes of patient records remained in criminal hands.

The final breach count, reported to the HHS Office for Civil Rights in July 2025, was 192.7 million individuals. More than half the U.S. population. The largest healthcare data breach in history.

UHG CEO Andrew Witty testified before the Senate Finance Committee and House Energy and Commerce Committee on May 1, 2024. When asked about the missing MFA, Senator Ron Wyden called it a failure of "cybersecurity 101." I'd call it the equivalent of designing a dam with no overflow spillway and being surprised when it overtopped.

![Attack and recovery: nine months in six events](/blog/change-healthcare-attack-timeline.svg)

## What It Did to Practices

The outage began February 21. Full clearinghouse services were not restored until November 2024 -- nine months later.

In the weeks immediately following the attack, the AMA surveyed approximately 1,400 physician practices, most with fewer than 10 physicians. Eighty percent reported lost revenue from unpaid claims. Seventy-eight percent couldn't submit claims at all. Fifty-five percent used personal funds to cover practice expenses. Thirty-one percent could not make payroll. More than 77% were still experiencing active disruption when surveyed, five to six weeks after the attack began.

![By the numbers: how the Change Healthcare outage hit practices and hospitals](/blog/change-healthcare-practice-impact.svg)

On the hospital side, the American Hospital Association found that 94% of hospitals reported financial impact. Nearly 60% reported losses of $1 million per day or more during the outage. Kodiak Solutions tracked a $6.3 billion drop in submitted claims from their clients alone in the first three weeks.

The ground-level reporting was stark. One rural practice owner, as reported by Fortune, was carrying bags of cash onto airplane flights to make sure employees got paid. Another took out emergency loans at 50% interest rates to cover payroll. Survey respondents wrote things like: "[This] may bankrupt our practice of 50 years in this rural community." None of these were edge cases. The AMA's second survey, conducted in late April, found that nearly two-thirds of respondents were still using personal funds to cover expenses.

UnitedHealth Group eventually extended $8.9 billion in interest-free loans to affected providers, and CMS disbursed over $3.2 billion in accelerated and advance payments through an emergency program. UHG's total reported costs from the incident came to $3.1 billion for the full year 2024. That figure includes the ransom, the remediation, the provider loans, and legal exposure that is still accumulating.

## The Structural Lesson

If you gave this scenario to a second-year engineering student -- a single company processing 40% of all U.S. healthcare claims, with internet-facing remote access protected by a single password -- and asked them to identify the failure mode, they'd find it in under a minute.

In structural engineering, we say cracks propagate before they fail. A beam doesn't snap the moment the crack forms -- it grows, invisibly, until the remaining load-bearing section can no longer carry the applied force. Nine days of undetected lateral movement inside the network of a company processing nearly half a trillion dollars in annual claims is the equivalent of a crack propagating across a critical structural member with no inspection regime in place to catch it.

Centralized systems are efficient. They are also brittle. The more load you concentrate through a single node, the more catastrophic the consequences when that node fails. This is true for power grids, for single-span highway bridges, and for clearinghouses that route the financial lifeblood of hundreds of thousands of healthcare providers.

The attack itself was not sophisticated. The attacker did not exploit an unknown vulnerability. They logged into a portal that was left unlocked. The absence of basic monitoring and the absence of MFA together created an attack surface that any competent security reviewer would have flagged immediately. What made the damage total was the architecture: because Change served as the dominant routing node for U.S. claims, there was no failover. Every connected practice went down simultaneously. A distributed design -- one where claims route through multiple clearinghouses with automatic failover -- would have contained the damage. A practice using on-premise billing infrastructure that doesn't route PHI through external clearinghouses at all would have been unaffected entirely.

![Why architecture determines blast radius: cloud clearinghouse vs. on-premise AI appliance](/blog/change-healthcare-architecture-comparison.svg)

## What This Means for Your Practice

The breach data from Change Healthcare contained names, Social Security numbers, insurance IDs, medical diagnoses, prescription records, and billing codes. For the 192.7 million people in that dataset, that information is now in criminal hands and has been for over a year. No regulatory response changes that.

What the regulatory response does address is what comes next. HHS proposed significant updates to the HIPAA Security Rule in December 2024, including mandatory MFA, mandatory encryption, and required penetration testing. The Health Care Cybersecurity and Resiliency Act of 2025 has bipartisan support in Congress. These changes will move through eventually, and when they do, practices will be expected to evaluate their vendors with the same scrutiny regulators now apply to the vendors themselves.

If your billing currently depends on a cloud-based platform or clearinghouse, you are trusting that vendor's security posture, their network monitoring, their MFA policies, and their incident response capability. You are also sharing systemic risk with every other customer on that platform. Change Healthcare served hundreds of thousands of providers simultaneously. When it failed, they all failed simultaneously, regardless of how well any individual practice had managed its own security hygiene.

An on-premise billing system, particularly one without persistent external connectivity, eliminates this exposure at the source. There is no Citrix portal for a remote attacker to authenticate against. Stolen credentials for your local system cannot be used from a server in another country. PHI stays inside your building, under your physical control, on hardware you own. If a breach hits a major clearinghouse next quarter, your practice keeps running.

That architecture is what we built [Sovereign RCM](/sovereign-rcm) around. On-premise AI billing, inside the practice, with PHI that never routes through external cloud infrastructure. The system handles claim submission, coding review, and denial prevention without putting your patient data on a shared vendor network that is, by design, reachable from anywhere on earth.

---

Two years after the attack, Change Healthcare has been rebuilt. The clearinghouse is operational. The $3.1 billion in costs has been absorbed. The 192.7 million people whose records were taken are still living with that exposure, and that won't change.

The structural problem -- dependence on centralized, internet-accessible billing infrastructure -- remains the dominant model in U.S. healthcare. That's worth accounting for when you're deciding how to manage your revenue cycle.

If you'd like to understand how on-premise billing compares for a practice your size, we'd like to talk.

**[Request a Billing Analysis](/contact)**

---

## Sources

1. TechCrunch. *How the Ransomware Attack at Change Healthcare Went Down: A Timeline.* January 2025.
2. BleepingComputer. *Change Healthcare Hacked Using Stolen Citrix Account With No MFA.* 2024.
3. HIPAA Guide. *Change Healthcare Data Breach: 192.7 Million Affected.* 2025.
4. IBM. *Change Healthcare: The $22 Million Ransomware Payment.* 2024.
5. Barracuda. *Change Healthcare and RansomHub Redefine Double Extortion.* April 2024.
6. American Medical Association. *Change Healthcare Cyberattack Survey Results.* 2024.
7. American Hospital Association. *Survey: Change Healthcare Cyberattack Significantly Disrupts Patient Care.* March 2024.
8. Senate Finance Committee. *Hacking America's Health Care: Assessing the Change Healthcare Cyber Attack and What's Next.* May 2024.
9. Becker's Hospital Review. *The Financial Toll of the Change Healthcare Hack: 7 Numbers.* 2024.
10. Office of Financial Research, U.S. Treasury. *OFR Brief: The Change Healthcare Cyberattack and Systemic Risk.* 2024.
11. CMS. *Change Healthcare/Optum Payment Disruption Accelerated Payments Fact Sheet.* 2024.
12. The Register. *Change Healthcare's Clearinghouse Services Restored After Nine Months.* November 2024.
13. HHS Office for Civil Rights. *HIPAA Security Rule Notice of Proposed Rulemaking.* December 2024.
14. Fortune. *The Change Healthcare Cyberattack Is a Catastrophe for Small Practices.* April 2024.
15. SecurityScorecard. *Change Healthcare Ransomware Attack Spotlights Single Point of Failure.* 2024.
16. Economic Liberties Project. *Change Healthcare Fact Sheet.* March 2024.
