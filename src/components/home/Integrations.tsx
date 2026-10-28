import { Icon, type IconName, isBrandName } from "@/components/icons";
import { type BeamItem, IntegrationBeam } from "@/components/marketing/integration-beam";
import { MkSection, TrustBar } from "@/components/marketing/kit";

/**
 * Home: what ERIX connects to, and what it turns a message into. Only
 * integrations that are live today (design system product.md): Google
 * Sheets and Gmail are not, so they aren't here. No voice: it isn't launched.
 */
export function WorksWith() {
  return (
    <section aria-label="Works with" className="border-b border-border-soft bg-surface">
      <div className="mx-auto w-full max-w-wrap px-gutter">
        <TrustBar
          items={[
            { label: "WhatsApp", icon: "whatsapp" },
            { label: "Instagram", icon: "instagram" },
            { label: "Google Calendar and Meet", icon: "googlecalendar" },
            { label: "Razorpay", icon: "razorpay" },
            { label: "Email on your domain", icon: "mail" },
            { label: "Website chat", icon: "message-square" },
          ]}
        />
      </div>
    </section>
  );
}

const beam = (it: { label: string; icon: IconName }): BeamItem => ({
  label: it.label,
  brand: isBrandName(it.icon),
  glyph: isBrandName(it.icon) ? <Icon name={it.icon} size={18} /> : <Icon name={it.icon} size={18} variant="duo" />,
});

export function ChannelBeam({ tone }: { tone?: "plain" | "subtle" }) {
  return (
    <MkSection
      id="channels"
      tone={tone}
      kicker="One place for every enquiry"
      title="Every channel in. Every outcome out."
      lead="WhatsApp, your website chat, Instagram DMs and email all land in ERIX, and the next step happens on its own: the lead is in your pipeline, the visit is booked, the payment link is sent and the follow-up is set."
    >
      <IntegrationBeam
        label="ERIX"
        inputs={[
          { label: "WhatsApp", icon: "whatsapp" as const },
          { label: "Website chat", icon: "message-square" as const },
          { label: "Instagram DMs", icon: "instagram" as const },
          { label: "Email", icon: "mail" as const },
        ].map(beam)}
        outputs={[
          { label: "Lead in your CRM", icon: "user-check" as const },
          { label: "Visit booked", icon: "calendar-check" as const },
          { label: "Payment link sent", icon: "indian-rupee" as const },
          { label: "Follow-up scheduled", icon: "calendar-clock" as const },
        ].map(beam)}
      />
    </MkSection>
  );
}
