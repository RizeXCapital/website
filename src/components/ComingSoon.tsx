import Link from "next/link";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import { LOGO_LIGHT, LOGO_DARK } from "@/lib/brand";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <>
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <Image src={LOGO_LIGHT} alt="Sovereign RCM" width={1513} height={357} className="h-16 w-auto dark:hidden" />
          <Image src={LOGO_DARK}  alt="Sovereign RCM" width={1495} height={348} className="h-16 w-auto hidden dark:block" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-navy dark:text-white">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-charcoal-light dark:text-gray-300">
          {description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-hover"
          >
            Get in Touch
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-teal hover:text-teal dark:border-dark-border dark:text-gray-300 dark:hover:border-teal-dark dark:hover:text-teal-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
    <SectionDivider variant="light" />
    </>
  );
}
