import { Server, Bell, Info } from "@/components/icons";
import { LEGAL, type LegalDoc } from "@/lib/legal/config";

export const subprocessorsDoc: LegalDoc = {
  slug: "subprocessors",
  title: "Sub-Processors",
  pill: "Sub-Processors",
  description:
    "Every company ECODrIx uses to run ERIX and LAIE that may handle personal data: what each one does for us, what data it handles and where it is processed.",
  intro: `To run ${LEGAL.brand}, we use the companies below. Each one handles personal data only to do its job for us. Channels and apps a workspace connects for itself (its own email provider, payment gateway or other app) are that workspace's choice and are not listed here.`,
  effectiveDate: "28 October 2026",
  sections: [
    {
      id: "list",
      title: "Current Sub-Processors",
      icon: Server,
      body: [
        {
          table: {
            headers: ["Company", "What it does for us", "Data it handles", "Where"],
            rows: [
              [
                "Google Cloud",
                "Runs our API (Cloud Run), database (Cloud SQL), background-job server (Compute Engine) and server logs (Cloud Logging)",
                "All account and workspace data",
                "Database and background jobs: Mumbai, India. API: United States (Iowa), moving to Mumbai",
              ],
              [
                "Vercel",
                "Hosts ecodrix.com and the ERIX console",
                "Pages you load, your console sign-in session, and the data the console's server code fetches from our API to show you",
                "United States",
              ],
              [
                "Cloudflare (R2)",
                "Stores files",
                "Files uploaded to or received in workspaces, and invoice PDFs",
                "Cloudflare's data centres",
              ],
              [
                "Amazon Web Services",
                "Sends our emails (Amazon SES). For LAIE only (invite-only), relays that fetch public web pages (AWS Lambda)",
                "Email: recipient address and message. LAIE: search terms and addresses of public pages",
                "Email: Mumbai, India. LAIE relays: several AWS regions",
              ],
              [
                "Razorpay",
                "Takes payments for ERIX plans and credits",
                "What you enter at Razorpay checkout (contact and payment details), and the plan and amount",
                "India",
              ],
              [
                "Meta Platforms",
                "WhatsApp Business Cloud API; Instagram and Messenger when a workspace connects them",
                "Messages and media sent and received, contact phone numbers and profile IDs",
                "Meta's data centres",
              ],
              [
                "Telegram",
                "Telegram Bot API, when a workspace connects a Telegram bot",
                "Messages sent and received through that bot",
                "Telegram's data centres",
              ],
              [
                "Anthropic",
                "AI model for AI agents and AI features",
                "The text an AI task needs: customer messages, recent conversation, the business's own information and instructions",
                "United States",
              ],
              [
                "OpenAI",
                "AI model for AI features and for searching a workspace's knowledge base",
                "The text an AI task needs, and knowledge-base content",
                "United States",
              ],
              [
                "Google (Gemini API)",
                "AI model for AI agents and AI features",
                "The text an AI task needs",
                "United States",
              ],
              [
                "Google (Calendar, Meet, Sheets, Places, Sign-In)",
                "Calendar and Meet when a workspace connects Google Calendar; Sheets only when a workspace connects it; Places for LAIE searches; Sign in with Google",
                "Calendar events and free/busy times; rows in the sheets an automation names; LAIE search terms; your name, email and profile picture at sign-in",
                "Google's data centres",
              ],
              [
                "Google Analytics",
                "Website analytics on ecodrix.com, only if you allow it",
                "Pages viewed, device, browser, approximate location and Google Analytics cookie IDs",
                "Google's data centres",
              ],
              [
                "GitHub",
                "Sign in with GitHub",
                "Your name, email address and profile picture",
                "United States",
              ],
              [
                "LinkedIn",
                "Sign in with LinkedIn",
                "Your name, email address and profile picture",
                "United States",
              ],
              [
                "Truecaller",
                "Phone verification in ERIX checkout, when a business's checkout offers it",
                "We send the buyer's Truecaller token; Truecaller returns their name, phone number and, if they share them, email, city and state",
                "Truecaller's India endpoint",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "purpose",
      title: "How We Choose and Limit Them",
      icon: Info,
      body: [
        "We use established providers under their business terms, and send each one only the data its job needs. Razorpay handles card, UPI and bank details directly; they never reach our servers.",
      ],
    },
    {
      id: "changes",
      title: "Changes to This List",
      icon: Bell,
      body: [
        `We update this page before we start using a new sub-processor. To get these updates by email, or to object to a change, write to ${LEGAL.emails.legal}.`,
      ],
    },
  ],
};
