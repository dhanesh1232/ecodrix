import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Shield, User, AlertCircle, Scale, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ECODrIx Terms of Service. Understand your rights and responsibilities when using our unified business infrastructure platform. Clear terms for account usage, data ownership, and service limitations.",
  alternates: { canonical: "https://ecodrix.com/terms" },
  openGraph: {
    title: "Terms of Service | ECODrIx",
    description:
      "Understand your rights and responsibilities when using the ECODrIx platform. Clear terms for account usage and data ownership.",
    url: "https://ecodrix.com/terms",
    type: "website",
  },
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
  { id: "service", title: "Description of Service", icon: Shield },
  { id: "account", title: "Account Registration", icon: User },
  { id: "beta", title: "Early Access / Beta Usage", icon: AlertCircle },
  { id: "data", title: "User Data & Responsibilities", icon: Database },
  { id: "liability", title: "Limitation of Liability", icon: Scale },
];

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Background gradient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124, 110, 250, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      <div className="relative wrapper">
        <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#64647A] hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="polygon-card p-6">
                <h2 className="font-mono text-[10px] font-bold text-white mb-4 uppercase tracking-widest">
                  Contents
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 text-[13px] text-[#64647A] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.03] group"
                      >
                        <Icon size={14} className="text-primary/60 group-hover:text-primary transition-colors" />
                        <span>{section.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main>
              {/* Header */}
              <div className="mb-16">
                <div className="pill mb-6">
                  <FileText size={12} />
                  Legal Document
                </div>
                <h1 className="text-4xl lg:text-6xl font-display font-black text-white tracking-tight mb-4">
                  Terms of Service
                </h1>
                <p className="text-[#64647A] text-base">
                  Last updated:{" "}
                  <span className="text-white font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>

              {/* Section separator */}
              <div className="sep-top mb-12" />

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Section 1 */}
                <section id="acceptance" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          1. Acceptance of Terms
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      By accessing or using the ECODrIx platform and related services,
                      you agree to be bound by these Terms of Service. If you disagree
                      with any part of the terms, you may not access the service.
                    </p>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="service" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <Shield size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          2. Description of Service
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      ECODrIx provides a unified business infrastructure platform,
                      including but not limited to CRM tools, automation workflows,
                      messaging integrations (WhatsApp), and cloud storage (the
                      "Service"). We reserve the right to modify or discontinue the
                      Service at any time.
                    </p>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="account" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <User size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          3. Account Registration
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      To use certain features of the Service, you must register for an
                      account. You agree to provide accurate, current, and complete
                      information during the registration process and to update such
                      information to keep it accurate, current, and complete.
                    </p>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="beta" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <AlertCircle size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          4. Early Access / Beta Usage
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      Portions of the Service may be offered as an "Early Access" or
                      "Beta" release. You acknowledge that these features may contain
                      bugs, errors, and other problems and are provided "as is" without
                      warranty of any kind.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="data" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <Database size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          5. User Data and Responsibilities
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      You retain all rights to your data. However, you grant ECODrIx a
                      license to host, copy, transmit, and display your data strictly as
                      necessary for us to provide the Service. You are responsible for
                      the legality, reliability, and appropriateness of your data.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="liability" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-primary/10">
                        <Scale size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          6. Limitation of Liability
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #a89efd 0%, #7c6efa 30%, #22d3ee 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      In no event shall ECODrIx, nor its directors, employees, partners,
                      agents, suppliers, or affiliates, be liable for any indirect,
                      incidental, special, consequential or punitive damages, including
                      without limitation, loss of profits, data, use, goodwill, or other
                      intangible losses, resulting from your access to or use of or
                      inability to access or use the Service.
                    </p>
                  </div>
                </section>
              </div>

              {/* Footer CTA */}
              <div className="mt-16 polygon-card noise p-8 bg-gradient-to-br from-primary/5 to-cyan/5">
                <h3 className="text-xl font-display font-black text-white mb-2">
                  Questions about our terms?
                </h3>
                <p className="text-[#A8A8B3] mb-6 text-sm">
                  Our team is here to help clarify any questions you may have.
                </p>
                <Link
                  href="/#contact"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Contact Us
                  <ArrowLeft size={14} className="rotate-180" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
