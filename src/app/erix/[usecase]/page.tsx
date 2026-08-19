import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { USE_CASES, getUseCaseBySlug, getUseCaseSlugs } from "@/lib/use-cases";
import {
  getModuleSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  SEO_CONSTANTS,
} from "@/lib/jsonld";

const { BASE_URL } = SEO_CONSTANTS;

/* ──────────────────────────────────────────────────────────────────────
   /erix/[usecase] — ERIX industry landing pages (real estate, healthcare…).
   Distinct search intent from /platform/crm; SoftwareApplication + FAQ +
   Breadcrumb JSON-LD, statically generated.
─────────────────────────────────────────────────────────────────────── */

interface Params {
  usecase: string;
}

export function generateStaticParams(): Params[] {
  return getUseCaseSlugs().map((usecase) => ({ usecase }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { usecase } = await params;
  const u = getUseCaseBySlug(usecase);
  if (!u) return { title: "Use case not found" };

  const title = `ERIX for ${u.industry}: WhatsApp CRM (India)`;
  return {
    title,
    description: u.description,
    keywords: [...u.searchQueries, "ERIX", "ECODrIx", "WhatsApp CRM"],
    alternates: { canonical: `${BASE_URL}/erix/${u.slug}` },
    openGraph: {
      title: `${title} | ECODrIx`,
      description: u.description,
      url: `${BASE_URL}/erix/${u.slug}`,
      type: "website",
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { usecase } = await params;
  const u = getUseCaseBySlug(usecase);
  if (!u) notFound();

  const others = USE_CASES.filter((x) => x.slug !== usecase);

  return (
    <div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={{ "--uc": u.color } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getModuleSchema({
              slug: "crm",
              name: `ERIX for ${u.industry}`,
              brand: "ERIX-CRM",
              description: u.description,
              features: u.solutions.map((s) => s.title),
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "ERIX", url: "/platform/crm" },
              { name: u.industry, url: `/erix/${u.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled JSON-LD data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(u.faqs)),
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[700px] h-[400px] blur-[14px] bg-[conic-gradient(from_270deg_at_50%_0%,transparent_55deg,color-mix(in_srgb,var(--uc)_20%,transparent)_85deg,color-mix(in_srgb,var(--uc)_7%,transparent)_115deg,transparent_155deg)]"
          aria-hidden
        />
        <div className="wrapper relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-subtle mb-6"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/platform/crm"
              className="hover:text-foreground transition-colors"
            >
              ERIX
            </Link>
            <span>/</span>
            <span className="text-foreground">{u.industry}</span>
          </nav>

          <div className="pill mb-6 text-(--uc) border-[color-mix(in_srgb,var(--uc)_25%,transparent)] bg-[color-mix(in_srgb,var(--uc)_6%,transparent)]">
            ERIX for {u.industry}
          </div>
          <h1 className="font-display font-black text-foreground mb-6 max-w-4xl text-[clamp(2.2rem,6vw,4rem)] tracking-[-0.04em] leading-[1.05]">
            The WhatsApp CRM for {u.industry.toLowerCase()} in India.
          </h1>
          <p className="max-w-3xl leading-relaxed mb-8 text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
            {u.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-accent-foreground text-sm bg-(--uc) rounded-none"
            >
              Start 14-day free trial <ArrowRight size={16} />
            </Link>
            <Link
              href="/platform/crm"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-foreground text-sm border border-foreground/15 hover:border-foreground/30 transition-colors"
            >
              Explore ERIX CRM
            </Link>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">The challenge</div>
          <h2 className="font-display font-black text-foreground mb-10 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            What slows {u.industry.toLowerCase()} teams down.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {u.problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 p-5 bg-surface border border-foreground/5 rounded-none"
              >
                <AlertCircle
                  size={16}
                  className="shrink-0 mt-0.5 text-subtle"
                />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-6">
        <div className="wrapper">
          <div className="pill mb-6">How ERIX helps</div>
          <h2 className="font-display font-black text-foreground mb-10 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            Built for {u.industry.toLowerCase()}.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {u.solutions.map((s) => (
              <div
                key={s.title}
                className="p-6 bg-foreground/2 border border-foreground/8 rounded-none"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Check size={16} className="text-(--uc)" />
                  <h3 className="text-foreground font-bold text-base">
                    {s.title}
                  </h3>
                </div>
                <p className="text-subtle text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {u.outcomes.map((o) => (
              <span
                key={o}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-[color-mix(in_srgb,var(--uc)_5%,transparent)] border border-[color-mix(in_srgb,var(--uc)_19%,transparent)]"
              >
                <Check size={13} className="text-(--uc)" /> {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 sep-top bg-background">
        <div className="wrapper">
          <div className="pill mb-6">Common questions</div>
          <h2 className="font-display font-black text-foreground mb-12 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
            ERIX for {u.industry.toLowerCase()}, answered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
            {u.faqs.map(({ q, a }) => (
              <div key={q} className="p-8 bg-surface">
                <h3 className="text-foreground font-bold mb-3 text-base">
                  {q}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other use cases */}
      {others.length > 0 && (
        <section className="py-20 px-6">
          <div className="wrapper">
            <div className="pill mb-6">More industries</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/erix/${o.slug}`}
                  className="group flex items-center justify-between p-6 border border-foreground/8 hover:border-foreground/20 transition-colors bg-foreground/2 rounded-none"
                >
                  <div>
                    <div className="text-foreground font-bold text-base mb-1">
                      ERIX for {o.industry}
                    </div>
                    <div className="text-subtle text-xs">
                      {o.searchQueries[0]}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-subtle group-hover:text-foreground group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
