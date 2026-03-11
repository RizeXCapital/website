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

I've spent my career designing systems that cannot fail. Bridges and Roadway infrastructure. When you sign a drawing as a Professional Engineer, you're certifying that what you've designed will carry the loads it was built for -- including the ones nobody anticipated.

I've been watching the healthcare IT space for the past two years through those same eyes. What I saw in the Change Healthcare attack is something I'd recognize on any infrastructure review: a non-redundant critical node with no backup load path, sitting behind a door with no lock.

## What Change Healthcare Actually Was

Most physician practices know Change Healthcare as the company that suddenly couldn't process their claims in February 2024. What the headlines didn't fully convey is just how much of the U.S. healthcare revenue cycle was flowing through a single point.

At the time of the attack, Change Healthcare processed approximately 40% of all U.S. medical claims -- roughly 15 billion transactions per year representing $1.5 trillion in health claims. The company touched one in every three patient records in the United States. It handled eligibility verification, claims submission, prior authorization, pharmacy benefits, electronic prescribing, and electronic payments. For the majority of U.S. practices, there was no alternative route. Claims went through Change, or they didn't go at all. Change Healthcare was the Ohio node.

![How healthcare claims flowed through Change Healthcare -- and why that concentration created catastrophic risk](/blog/change-healthcare-hub-spoke.svg)

## How It Failed

On February 12, 2024, an attacker used stolen credentials to access a Citrix remote desktop portal that Change Healthcare had left exposed to the internet. There was no multi-factor authentication on this portal. A username and a password were all it took.

The attacker then spent nine days moving through the network undetected, escalating privileges, mapping internal systems, and identifying data stores. No alerts fired. On February 21, ransomware was deployed across the infrastructure, and Change Healthcare took its systems offline.

The attacker group was ALPHV/BlackCat, a ransomware-as-a-service operation. They claimed to have exfiltrated 6 terabytes of data. UnitedHealth Group, which had acquired Change Healthcare in 2022 for $13 billion, paid a ransom of roughly $22 million. The payment didn't end the exposure. A second extortion attempt followed using the same stolen data, and the 6 terabytes of patient records stayed in criminal hands.

The final breach count, reported to the HHS Office for Civil Rights in July 2025, was 192.7 million individuals -- more than half the U.S. population.

UHG CEO Andrew Witty testified before the Senate Finance Committee and House Energy and Commerce Committee on May 1, 2024. When asked about the missing MFA, Senator Ron Wyden called it a failure of "cybersecurity 101." I'd call it the equivalent of designing a dam with no overflow spillway and being surprised when it overtopped.

![Attack and recovery: nine months in six events](/blog/change-healthcare-attack-timeline.svg)

## What It Did to Practices

The outage began February 21. Full clearinghouse services were not restored until November 2024 -- nine months later.

In the weeks immediately following the attack, the AMA surveyed approximately 1,400 physician practices, most with fewer than 10 physicians. Eighty percent reported lost revenue from unpaid claims. Seventy-eight percent couldn't submit claims at all. Fifty-five percent used personal funds to cover practice expenses. Thirty-one percent could not make payroll. More than 77% were still experiencing active disruption when surveyed, five to six weeks after the attack began.

![By the numbers: how the Change Healthcare outage hit practices and hospitals](/blog/change-healthcare-practice-impact.svg)

One rural practice owner was carrying bags of cash onto flights to make payroll. Another took out emergency loans at 50% interest rates. A second AMA survey in late April found nearly two-thirds of respondents still using personal funds to cover expenses.

## The Structural Lesson

If you gave this scenario to a second-year engineering student -- a single company processing 40% of all U.S. healthcare claims, with internet-facing remote access protected by a single password -- and asked them to identify the failure mode, they'd find it in under a minute.

In structural engineering, we say cracks propagate before they fail. Nine days of undetected lateral movement inside the network of a company processing nearly half a trillion dollars in annual claims is the equivalent of a crack propagating across a critical structural member with no inspection regime in place to catch it.

The attack itself was not sophisticated. The attacker did not exploit an unknown vulnerability. They logged into a portal that was left unlocked. The absence of basic monitoring and the absence of MFA together created an attack surface that any competent security reviewer would have flagged immediately. What made the damage total was the architecture: because Change served as the dominant routing node for U.S. claims, there was no failover. Every connected practice went down simultaneously. A distributed design -- one where claims route through multiple clearinghouses with automatic failover -- would have contained the damage. A practice using on-premise billing infrastructure that doesn't route PHI through external clearinghouses at all would have been unaffected entirely.

![Why architecture determines blast radius: cloud clearinghouse vs. on-premise AI appliance](/blog/change-healthcare-architecture-comparison.svg)

## What This Means for Your Practice

The breach data from Change Healthcare contained names, Social Security numbers, insurance IDs, medical diagnoses, prescription records, and billing codes. For the 192.7 million people in that dataset, that information is now in criminal hands and has been for over a year. No regulatory response changes that.

What the regulatory response addresses is what comes next. HHS proposed significant updates to the HIPAA Security Rule in December 2024, including mandatory MFA, mandatory encryption, and required penetration testing. Practices will be expected to evaluate their vendors with the same scrutiny regulators now apply to the vendors themselves.

If your billing currently depends on a cloud-based platform or clearinghouse, you are trusting that vendor's security posture, their network monitoring, their MFA policies, and their incident response capability. You are sharing systemic risk with every other practice on that platform. When it fails -- and the historical record on this is consistent -- they all fail together.

This is the structural problem that an air-gapped billing system solves. "Air-gapped" is not a marketing phrase. It means the system processes PHI on hardware inside your building, disconnected from the public internet during billing operations. The AI inference runs locally on the appliance. Patient records are never transmitted to an external server for processing. There is no inbound connection path -- no remote desktop portal, no cloud API endpoint, no shared network node that an attacker can reach from outside.

The attack surface comparison is concrete: a cloud billing platform exposes a login portal reachable from anywhere on earth, shared infrastructure with thousands of other practices, and a vendor whose security posture you cannot audit. An air-gapped appliance exposes none of those. You can't exfiltrate data that isn't there.

The HIPAA regulatory pressure also lands differently when you own your infrastructure. Under cloud billing, your exposure includes your vendor's security posture -- you are a covered entity using a business associate, and a failure at the business associate level is a failure on your record. When the infrastructure is inside your building, under your physical control, you are not downstream of someone else's incident response team.

That architecture is what we built [Sovereign RCM](/sovereign-rcm) around. On-premise AI billing, inside the practice, with PHI that never routes through external cloud infrastructure. The system handles claim generation, coding review, and denial prevention without putting your patient data on a shared vendor network reachable from anywhere on earth. The next Change Healthcare will happen. Whether your practice is caught in it is a question of architecture.

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
