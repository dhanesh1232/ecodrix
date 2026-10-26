import { IntegrationBeam } from "@/components/marketing/integration-beam";
import { MkSection, TrustBar } from "@/components/marketing/kit";

/**
 * Home: what ERIX connects to, and what it turns a message into. Only
 * integrations that are live today (design system product.md): Google
 * Sheets and Gmail are not, so they aren't here. No voice: it isn't launched.
 */
export function WorksWith() {
  return (
    <section aria-label="Works with" className="border-b border-border-soft bg-surface">
      <div className="wrapper">
        <TrustBar
          items={[
            { label: "WhatsApp", brand: "whatsapp" },
            { label: "Instagram", brand: "instagram" },
            { label: "Google Calendar and Meet", brand: "googlecalendar" },
            { label: "Razorpay", brand: "razorpay" },
            { label: "Email on your domain", icon: "mail" },
            { label: "Website chat", icon: "message-square" },
          ]}
        />
      </div>
    </section>
  );
}

export function ChannelBeam() {
  return (
    <MkSection
      id="channels"
      kicker="One place for every enquiry"
      title="Every channel in. Every outcome out."
      lead="WhatsApp, your website chat, Instagram DMs and email all land in ERIX, and the next step happens on its own: the lead is in your pipeline, the visit is booked, the payment link is sent and the follow-up is set."
    >
      <IntegrationBeam
        label="ERIX"
        inputs={[
          { label: "WhatsApp", brand: "whatsapp" },
          { label: "Website chat", icon: "message-square" },
          { label: "Instagram DMs", brand: "instagram" },
          { label: "Email", icon: "mail" },
        ]}
        outputs={[
          { label: "Lead in your CRM", icon: "user-check" },
          { label: "Visit booked", icon: "calendar-check" },
          { label: "Payment link sent", icon: "indian-rupee" },
          { label: "Follow-up scheduled", icon: "calendar-clock" },
        ]}
      />
    </MkSection>
  );
}
