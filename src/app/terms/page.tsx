import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="w-full max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#64647A] hover:text-white transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-[#64647A]">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-invert prose-p:text-[#A8A8B3] prose-p:leading-relaxed prose-headings:text-white prose-headings:font-display prose-headings:font-bold prose-a:text-primary max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ECODrix platform and related services,
              you agree to be bound by these Terms of Service. If you disagree
              with any part of the terms, you may not access the service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              ECODrix provides a unified business infrastructure platform,
              including but not limited to CRM tools, automation workflows,
              messaging integrations (WhatsApp), and cloud storage (the
              "Service"). We reserve the right to modify or discontinue the
              Service at any time.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To use certain features of the Service, you must register for an
              account. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>

            <h2>4. Early Access / Beta Usage</h2>
            <p>
              Portions of the Service may be offered as an "Early Access" or
              "Beta" release. You acknowledge that these features may contain
              bugs, errors, and other problems and are provided "as is" without
              warranty of any kind.
            </p>

            <h2>5. User Data and Responsibilities</h2>
            <p>
              You retain all rights to your data. However, you grant ECODrix a
              license to host, copy, transmit, and display your data strictly as
              necessary for us to provide the Service. You are responsible for
              the legality, reliability, and appropriateness of your data.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall ECODrix, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or
              inability to access or use the Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
