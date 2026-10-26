import Link from "next/link";
import { Icon, type GlyphName } from "@/components/icons";
import { MkSection } from "@/components/marketing/kit";
import { OnceVisible, SegTabs } from "@/components/marketing/seg-tabs";
import { BookingScreen, BroadcastScreen, PipelineScreen } from "@/components/scenes/screens";

/** Verticals (DS `VerticalTabs`): the jobs ERIX does in each trade. */
const verticals: {
  id: string;
  label: string;
  icon: GlyphName;
  title: string;
  text: string;
  jobs: { icon: GlyphName; title: string; text: string }[];
  href: string;
  screen: React.ReactNode;
}[] = [
  {
    id: "clinics",
    label: "Clinics",
    icon: "stethoscope",
    title: "Clinics and service businesses",
    text: "A website enquiry gets a WhatsApp confirmation and a booked slot, and reminders go out before the appointment. If nobody books, a follow-up goes out on its own.",
    jobs: [
      { icon: "calendar-check", title: "Bookings in Indian time", text: "Your hours, gaps and notice period. One slot, one patient." },
      { icon: "bell", title: "Reminders on WhatsApp", text: "1 hour and 15 minutes before, from the Appointment Reminders template." },
      { icon: "shield-check", title: "Medical questions to a person", text: "The AI never answers symptoms or treatment questions." },
    ],
    href: "/platform/erix-crm/healthcare",
    screen: <BookingScreen />,
  },
  {
    id: "real-estate",
    label: "Real estate",
    icon: "building-2",
    title: "Real estate and sales teams",
    text: "Leads from listings and ads land in one pipeline. Site visits are confirmed on WhatsApp, and the team sees who is hot, who is cold and who needs a call.",
    jobs: [
      { icon: "square-kanban", title: "Stages for the sale", text: "Inquiry to Token Paid to Agreement Signed, with rupee totals." },
      { icon: "calendar-check", title: "Site visits booked", text: "Buyers pick a slot, and nobody double-books." },
      { icon: "message-circle", title: "Follow-ups on WhatsApp", text: "Wait for a reply, and a nudge when nobody answers." },
    ],
    href: "/platform/erix-crm/real-estate",
    screen: <PipelineScreen />,
  },
  {
    id: "d2c",
    label: "D2C and local brands",
    icon: "store",
    title: "D2C and local brands",
    text: "New customers join a welcome sequence, repeat buyers get offers on WhatsApp, and big orders are flagged for a personal call.",
    jobs: [
      { icon: "inbox", title: "Every DM in one inbox", text: "Instagram, WhatsApp and website chat, each on the right customer." },
      { icon: "megaphone", title: "Festive offers on WhatsApp", text: "Approved templates, and Meta bills you directly. No ERIX markup." },
      { icon: "receipt", title: "Invoices with payment links", text: "From chat to paid, on WhatsApp." },
    ],
    href: "/platform/erix-crm/d2c-ecommerce",
    screen: <BroadcastScreen />,
  },
];

export function UseCases() {
  return (
    <MkSection id="verticals" title="Made for teams that sell on WhatsApp">
      <SegTabs
        label="Industry"
        tabs={verticals.map((v) => ({
          id: v.id,
          label: v.label,
          icon: v.icon,
          panel: (
            <div className="erix-mk-vert__panel">
              <div>
                <h3 className="erix-mk-h3">{v.title}</h3>
                <p className="erix-mk-body">{v.text}</p>
                <ul className="erix-mk-vert__jobs">
                  {v.jobs.map((j) => (
                    <li key={j.title}>
                      <span>
                        <Icon name={j.icon} size={18} variant="duo" />
                      </span>
                      <div>
                        <b>{j.title}</b>
                        <p>{j.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href={v.href} className="erix-mk-link group">
                  ERIX for {v.label.toLowerCase()}
                  <Icon name="arrow-right" size={14} variant="line" />
                </Link>
              </div>
              <OnceVisible>{v.screen}</OnceVisible>
            </div>
          ),
        }))}
      />
    </MkSection>
  );
}
