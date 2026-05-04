import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, Share2, Lock, Mail, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ECODrIx Privacy Policy. Learn how we collect, use, and protect your data. Industry-standard encryption, secure storage, and transparent data practices.",
  alternates: { canonical: "https://ecodrix.com/privacy" },
  openGraph: {
    title: "Privacy Policy | ECODrIx",
    description:
      "Learn how ECODrIx collects, uses, and protects your data with industry-standard encryption and secure storage.",
    url: "https://ecodrix.com/privacy",
    type: "website",
  },
};

const sections = [
  { id: "collection", title: "Information We Collect", icon: Info },
  { id: "usage", title: "How We Use Your Information", icon: Eye },
  { id: "sharing", title: "Information Sharing", icon: Share2 },
  { id: "security", title: "Data Security", icon: Lock },
  { id: "contact", title: "Contact Us", icon: Mail },
];

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Background gradient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(124, 110, 250, 0.25) 0%, transparent 70%)',
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
                        <Icon size={14} className="text-cyan/60 group-hover:text-cyan transition-colors" />
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
                <div className="pill bg-cyan/10 text-cyan border-cyan/20">
                  <Lock size={12} />
                  Privacy & Security
                </div>
                <h1 className="text-4xl lg:text-6xl font-display font-black text-white tracking-tight mb-4">
                  Privacy Policy
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
                <section id="collection" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-cyan/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-cyan/10">
                        <Info size={20} className="text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          1. Information We Collect
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #7c6efa 50%, #a89efd 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[#A8A8B3] leading-relaxed text-base">
                        We collect information that you provide directly to us when you
                        register for an account, use our services, or communicate with us.
                        This may include your name, email address, company name, phone
                        number, and any other information you choose to provide.
                      </p>
                      <p className="text-[#A8A8B3] leading-relaxed text-base">
                        When you use our unified business infrastructure platform, we also
                        collect data generated by your usage, including interaction logs,
                        automation trigger history, and connected third-party account
                        metadata.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="usage" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-cyan/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-cyan/10">
                        <Eye size={20} className="text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          2. How We Use Your Information
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #7c6efa 50%, #a89efd 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[#A8A8B3] leading-relaxed text-base">
                        We use the information we collect to:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-[#A8A8B3] text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          <span>Provide, maintain, and improve our services.</span>
                        </li>
                        <li className="flex items-start gap-3 text-[#A8A8B3] text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          <span>Process transactions and send related information.</span>
                        </li>
                        <li className="flex items-start gap-3 text-[#A8A8B3] text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          <span>Send technical notices, updates, security alerts, and support messages.</span>
                        </li>
                        <li className="flex items-start gap-3 text-[#A8A8B3] text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          <span>Respond to your comments, questions, and requests.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="sharing" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-cyan/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-cyan/10">
                        <Share2 size={20} className="text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          3. Information Sharing
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #7c6efa 50%, #a89efd 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      We do not share your personal information with third parties
                      except as described in this privacy policy. We may share your
                      information with vendors, consultants, and other service providers
                      who need access to such information to carry out work on our
                      behalf.
                    </p>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="security" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-cyan/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-cyan/10">
                        <Lock size={20} className="text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          4. Data Security
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #7c6efa 50%, #a89efd 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      We take reasonable measures to help protect information about you
                      from loss, theft, misuse, unauthorized access, disclosure,
                      alteration, and destruction. Your data is stored securely using
                      industry-standard encryption.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="contact" className="scroll-mt-32">
                  <div className="polygon-card noise p-8 lg:p-10 hover:border-cyan/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="polygon-icon w-12 h-12 flex items-center justify-center bg-cyan/10">
                        <Mail size={20} className="text-cyan" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 tracking-tight">
                          5. Contact Us
                        </h2>
                        <div 
                          className="h-0.5 w-12 rounded-full mt-3"
                          style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #7c6efa 50%, #a89efd 100%)'
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#A8A8B3] leading-relaxed text-base">
                      If you have any questions about this Privacy Policy, please
                      contact us at:{" "}
                      <a 
                        href="mailto:privacy@ecodrix.com"
                        className="text-cyan hover:text-cyan/80 transition-colors underline decoration-cyan/30 hover:decoration-cyan/60"
                      >
                        privacy@ecodrix.com
                      </a>
                    </p>
                  </div>
                </section>
              </div>

              {/* Footer CTA */}
              <div className="mt-16 polygon-card noise p-8 bg-gradient-to-br from-cyan/5 to-primary/5">
                <h3 className="text-xl font-display font-black text-white mb-2">
                  Your privacy matters to us
                </h3>
                <p className="text-[#A8A8B3] mb-6 text-sm">
                  We're committed to protecting your data with industry-leading security practices.
                </p>
                <Link
                  href="/#contact"
                  className="btn-primary inline-flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #7c6efa)',
                  }}
                >
                  Get in Touch
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
