import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="font-heading text-4xl font-bold text-navy">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-charcoal-light">
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
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-teal hover:text-teal"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
